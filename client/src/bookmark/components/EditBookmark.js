import { useDispatch, useSelector } from "react-redux";
import {
  useEditBookmarkMutation,
  useGetBookmarkQuery,
} from "../../store/apiSlice";
import { closeEditModal } from "../../store/bookmarkSlice";
import { useEffect, useState } from "react";

export default function EditBookmark() {
  const close = "images/icon-close-dark.svg";
  const [editBookmark] = useEditBookmarkMutation();
  const { data: bookmarks = [] } = useGetBookmarkQuery();

  const mode = useSelector((s) => s.theme.mode);

  const bookmarkId = useSelector((s) => s.bookmark.editBookmarkId);
  const selectedBookmark = bookmarks.find((b) => b._id === bookmarkId);

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    url: "",
    tags: "",
  });

  useEffect(() => {
    if (selectedBookmark) {
      setFormValues({
        title: selectedBookmark.title || "",
        description: selectedBookmark.description || "",
        url: selectedBookmark.url || "",
        tags: Array.isArray(selectedBookmark.tags)
          ? selectedBookmark.tags.map((t) => t.name).join(", ")
          : "",
      });
    }
  }, [selectedBookmark]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editBookmark({ id: bookmarkId, ...formValues });
    if (res.error) return console.log("edit error:", res.error.data?.msg);
    dispatch(closeEditModal());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <section
        id="edit-modal"
        className={`w-full max-w-[500px] rounded-md border border-teal-700 p-5 ${
          mode === "light" ? "bg-neutral-100" : "bg-neutral-dark-800"
        }`}
      >
        <article>
          <div className="flex items-center justify-between">
            <h4
              className={`text-preset1 ${
                mode === "light" ? "text-neutral-900" : "text-neutral-0"
              }`}
            >
              Edit bookmark
            </h4>
            <button type="button" onClick={() => dispatch(closeEditModal())}>
              <img
                src={close}
                alt="close-icon"
                className="w-5 h-5 relative left-2 -top-3"
              />
            </button>
          </div>
          <p
            className={`text-preset4m ${
              mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
            }`}
          >
            Update your saved link details — change the title, description, URL,
            or tags anytime.
          </p>
        </article>
        <form
          id="edit-bookmark-form"
          className="flex flex-col"
          onSubmit={handleSubmit}
        >
          <label
            className={`text-preset4 font-medium mt-3 mb-2 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            Title *
          </label>
          <input
            type="text"
            name="title"
            className={`h-[42px] p-2 rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
              mode === "light"
                ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
                : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
            }`}
            value={formValues.title}
            onChange={handleChange}
          />

          <label
            className={`text-preset4 font-medium mt-3 mb-2 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            Description *
          </label>
          <textarea
            name="description"
            maxLength={280}
            className={`h-[52px] p-2 rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
              mode === "light"
                ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
                : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
            }`}
            value={formValues.description}
            onChange={handleChange}
          />
          <span className="inline-flex items-end justify-end text-preset5 text-neutral-dark-100 mt-2">
            0/280
          </span>
          <label
            className={`text-preset4 font-medium mt-3 mb-2 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            Website URL *
          </label>
          <input
            type="text"
            name="url"
            className={`h-[42px] p-2 rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
              mode === "light"
                ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
                : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
            }`}
            value={formValues.url}
            onChange={handleChange}
          />
          <label
            className={`text-preset4 font-medium mt-3 mb-2 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            Tags *
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g. Design, Learning, Tools"
            className={`h-[42px] p-2 rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-[#A9A9A9] ${
              mode === "light"
                ? "bg-neutral-0 text-neutral-900 outline-neutral-500"
                : "bg-neutral-dark-300/20 text-neutral-0 outline-neutral-dark-300"
            }`}
            value={formValues.tags}
            onChange={handleChange}
          />
          <div className="flex items-center justify-end gap-2 mt-3 text-neutral-0">
            <button
              id="cancel-btn"
              type="button"
              onClick={() => dispatch(closeEditModal())}
              className={`px-2.5 py-2 outline outline-1 rounded-md ${
                mode === "light"
                  ? "bg-neutral-0 outline-neutral-400 text-neutral-900"
                  : "outline-neutral-dark-400 text-neutral-0"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2.5 py-2 outline outline-1 outline-neutral-dark-400 bg-teal-700 rounded-md"
            >
              Save Bookmark
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
