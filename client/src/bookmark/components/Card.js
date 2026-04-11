import { useDispatch, useSelector } from "react-redux";
import {
  useGetBookmarkQuery,
  useUnpinBookmarkMutation,
  useVisitActionMutation,
} from "../../store/apiSlice";
import {
  openDialogModal,
  openEditModal,
  toggleOpenActionDropdown,
} from "../../store/bookmarkSlice";

export default function Card() {
  const favicon = "/images/favicon-frontend-mentor.png";
  const bookmarkMenu = "/images/icon-menu-bookmark-dark.svg";
  const bookmarkMenuLigth = "/images/icon-menu-bookmark.svg";
  const vistCount = "/images/icon-visit-count-dark.svg";
  const vistCountLigth = "/images/icon-visit-count.svg";
  const lastVisited = "/images/icon-last-visited-dark.svg";
  const lastVisitedLigth = "/images/icon-last-visited.svg";
  const created = "/images/icon-created-dark.svg";
  const createdLigth = "/images/icon-created.svg";
  const pin = "/images/icon-pin-dark.svg";
  const pinLigth = "/images/icon-pin.svg";
  const visit = "/images/icon-visit-dark.svg";
  const visitLigth = "/images/icon-visit.svg";
  const copy = "/images/icon-copy-dark.svg";
  const copyLigth = "/images/icon-copy.svg";
  const unpin = "/images/icon-unpin-dark.svg";
  const unpinLigth = "/images/icon-unpin.svg";
  const edit = "/images/icon-edit-dark.svg";
  const editLigth = "/images/icon-edit.svg";
  const archive = "/images/icon-archive-dark.svg";
  const archiveLigth = "/images/icon-archive.svg";

  const sortType = useSelector((s) => s.bookmark.sortType);
  const searchTerm = useSelector((s) => s.bookmark.searchTerm);

  const normalizedTerm = searchTerm.trim();

  const { data: bookmarks = [], error } = useGetBookmarkQuery({
    sort: sortType,
    search: normalizedTerm || undefined,
  });

  const visibleBookmarks = bookmarks.filter((b) => !b.isArchived && b.isPinned);

  const dispatch = useDispatch();
  const openActionDropdownId = useSelector(
    (a) => a.bookmark.openActionDropdownId,
  );
  const mode = useSelector((s) => s.theme.mode);

  const [visitAction] = useVisitActionMutation();
  const [unpinBookmark] = useUnpinBookmarkMutation();

  if (error && error.status === 401) {
    return (
      <div>
        <h1
          className={`px-3 font-bold text-3xl ${mode === "dark" ? "text-neutral-0" : "text-neutral-dark-900"}`}
        >
          Please log in to view bookmarks.
        </h1>
      </div>
    );
  }

  const bookmarkMenuIcon = mode === "light" ? bookmarkMenuLigth : bookmarkMenu;
  const visitCountIcon = mode === "light" ? vistCountLigth : vistCount;
  const lastVisitedIcon = mode === "light" ? lastVisitedLigth : lastVisited;
  const createdIcon = mode === "light" ? createdLigth : created;
  const pinIcon = mode === "light" ? pinLigth : pin;
  const visitIcon = mode === "light" ? visitLigth : visit;
  const copyIcon = mode === "light" ? copyLigth : copy;
  const unpinIcon = mode === "light" ? unpinLigth : unpin;
  const editIcon = mode === "light" ? editLigth : edit;
  const archiveIcon = mode === "light" ? archiveLigth : archive;

  const handleVisitBookmark = async (id, url) => {
   window.open(`https://${url}`, '_blank', 'noopener,noreferrer');
    visitAction({ id });
    dispatch(toggleOpenActionDropdown(id));
  };
  const handleCopyUrlBookmark = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      dispatch(toggleOpenActionDropdown());
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnpinBookmark = async (id) => {
    try {
      await unpinBookmark({ id }).unwrap();
      dispatch(toggleOpenActionDropdown(id));
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBookmark = (id) => {
    dispatch(openEditModal({ bookmarkId: id }));
    dispatch(toggleOpenActionDropdown(id));
  };

  return (
    <ul
      id="card"
      className="p-4 md:px-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-stretch"
    >
      {visibleBookmarks.map((b) => (
        <li
          key={b._id}
          className={`relative p-4 rounded-md h-full min-h-[360px] flex flex-col ${
            mode === "light" ? "bg-neutral-0" : "bg-neutral-dark-800"
          }`}
        >
          {openActionDropdownId === b._id && (
            <div className="absolute top-20 left-20 z-20">
              <ul
                id="actions-dropdown"
                className={`w-[200px] rounded-md outline outline-1 flex flex-col ${
                  mode === "light"
                    ? "bg-neutral-0 text-neutral-800 outline-neutral-100"
                    : "bg-neutral-dark-600 text-neutral-dark-100 outline-neutral-dark-400"
                }`}
              >
                <button
                  id="visit-btn"
                  type="btn"
                  onClick={() => handleVisitBookmark(b._id, b.url)}
                >
                  <li className="flex items-center gap-3 px-3.5 py-3">
                    <img src={visitIcon} alt="visit-icon" className="w-4 h-4" />
                    <span className="text-preset4">Visit</span>
                  </li>
                </button>
                <button
                  id="copy-url"
                  onClick={() => handleCopyUrlBookmark(b.url)}
                >
                  <li className="flex items-center gap-3 px-3.5 py-3">
                    <img src={copyIcon} alt="copy-icon" className="w-4 h-4" />
                    <span className="text-preset4">Copy URL</span>
                  </li>
                </button>
                <button
                  id="unpin-action"
                  onClick={() => handleUnpinBookmark(b._id)}
                >
                  <li className="flex items-center gap-3 px-3.5 py-3">
                    <img src={unpinIcon} alt="visit-icon" className="w-4 h-4" />
                    <span className="text-preset4">Unpin</span>
                  </li>
                </button>
                <button
                  id="edit-bookmark"
                  type="button"
                  onClick={() => handleEditBookmark(b._id)}
                >
                  <li className="flex items-center gap-3 px-3.5 py-3">
                    <img src={editIcon} alt="visit-icon" className="w-4 h-4" />
                    <span className="text-preset4">Edit</span>
                  </li>
                </button>
                <li>
                  <button
                    className="flex items-center gap-3 px-3.5 py-3"
                    type="button"
                    onClick={() => {
                      dispatch(
                        openDialogModal({
                          type: "archive",
                          bookmarkId: b._id,
                        }),
                      );
                      dispatch(toggleOpenActionDropdown(b._id));
                    }}
                  >
                    <img
                      src={archiveIcon}
                      alt="visit-icon"
                      className="w-4 h-4"
                    />
                    <span className="text-preset4">Archive</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          <article id="header" className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={favicon}
                alt="favicon-icon"
                className={`w-11 h-11 rounded-md ${
                  mode === "light" ? "border border-neutral-100" : ""
                }`}
              />
              <div>
                <h4
                  className={`text-preset2 ${
                    mode === "light" ? "text-neutral-900" : "text-neutral-0"
                  }`}
                >
                  {b.title}
                </h4>
                <p
                  className={`text-preset5 ${
                    mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                  }`}
                >
                  {b.url}
                </p>
              </div>
            </div>

            <button
              id="bookmark-menu"
              type="button"
              className={`p-2 rounded-lg ${
                mode === "light"
                  ? "border border-neutral-900"
                  : openActionDropdownId === b._id
                    ? "outline outline-2 outline-neutral-dark-100"
                    : "outline outline-1 outline-neutral-dark-400"
              }`}
              onClick={() => dispatch(toggleOpenActionDropdown(b._id))}
            >
              <img
                src={bookmarkMenuIcon}
                alt="bookmark-menu-icon"
                className="w-5 h-5"
              />
            </button>
          </article>

          <hr
            className={`border-0 mt-4 border-t ${
              mode === "light"
                ? "border-neutral-300"
                : "border-neutral-dark-400"
            }`}
          />

          <article id="info" className="flex-1 overflow-hidden">
            
            <p
              className={`text-preset3 my-5 max-h-24 overflow-hidden pt-0.5 leading-normal break-words ${
                mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
              }`}
            >
              {b.description}
            </p>

            <ul
              id="tags"
              className="flex flex-wrap gap-2 text-preset5 max-h-16 overflow-hidden"
            >
              {(Array.isArray(b.tags) ? b.tags : []).map((tag) => (
                <li
                  key={tag?._id || tag?.name || String(tag)}
                  className={`p-2 rounded-md ${
                    mode === "light"
                      ? "bg-neutral-100 text-neutral-800"
                      : "bg-neutral-dark-600 text-neutral-dark-100"
                  }`}
                >
                  {typeof tag === "string" ? tag : tag?.name}
                </li>
              ))}
            </ul>
          </article>

          <hr
            className={`border-0 -mx-4 mt-5 border-t ${
              mode === "light"
                ? "border-neutral-300"
                : "border-neutral-dark-400"
            }`}
          />

          <article
            id="footer"
            className={`flex items-center justify-between mt-3 text-preset5 ${
              mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={visitCountIcon}
                  alt="visit-count-icon"
                  className="w-3 h-3"
                />
                <span>{b.visitedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={lastVisitedIcon}
                  alt="last-visited-icon"
                  className="w-3 h-3"
                />
                <span>
                  {b.lastVisitedAt
                    ? new Date(b.lastVisitedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
                    : "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={createdIcon} alt="created-icon" className="w-3 h-3" />
                <span>
                  {b.createdTime
                    ? new Date(b.createdTime).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    : "-"}
                </span>
              </div>
            </div>
            <img src={pinIcon} alt="pin-icon" className="w-4 h-4" />
          </article>
        </li>
      ))}
    </ul>
  );
}
