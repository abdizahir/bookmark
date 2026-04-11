import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDialogModalOpen: false,
  dialogType: null,
  dialogBookmarkId: null,
  editBookmarkId: null,
  openActionDropdownId: null,
  openProfileDropdown: false,
  openSortDropdown: false,
  sortType: "recentlyAdded",
  searchTerm: "",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm =
        typeof action.payload === "string" ? action.payload : "";
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
    openSidebar: (state) => {
      state.isSideBarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSideBarOpen = false;
    },
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.editBookmarkId = action.payload?.bookmarkId || null;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.editBookmarkId = null;
    },
    openDialogModal: (state, action) => {
      state.isDialogModalOpen = true;
      state.dialogType = action.payload?.type || "archive";
      state.dialogBookmarkId = action.payload?.bookmarkId || null;
    },
    closeDialogModal: (state) => {
      state.isDialogModalOpen = false;
      state.dialogType = null;
      state.dialogBookmarkId = null;
    },
    toggleOpenActionDropdown: (state, action) => {
      const clickedId = action.payload;
      const willOpen = state.openActionDropdownId !== clickedId;
      state.openActionDropdownId = willOpen ? clickedId : null;
      if (willOpen) {
        state.openProfileDropdown = false;
        state.openSortDropdown = false;
      }
    },
    toggleOpenProfileDropdown: (state) => {
      const willOpen = !state.openProfileDropdown;
      state.openProfileDropdown = willOpen;

      if (willOpen) {
        state.openActionDropdownId = null;
        state.openSortDropdown = false;
      }
    },
    togleSortDropDown: (state) => {
      const willOpen = !state.openSortDropdown;
      state.openSortDropdown = willOpen;
      if (willOpen) {
        state.openActionDropdownId = null;
        state.openProfileDropdown = false;
      }
    },
    closeAllDropdowns: (state) => {
      state.openActionDropdownId = null;
      state.openProfileDropdown = false;
      state.openSortDropdown = false;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  openDialogModal,
  closeDialogModal,
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  toggleOpenActionDropdown,
  toggleOpenProfileDropdown,
  togleSortDropDown,
  closeAllDropdowns,
  setSortType,
  setSearchTerm,
  clearSearchTerm,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
