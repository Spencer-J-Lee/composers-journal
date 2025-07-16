export const ASSET_PATHS = {
  LOGO_WHITE: "/assets/logo-white.png",
  LOGO_BLACK: "/assets/logo-black.png",

  // TODO: move to image storage (e.g. amazon s3) to reduce bundle size
  // TODO: replace these illustrations
  EMPTY_STATE_WRITING: "/assets/empty-state-writing.png",
  EMPTY_STATE_TRASH: "/assets/empty-state-trash.png",
} as const;
