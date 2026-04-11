import { useDispatch, useSelector } from "react-redux";
import { closeDialogModal } from "../../store/bookmarkSlice";
import {
  useAddArchiveMutation,
  useDeleteBookmarkMutation,
  useRemoveArchiveMutation,
} from "../../store/apiSlice";

export default function Dialog() {
  const close = "/images/icon-close-dark.svg";
  const closeLigth = "/images/icon-close.svg";
  const dispatch = useDispatch();
  const bookmarkId = useSelector((s) => s.bookmark.dialogBookmarkId);
  const [addArchive, { isLoading: isArchiving }] = useAddArchiveMutation();
  const [removeArchive, { isLoading: isUnarchiving }] =
    useRemoveArchiveMutation();
  const [deleteBookmark, { isLoading: isDeleting }] =
    useDeleteBookmarkMutation();
  const isLoading = isArchiving || isUnarchiving || isDeleting;
  const dialogType = useSelector((s) => s.bookmark.dialogType);

  const mode = useSelector((s) => s.theme.mode);

  const closeIcon = mode === "light" ? closeLigth : close;

  const handleConfirm = async () => {
    try {
      if (!bookmarkId) {
        console.error("Missing bookmarkId");
        return;
      }

      if (!["archive", "unarchive", "delete"].includes(dialogType)) {
        console.error("Invalid dialogType", dialogType);
        return;
      }

      if (dialogType === "archive") {
        await addArchive({ id: bookmarkId }).unwrap();
      } else if (dialogType === "unarchive") {
        await removeArchive({ id: bookmarkId }).unwrap();
      } else if (dialogType === "delete") {
        await deleteBookmark({ id: bookmarkId }).unwrap();
      }

      dispatch(closeDialogModal());
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  const content = {
    archive: {
      title: "Archive bookmark",
      message: "Are you sure you want to archive this bookmark?",
      actionText: "Archive",
    },
    unarchive: {
      title: "Unarchive bookmark",
      message: "Move this bookmark back to your active list?",
      actionText: "Unarchive",
    },
    delete: {
      title: "Delete bookmark",
      message: "Are you sure you want to delete this bookmark?",
      actionText: "Delete Permanently",
    },
  };
  const c = content[dialogType] || content.archive;

  return (
    <section
      id="dialog"
      className={`w-full max-w-[500px] ${
        mode === "light" ? "bg-neutral-0" : "bg-neutral-dark-800"
      } rounded-md border border-teal-700 p-5`}
    >
      <article>
        <div className="flex items-center justify-between">
          <h4
            className={`text-preset1 ${
              mode === "light" ? "text-neutral-900" : "text-neutral-0"
            }`}
          >
            {c.title}
          </h4>
          <button type="button" onClick={() => dispatch(closeDialogModal())}>
            <img
              src={closeIcon}
              alt="close-icon"
              className="w-5 h-5 relative left-2 -top-3"
            />
          </button>
        </div>
        <p
          className={`text-preset4m my-2 ${
            mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"
          }`}
        >
          {c.message}
        </p>
      </article>

      <div className="text-neutral-0 text-preset3 flex items-center justify-end gap-2">
        <button
          id="cancel-btn"
          type="button"
          onClick={() => dispatch(closeDialogModal())}
          disabled={isLoading}
          className={`px-4 py-3 outline outline-1 font-bold outline-neutral-dark-400 rounded-md ${
            mode === "light" ? "text-neutral-900" : "text-neutral-0"
          }`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className={`px-4 py-3 outline outline-1 outline-neutral-dark-400 ${
            dialogType === "delete" ? "bg-red-800" : "bg-teal-700"
          } rounded-md`}
        >
          {isLoading ? "Processing..." : c.actionText}
        </button>
      </div>
    </section>
  );
}
