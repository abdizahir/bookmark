import { useDispatch, useSelector } from "react-redux";
import { useCreateBookmarkMutation } from "../../store/apiSlice";
import { closeCreateModal } from "../../store/bookmarkSlice";

export default function CreateBookmark() {
  const close = "images/icon-close-dark.svg";
  const closeLigth = "/images/icon-close.svg";

  const mode = useSelector((s) => s.theme.mode);
  const closeIcon = mode === "light" ? closeLigth : close;

  const [createBookmark] = useCreateBookmarkMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      url: e.target.url.value,
      tags: e.target.tags.value,
    };
    const res = await createBookmark(formData);
    if (res.error) return console.log("login error:", res.error.data.msg);
    e.target.reset();
    dispatch(closeCreateModal());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <section
        id="create-bookmark"
        className={`w-full max-w-[500px] rounded-md border border-teal-700 p-5 ${
          mode === "light" ? "bg-neutral-0" : "bg-neutral-dark-800"
        }`}
      >
        <article>
          <div className="flex items-center justify-between">
            <h4
              className={`text-preset1 ${
                mode === "light" ? "text-neutral-900" : "text-neutral-0"
              }`}
            >
              Add a bookmark
            </h4>

            <button type="button" onClick={() => dispatch(closeCreateModal())}>
              <img
                src={closeIcon}
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
            Save a link with details to keep your collection organized. We
            extract the favicon automatically from the URL.
          </p>
        </article>

        <form id="login" className="flex flex-col" onSubmit={handleSubmit}>
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
          />

          <span
            className={`inline-flex items-end justify-end text-preset5 mt-2 ${
              mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
            }`}
          >
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
          />

          <div
            className={`flex items-center justify-end gap-2 mt-3 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            <button
              type="button"
              onClick={() => dispatch(closeCreateModal())}
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
              className="px-2.5 py-2 outline outline-1 outline-neutral-dark-400 bg-teal-700 rounded-md text-neutral-0"
            >
              Add Bookmark
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
