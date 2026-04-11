import { useDispatch, useSelector } from "react-redux";
import { closeAllDropdowns, closeSidebar } from "../../store/bookmarkSlice";
import { useGetBookmarkQuery } from "../../store/apiSlice";
import { NavLink, useLocation } from "react-router";
import { useEffect, useMemo } from "react";

export default function SideBar() {
  const { data } = useGetBookmarkQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bookmarks = Array.isArray(data)
    ? data
    : Array.isArray(data?.bookmarks)
      ? data.bookmarks
      : [];

  const tagCounts = useMemo(() => {
    const map = new Map();

    for (const bookmark of bookmarks) {
      const tags = Array.isArray(bookmark?.tags) ? bookmark.tags : [];

      for (const t of tags) {
        const name = typeof t === "string" ? t : t?.name;
        const count = typeof t === "string" ? 1 : (t?.count ?? 1);
        if (!name) continue;
        map.set(name, (map.get(name) || 0) + count);
      }
    }

    return Array.from(map, ([name, count]) => ({ name, count }));
  }, [bookmarks]);

  useEffect(() => {
    dispatch(closeAllDropdowns());
  }, [location.pathname, dispatch]);

  const handleNavClick = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      dispatch(closeSidebar());
    }
  };

  const mode = useSelector((s) => s.theme.mode);
  const logoTheme =
    mode === "dark"
      ? "/images/logo-dark-theme.svg"
      : "/images/logo-light-theme.svg";

  const close = "/images/icon-close-dark.svg";
  const closeLigth = "/images/icon-close.svg";
  const closeIcon = mode === "light" ? closeLigth : close;

  const home = "/images/icon-home-dark.svg";
  const homeLigth = "/images/icon-home.svg";
  const archive = "/images/icon-archive-dark.svg";
  const archiveLigth = "/images/icon-archive.svg";
  const homeIcon = mode === "light" ? homeLigth : home;
  const archiveIcon = mode === "light" ? archiveLigth : archive;
  return (
    <section
      id="sidebar"
      className={`fixed left-0 top-0 z-50 min-h-[100dvh] w-[296px] overflow-y-auto p-4 md:sticky md:top-0 md:z-auto md:min-h-[100dvh] ${
        mode === "light"
          ? "mr-[1px] border-r-0 bg-neutral-0 text-neutral-900"
          : "border-r border-r-neutral-dark-300 bg-neutral-dark-800"
      }`}
    >
      <article id="header" className="flex items-center justify-between">
        <img src={logoTheme} alt="logo-icon" className="" />
        <button type="button" onClick={() => dispatch(closeSidebar())}>
          <img
            src={closeIcon}
            alt="close-icon"
            className="w-5 h-5 relative left-2 -top-3 md:hidden"
          />
        </button>
      </article>
      <nav className="mt-10">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/bookmark"
              end
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-md ${
                  isActive
                    ? mode === "light"
                      ? "bg-neutral-100 text-neutral-900"
                      : "bg-neutral-dark-500/60 text-neutral-0"
                    : mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                }`
              }
            >
              <img src={homeIcon} alt="home-icon" className="w-5 h-5" />
              <span className="text-preset3">Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/bookmark/archive"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-md ${
                  isActive
                    ? mode === "light"
                      ? "bg-neutral-100 text-neutral-900"
                      : "bg-neutral-dark-500/60 text-neutral-0"
                    : mode === "light"
                      ? "text-neutral-800"
                      : "text-neutral-dark-100"
                }`
              }
            >
              <img src={archiveIcon} alt="archive-icon" className="w-5 h-5" />
              <span className="text-preset3">Archive</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <h4 className="text-xs text-neutral-0 px-3 mt-3">TAGS</h4>
      <ul id="tags" className="p-3 flex flex-col gap-3">
        {tagCounts.map((tag) => (
          <li key={tag.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-block h-4 w-4 border border-neutral-dark-300 bg-transparent rounded-sm" />
              <span
                className={`${mode === "light" ? "text-neutral-800" : "text-neutral-dark-100"} text-preset3`}
              >
                {tag.name}
              </span>
            </div>
            <span
              id="count"
              className={`text-xs px-2 py-0.5 rounded-full border ${
                mode === "light"
                  ? "text-neutral-800 font-bold border-neutral-300 bg-neutral-100"
                  : "text-neutral-0 border-neutral-dark-300 bg-neutral-dark-600"
              }`}
            >
              {tag.count}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
