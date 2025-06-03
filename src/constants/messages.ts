export const ERROR_MESSAGES = {
  USER: {
    TRY_AGAIN_LATER: "Something went wrong. Please try again later.",
    UNAUTHORIZED: "You do not have permission to perform this action.",
    INVALID_INFO: "Some of the provided information is invalid.",
    YOUTUBE_LINK: "Please enter a valid YouTube link.",

    FETCH: {
      ENTRIES: "Failed to load your entries.",
    },
    CREATE: {
      ENTRY: "Failed to create your entry.",
    },
    UPDATE: {
      ENTRY: "Failed to update your entry.",
    },
    DELETE: {
      ENTRY: "Failed to delete your entry.",
    },
  },

  DEV: {
    UNAUTHORIZED: "User is not authorized.",
    INVALID_INFO: "The provided input is invalid for performing this action.",

    FETCH: {
      ENTRIES: "Failed to fetch entries.",
    },
    CREATE: {
      ENTRY: "Failed to create entry.",
    },
    UPDATE: {
      ENTRY: "Failed to update entry.",
    },
    DELETE: {
      ENTRY: "Failed to delete entry.",
    },
  },
} as const;

export const DEFAULT_ERROR_MSG = ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password successfully updated.",
} as const;
