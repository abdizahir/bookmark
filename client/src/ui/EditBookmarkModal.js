import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeEditModal } from "../store/bookmarkSlice";

export default function EditBookmarkModal({ open, children }) {
  const dispatch = useDispatch();

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center p-4"
      onClick={() => dispatch(closeEditModal())}
    >
     <div className="w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("edit-bookmark-modal"),
  );
}
