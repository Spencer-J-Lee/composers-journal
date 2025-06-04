import clsx from "clsx";

// const tagNames = [
//   "Melody",
//   "Counter-Melody",
//   "Accompaniment",
//   "Groove",
//   "Texture",
//   "Harmony",
//   "Upbeat",
//   "Mellow",
//   "Somber",
//   "Laid-back",
//   "Frantic",
//   "Inquisitive",
//   "Grandiose",
//   "Bassline",
//   "Electronic",
//   "Orchestral",
//   "Ambient",
//   "Romantic",
//   "Classical",
//   "Jazz",
//   "Baroque",
//   "Medieval",
//   "Contemporary",
//   "Blues",
//   "Swing",
//   "Bebop",
//   "Funk",
//   "Pop",
//   "K-pop",
//   "J-pop",
//   "Lo-fi",
//   "Celtic",
//   "Bossa Nova",
//   "Ethereal",
//   "Puzzle",
// ];

// TODO: repurpose this for entry quick search feature
export const Filters = () => {
  return (
    <aside
      className={clsx(
        "bg-surface sticky top-[calc(var(--navbar-height)_-_1px)] h-[calc(100vh_-_var(--navbar-height))] w-72 min-w-72 overflow-y-auto overflow-x-hidden px-5 py-5 shadow-sm",
      )}
    >
      {/* <div className="h-[1200px]" /> */}
    </aside>
  );
};
