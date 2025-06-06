export const ERROR_MESSAGES = {
  USER: {
    TRY_AGAIN_LATER: "Something went wrong. Please try again later.",
    TRY_AGAIN: "Something went wrong. Please try again.",
    UNAUTHORIZED: "You do not have permission to perform this action.",
    INVALID_INFO: "Some of the provided information is invalid.",
    YOUTUBE_LINK: "Please enter a valid YouTube link.",

    FETCH: {
      ENTRIES: "Failed to load your entries.",
      NOTEBOOKS: "Failed to load your notebooks.",
    },
    CREATE: {
      ENTRY: "Failed to create your entry.",
      NOTEBOOK: "Failed to create your notebook.",
    },
    UPDATE: {
      ENTRY: "Failed to update your entry.",
      NOTEBOOK: "Failed to update your notebook.",
    },
    DELETE: {
      ENTRY: "Failed to delete your entry.",
      NOTEBOOK: "Failed to delete your notebook.",
    },
  },

  DEV: {
    UNAUTHORIZED: "User is not authorized.",
    INVALID_INFO: "The provided input is invalid for performing this action.",

    FETCH: {
      ENTRIES: "Failed to fetch entries.",
      NOTEBOOKS: "Failed to fetch notebooks.",
    },
    CREATE: {
      ENTRY: "Failed to create entry.",
      NOTEBOOK: "Failed to create notebook.",
    },
    UPDATE: {
      ENTRY: "Failed to update entry.",
      NOTEBOOK: "Failed to update notebook.",
    },
    DELETE: {
      ENTRY: "Failed to delete entry.",
      NOTEBOOK: "Failed to delete notebook.",
    },
  },
} as const;

export const DEFAULT_ERROR_MSG = ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password successfully updated.",
} as const;
