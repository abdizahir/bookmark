import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeDialogModal } from "../store/bookmarkSlice";

export default function DialogModal({ open, children }) {
  const dispatch = useDispatch();
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
      onClick={() => dispatch(closeDialogModal())}
    >
        <div className="w-full max-w-[500px]" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}