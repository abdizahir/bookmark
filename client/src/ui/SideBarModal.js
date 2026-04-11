import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../store/bookmarkSlice";

export default function SideBarModal({ open, children }) {
  const dispatch = useDispatch();

  if (!open) return null;

  const handleClose = () => dispatch(closeSidebar());

  return createPortal(
    <div
      className="fixed inset-0 z-50 min-h-[100dvh] bg-black/50 md:hidden"
      onClick={handleClose}
    >
      <div
        className="min-h-[100dvh] w-[296px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("sidebar-modal"),
  );
}
