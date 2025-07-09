export const ERROR_MESSAGES = {
  USER: {
    TRY_AGAIN_LATER: "Something went wrong. Please try again later",
    TRY_AGAIN: "Something went wrong. Please try again",
    UNAUTHORIZED: "You do not have permission to perform this action",
    INVALID_INFO: "Some of the provided information is invalid",
    YOUTUBE_LINK: "Invalid YouTube link",

    FETCH: {
      ENTRIES: "Failed to load your entries",
      NOTEBOOKS: "Failed to load your notebooks",
    },
    CREATE: {
      ENTRY: "Failed to create your entry",
      NOTEBOOK: "Failed to create your notebook",
      SAVED_ITEM: {
        ENTRY: "Failed to save your entry",
      },
    },
    UPDATE: {
      ENTRY: "Failed to update your entry",
      NOTEBOOK: "Failed to update your notebook",
    },
    TRASH: {
      ENTRY: "Failed to trash your entry",
      NOTEBOOK: "Failed to trash your notebook",
    },
    RESTORE: {
      ENTRY: "Failed to restore your entry",
      NOTEBOOK: "Failed to restore your notebook",
    },
    DELETE: {
      ENTRY: "Failed to delete your entry",
      NOTEBOOK: "Failed to delete your notebook",
      SAVED_ITEM: {
        ENTRY: "Failed to unsave your entry",
      },
    },
  },

  DEV: {
    UNAUTHORIZED: "User is not authorized.",
    INVALID_INFO: "The provided input is invalid for performing this action.",
    MISSING_PAYLOAD: "Missing payload.",
    INVALID_JSON: "Invalid JSON.",

    FETCH: {
      ENTRIES: "Error occurred while fetching entries.",
      NOTEBOOKS: "Error occurred while fetching notebooks.",
    },
    CREATE: {
      ENTRY: "Error occurred while creating entry.",
      NOTEBOOK: "Error occurred while creating notebook.",
      SAVED_ITEM: {
        ENTRY: "Error occurred while creating saved entry item.",
      },
    },
    UPDATE: {
      ENTRY: "Error occurred while updating entry.",
      NOTEBOOK: "Error occurred while updating notebook.",
    },
    DELETE: {
      ENTRY: "Error occurred while deleting entry.",
      NOTEBOOK: "Error occurred while deleting notebook.",
      SAVED_ITEM: {
        ENTRY: "Error occurred while deleting saved entry item.",
      },
    },
    DB_RETURNED_EMPTY: "Database return value is empty",
  },
} as const;

export const DEFAULT_ERROR_MSG = ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password updated",

  USER: {
    CREATE: {
      ENTRY: "Entry created",
      NOTEBOOK: "Notebook created",
      SAVED_ITEM: {
        ENTRY: "Entry saved",
      },
    },
    EDIT: {
      ENTRY: "Entry updated",
      NOTEBOOK: "Notebook saved",
    },
    TRASH: {
      ENTRY: "Entry trashed",
      NOTEBOOK: "Notebook trashed",
    },
    RESTORE: {
      ENTRY: "Entry restored",
      NOTEBOOK: "Notebook restored",
    },
    DELETE: {
      ENTRY: "Entry deleted",
      NOTEBOOK: "Notebook deleted",
      SAVED_ITEM: {
        ENTRY: "Entry unsaved",
      },
    },
  },
} as const;
