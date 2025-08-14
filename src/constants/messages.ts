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
      NOTEBOOK_METRICS: "Failed to load your notebook metrics",
      TAGS: "Failed to load tags",
    },
    CREATE: {
      ENTRY: "Failed to create your entry",
      TAGS: "Failed to create your tags",
      ENTRY_TAGS: "Failed to create your entry tags",
      NOTEBOOK: "Failed to create your notebook",
      SAVED_ITEM: {
        ENTRY: "Failed to save your entry",
      },
    },
    UPDATE: {
      ENTRY: "Failed to update your entry",
      NOTEBOOKS: "Failed to update your notebooks",
    },
    TRASH: {
      ENTRY: "Failed to trash your entry",
      NOTEBOOK: "Failed to trash your notebook",
      EMPTY: "Failed to empty your trash",
    },
    RESTORE: {
      ENTRY: "Failed to restore your entry",
      NOTEBOOK: "Failed to restore your notebook",
    },
    DELETE: {
      ENTRY: "Failed to delete your entry",
      ENTRIES: "Failed to delete your entries",
      ENTRY_TAGS: "Failed to delete your entry-tag relations",
      NOTEBOOK: "Failed to delete your notebook",
      NOTEBOOKS: "Failed to delete your notebooks",
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
      NO_ENTRY: (id: number) => `Entry with ID ${id} was not returned.`,
      NOTEBOOKS: "Error occurred while fetching notebooks.",
      NO_NOTEBOOK: (id: number) => `Notebook with ID ${id} was not returned.`,
      NOTEBOOK_METRICS: "Error occurred while fetching notebook metrics.",
      TAGS: "Error occurred while fetching tags.",
    },
    CREATE: {
      ENTRY: "Error occurred while creating entry.",
      TAGS: "Error occurred while creating tags.",
      ENTRY_TAGS: "Error occurred while creating entry tags.",
      NOTEBOOK: "Error occurred while creating notebook.",
      SAVED_ITEM: {
        ENTRY: "Error occurred while creating saved entry item.",
      },
    },
    UPDATE: {
      ENTRY: "Error occurred while updating entry.",
      NO_ENTRY: (id: number) =>
        `Entry with ID ${id} was updated, but no data was returned.`,
      NOTEBOOKS: "Error occurred while updating notebooks.",
      NO_NOTEBOOK: (id: number) =>
        `Notebook with ID ${id} was updated, but no data was returned.`,
    },
    DELETE: {
      ENTRY: "Error occurred while deleting entry.",
      ENTRY_TAGS: "Error occurred while deleting entry tags.",
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
      EMPTY: "Trash emptied",
    },
    RESTORE: {
      ENTRY: "Entry restored",
      NOTEBOOK: "Notebook restored",
    },
    DELETE: {
      ENTRY: "Entry deleted",
      ENTRIES: "Entries deleted",
      NOTEBOOK: "Notebook deleted",
      NOTEBOOKS: "Notebooks deleted",
      SAVED_ITEM: {
        ENTRY: "Entry unsaved",
      },
    },
  },
} as const;
