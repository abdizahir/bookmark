import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeCreateModal } from "../store/bookmarkSlice";

export default function AddBookmarkModal({ open, children }) {
  const dispatch = useDispatch();

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={() => dispatch(closeCreateModal())}
    >
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("add-bookmark-modal"),
  );
}
