import { useSelector } from "react-redux";

import SideBar from "../components/SideBar";
import CreateBookmark from "../components/CreateBookmark";
import SideBarModal from "../../ui/SideBarModal";
import AddBookmarkModal from "../../ui/AddBookmarkModal";
import DialogModal from "../../ui/DialogModal";
import Dialog from "../components/Dialog";
import { Outlet } from "react-router";
import EditBookmarkModal from "../../ui/EditBookmarkModal";
import EditBookmark from "../components/EditBookmark";

const BookmarkPage = () => {
  const isSideBarOpen = useSelector((s) => s.bookmark.isSideBarOpen);
  const isCreateModalOpen = useSelector((s) => s.bookmark.isCreateModalOpen);
  const isEditModalOpen = useSelector((s) => s.bookmark.isEditModalOpen);
  const isDialogModalOpen = useSelector((d) => d.bookmark.isDialogModalOpen);
  return (
    <section className="min-h-screen flex">
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="hidden md:block relative z-40">
        <SideBarModal open={isSideBarOpen}>
          <SideBar />
        </SideBarModal>
      </div>

      <main className="relative z-0 flex-1 flex flex-col gap-6">
        <Outlet />
      <AddBookmarkModal open={isCreateModalOpen}>
        <CreateBookmark />
      </AddBookmarkModal>
      <EditBookmarkModal open={isEditModalOpen}>
        <EditBookmark />
      </EditBookmarkModal>
      <DialogModal open={isDialogModalOpen}>
        <Dialog />
      </DialogModal>
      </main>
    </section>
  );
};

export default BookmarkPage;
