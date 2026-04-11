import { useDispatch, useSelector } from "react-redux";
import {
  openSidebar,
  openCreateModal,
  toggleOpenProfileDropdown,
  setSearchTerm,
} from "../../store/bookmarkSlice";
import { toggleTheme } from "../../store/themeSlice";
import { useLogoutUserMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router";
import { clearToken } from "../../store/authSlice";

export default function Header() {
  const menuHamburger = "/images/icon-menu-hamburger-dark.svg";
  const menuHamburgerLigth = "/images/icon-menu-hamburger.svg";
  const searchIconDark = "/images/icon-search-dark.svg";
  const addIconDark = "/images/icon-add-dark.svg";
  const avtar = "/images/image-avatar.webp";
  const theme = "/images/icon-theme-dark.svg";
  const themeLigth = "/images/icon-theme.svg";
  const sun = "/images/icon-light-theme-dark.svg";
  const moon = "/images/icon-dark-theme-dark.svg";
  const sunLigth = "/images/icon-light-theme.svg";
  const moonLigth = "/images/icon-dark-theme.svg";
  const logout = "/images/icon-logout-dark.svg";
  const logoutLigth = "/images/icon-logout.svg";

  const dispatch = useDispatch();
  const openProfileDropdown = useSelector(
    (p) => p.bookmark.openProfileDropdown,
  );
  const mode = useSelector((s) => s.theme.mode); // "dark" | "light"
  const themeIcon = mode === "light" ? themeLigth : theme;
  const logoutIcon = mode === "light" ? logoutLigth : logout;
  const sunIcon = mode === "light" ? sunLigth : sun;
  const monIcon = mode === "light" ? moonLigth : moon;
  const hamburgerIcon = mode === "light" ? menuHamburgerLigth : menuHamburger;

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const searchTerm = useSelector((s) => s.bookmark.searchTerm);
  const { fullname, email } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await logoutUser().unwrap();
      dispatch(clearToken());
      navigate("/auth", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      id="header"
      className={`${
        mode === "light"
          ? "p-4 pb- md:px-8 bg-neutral-0"
          : "p-4 md:px-8 bg-neutral-dark-900"
      }`}
    >
      <div className="absolute top-16 right-4 z-20">
        {openProfileDropdown && (
          <section
            id="actions-dropdown"
            className={`w-[248px] rounded-md ${
              mode === "light"
                ? "bg-neutral-0 outline-none border border-[#E9EAEB]"
                : "bg-neutral-dark-600 outline outline-1 outline-neutral-dark-400"
            }`}
          >
            <article id="header" className="flex items-center gap-3 px-4 py-3">
              <img src={avtar} alt="visit-icon" className="w-10 h-10" />
              <div className="flex flex-col">
                <span
                  className={`text-preset4 ${
                    mode === "light" ? "text-neutral-900" : "text-neutral-0"
                  }`}
                >
                  {fullname}
                </span>
                <span
                  className={`text-preset4m ${
                    mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                  }`}
                >
                  {email}
                </span>
              </div>
            </article>
            <hr
              className={`mb-2 border-0 border-t ${
                mode === "light"
                  ? "border-[#E9EAEB]"
                  : "border-neutral-dark-400"
              }`}
            />
            <article
              id="theme-toggler"
              className="flex items-center justify-between px-2 py-1"
            >
              <div className="flex items-center gap-3">
                <img src={themeIcon} alt="visit-icon" className="w-4 h-4" />
                <span
                  className={`text-preset4 font-bold ${
                    mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                  }`}
                >
                  Theme
                </span>
              </div>

              <button
                id="theme-btn"
                type="button"
                onClick={() => dispatch(toggleTheme())}
                className={`flex items-center gap-1 p-1 rounded-xl border-2 ${
                  mode === "light"
                    ? "bg-neutral-0 border-teal-700 [box-shadow:inset_0_0_0_1px_#E9EAEB]"
                    : "bg-neutral-dark-600 border-neutral-300 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.75)]"
                }`}
              >
                <span
                  className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                    mode === "light"
                      ? "bg-neutral-100"
                      : "bg-transparent border border-transparent"
                  }`}
                >
                  <img
                    src={sunIcon}
                    alt="light-theme-icon"
                    className="w-3.5 h-3.5"
                  />
                </span>

                <span
                  className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                    mode === "dark"
                      ? "bg-neutral-dark-800 border border-neutral-dark-400"
                      : "bg-transparent border border-transparent"
                  }`}
                >
                  <img
                    src={monIcon}
                    alt="dark-theme-icon"
                    className="w-3.5 h-3.5"
                  />
                </span>
              </button>
            </article>
            <hr
              className={`mt-2 border-0 border-t ${
                mode === "light"
                  ? "border-[#E9EAEB]"
                  : "border-neutral-dark-400"
              }`}
            />
            <article id="logout">
              <button
                type="button"
                className="flex items-center gap-2 px-2 py-2.5"
                onClick={handleLogout}
              >
                <img src={logoutIcon} alt="visit-icon" className="w-4 h-4" />
                <span
                  className={`text-preset4 font-bold ${
                    mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                  }`}
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </span>
              </button>
            </article>
          </section>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 flex-nowrap">
        <article className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => dispatch(openSidebar())}
            className="inline-block md:hidden shrink-0 p-2.5 outline outline-1 rounded-md outline-neutral-dark-400"
          >
            <img
              src={hamburgerIcon}
              alt="hamburgre-icon"
              className="h-5 w-5 shrink-0"
            />
          </button>
          <div
            id="search-input"
            className={`flex items-center gap-2 min-w-0 p-2 outline outline-1 rounded-md ${
              mode === "light"
                ? "bg-neutral-0 outline-neutral-300"
                : "bg-neutral-dark-300/20 outline-neutral-dark-400"
            }`}
          >
            <img
              src={searchIconDark}
              alt="search-icon"
              className="w-5 h-5 shrink-0"
            />
            <input
              type="search"
              placeholder="Search by title..."
              className={`bg-transparent w-full min-w-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent ${
                mode === "dark" ? "text-neutral-dark-100" : "text-neutral-800"
              }`}
              name="search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </article>
        <article className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => dispatch(openCreateModal())}
            className="inline-flex items-center gap-2 p-2.5 bg-teal-700 rounded-md shrink-0"
          >
            <img
              src={addIconDark}
              alt="add-sign-icon"
              className="h-5 w-5 shrink-0"
            />
            <span className="text-preset3 text-neutral-0 hidden sm:inline-block">
              Add Bookmark
            </span>
          </button>
          <button
            id="avtar"
            type="button"
            className={`${openProfileDropdown ? "rounded-full outline outline-2 outline-neutral-dark-100" : ""}`}
            onClick={() => dispatch(toggleOpenProfileDropdown())}
          >
            <img src={avtar} alt="avtar-icon" className="w-10 h-10 shrink-0" />
          </button>
        </article>
      </div>
    </section>
  );
}
