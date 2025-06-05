export const ERROR_MESSAGES = {
  USER: {
    TRY_AGAIN_LATER: "Something went wrong. Please try again later.",
    TRY_AGAIN: "Something went wrong. Please try again.",
    UNAUTHORIZED: "You do not have permission to perform this action.",
    INVALID_INFO: "Some of the provided information is invalid.",
    YOUTUBE_LINK: "Please enter a valid YouTube link.",

    FETCH: {
      ENTRIES: "Failed to load your entries.",
      COLLECTIONS: "Failed to load your collections.",
    },
    CREATE: {
      ENTRY: "Failed to create your entry.",
      COLLECTION: "Failed to create your collection.",
    },
    UPDATE: {
      ENTRY: "Failed to update your entry.",
      COLLECTION: "Failed to update your collection.",
    },
    DELETE: {
      ENTRY: "Failed to delete your entry.",
      COLLECTION: "Failed to delete your collection.",
    },
  },

  DEV: {
    UNAUTHORIZED: "User is not authorized.",
    INVALID_INFO: "The provided input is invalid for performing this action.",

    FETCH: {
      ENTRIES: "Failed to fetch entries.",
      COLLECTIONS: "Failed to fetch collections.",
    },
    CREATE: {
      ENTRY: "Failed to create entry.",
      COLLECTION: "Failed to create collection.",
    },
    UPDATE: {
      ENTRY: "Failed to update entry.",
      COLLECTION: "Failed to update collection.",
    },
    DELETE: {
      ENTRY: "Failed to delete entry.",
      COLLECTION: "Failed to delete collection.",
    },
  },
} as const;

export const DEFAULT_ERROR_MSG = ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password successfully updated.",
} as const;
