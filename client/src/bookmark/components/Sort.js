import { useDispatch, useSelector } from "react-redux";
import { setSortType, togleSortDropDown } from "../../store/bookmarkSlice";

export default function Sort({ text }) {
  const sort = "/images/icon-sort-dark.svg";
  const sortLigth = "/images/icon-sort.svg";

  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  const sortIcon = mode === "light" ? sortLigth : sort;

  const openSortDropdown = useSelector((s) => s.bookmark.openSortDropdown);

  const handleSort = (type) => {
    dispatch(setSortType(type));
    dispatch(togleSortDropDown());
  };

  return (
    <section id="sort" className="p-4 md:px-8 mb-5 relative">
      {openSortDropdown && (
        <div className="absolute top-16 right-8 z-20">
          <ul
            id="actions-dropdown"
            className={`w-[200px] rounded-md outline outline-1  ${
              mode === "light" ? "bg-neutral-0 text-neutral-800 outline-neutral-100" : "bg-neutral-dark-600 text-neutral-dark-100 outline-neutral-dark-400"
            }`}
          >
            <li className="flex items-center gap-3 px-3.5 py-3">
              <button type="button" onClick={() => handleSort("recentlyAdded")}>
                <span className="text-preset4">
                  Recently added
                </span>
              </button>
            </li>
            <li className="flex items-center gap-3 px-3.5 py-3">
              <button
                type="button"
                onClick={() => handleSort("recentlyVisited")}
              >
                <span className="text-preset4">
                  Recently visited
                </span>
              </button>
            </li>
            <li className="flex items-center gap-3 px-3.5 py-3">
              <button type="button" onClick={() => handleSort("mostViewed")}>
                <span className="text-preset4">
                  Most visited
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
      <article className="flex items-center justify-between">
        <span
          id="bookmark-title"
          className={`text-preset1 ${
            mode === "light" ? "text-neutral-900" : "text-neutral-0"
          }`}
        >
          {text}
        </span>
        <button
          id="sort-btn"
          type="button"
          className={`flex items-center justify-between gap-2 px-3 py-2 rounded-md ${
            openSortDropdown
              ? "outline outline-2 outline-neutral-dark-100"
              : "outline outline-1 outline-neutral-dark-400"
          } ${mode === "light" ? "bg-neutral-0" : "bg-neutral-dark-400/20"}`}
          onClick={() => dispatch(togleSortDropDown())}
        >
          <img src={sortIcon} alt="sort-icon" className="w-5 h-5" />
          <span
            className={`text-preset3 ${
              mode === "dark" ? "text-neutral-0" : "text-neutral-dark-800"
            }`}
          >
            Sort by
          </span>
        </button>
      </article>
    </section>
  );
}
