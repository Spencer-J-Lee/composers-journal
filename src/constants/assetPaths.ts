export const ASSET_PATHS = {
  LOGO_WHITE: "/assets/logo-white.png",
  LOGO_BLACK: "/assets/logo-black.png",

  // TODO: [med] move to image storage (e.g. amazon s3) to reduce bundle size
  // TODO: [very low] replace these illustrations
  EMPTY_STATE_WRITING: "/assets/empty-state-writing.png",
  EMPTY_STATE_TRASH: "/assets/empty-state-trash.png",
  EMPTY_STATE_NOT_FOUND: "/assets/empty-state-not-found.png",
  EMPTY_STATE_UNDER_CONSTRUCTION: "/assets/empty-state-under-construction.png",
  HELLO: "/assets/hello.png",
} as const;
