import bookmark from "../model/bookmark.js";
import Bookmark from "../model/bookmark.js";

export const createBookmark = async (req, res, next) => {
  const { title, description, url, tags } = req.body;
  try {
    const bookmark = new Bookmark({
      title,
      description,
      url,
      tags,
      user: req.user.id,
    });
    const result = await bookmark.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "could not create bookmark." });
  }
};

export const markBookmarkVisited = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Bookmark.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        $inc: { visitedCount: 1 },
        $set: { lastVisitedAt: new Date() },
      },
      { returnDocument: "after" },
    );
    if (!updated)
      return res.status(404).json({ message: "bookmark not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "could not uodate visit info." });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const rawSort = req.query.sort;
    const sort = Array.isArray(rawSort) ? rawSort[0] : rawSort;

    const rawSearch = req.query.search;
    const search = (
      Array.isArray(rawSearch) ? rawSearch[0] : rawSearch || ""
    ).trim();

    let sortBy = { createdTime: -1 };
    if (sort === "mostViewed") sortBy = { visitedCount: -1, createdTime: -1 };
    if (sort === "recentlyVisited")
      sortBy = { lastVisitedAt: -1, createdTime: -1 };

    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const filter = {
      user: req.user.id,
      ...(search
        ? { title: { $regex: escapeRegExp(search), $options: "i" } }
        : {}),
    };

    const bookmarks = await Bookmark.find(filter).sort(sortBy);
    return res.status(200).json(bookmarks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "could not fetch bookmarks." });
  }
};

export const addArchive = async (req, res) => {
  const bookmarkId = req.params.id || req.body.id;
  const userId = req.user?._id || req.user?.id;
  if (!bookmarkId)
    return res.status(400).json({ message: "bookmark id is required" });
  try {
    const updated = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user: userId },
      { $set: { isArchived: true } },
      { returnDocument: "after" },
    );
    if (!updated)
      return res.status(404).json({ message: "bookmark not found" });

    return res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "could not add card to archive" });
  }
};

export const removeArchive = async (req, res) => {
  const bookmarkId = req.params.id || req.body.id;

  if (!bookmarkId)
    return res.status(400).json({ message: "bookmark id is required" });

  try {
    const updated = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user: req.user.id },
      { $set: { isArchived: false } },
      { returnDocument: "after" },
    );

    if (!updated)
      return res.status(404).json({ message: "bookmark not found" });

    return res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "could not unarchive bookmark" });
  }
};

export const deleteBookmark = async (req, res) => {
  const bookmarkId = req.params.id || req.body.id;
  const userId = req.user?._id || req.user?.id;
  if (!bookmarkId)
    return res.status(400).json({ message: "bookmark id is required" });

  try {
    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      user: userId,
    });

    if (!deletedBookmark)
      return res.status(404).json({ message: "bookmark not found" });

    return res.status(200).json({ message: "bookmark deleted successfully" });
  } catch {
    res.status(500).json({ message: "could not delete bookmark" });
  }
};

export const visitBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findByIdAndUpdate(
      id,
      {
        $inc: { visitedCount: 1 },
        $set: { lastVisitedAt: new Date() },
      },
      { returnDocument: "after" },
    );
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    return res.status(200).json({ url: bookmark.url });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unpinBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Bookmark.findByIdAndUpdate(
      { _id: id, user: req.user.id },
      { $set: { isPinned: false } },
      { returnDocument: "after" },
    );
    if (!updated) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updated = await Bookmark.findByIdAndUpdate(id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Bookmark not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
