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
    TRASH: {
      ENTRY: "Failed to trash your entry.",
      NOTEBOOK: "Failed to trash your notebook",
    },
    RESTORE: {
      ENTRY: "Failed to restore your entry.",
      NOTEBOOK: "Failed to restore your notebook",
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
      ENTRIES: "Error occurred while fetching entries.",
      NOTEBOOKS: "Error occurred while fetching notebooks.",
    },
    CREATE: {
      ENTRY: "Error occurred while creating entry.",
      NOTEBOOK: "Error occurred while creating notebook.",
    },
    UPDATE: {
      ENTRY: "Error occurred while updating entry.",
      NOTEBOOK: "Error occurred while updating notebook.",
    },
    DELETE: {
      ENTRY: "Error occurred while deleting entry.",
      NOTEBOOK: "Error occurred while deleting notebook.",
    },
    DB_RETURNED_EMPTY: "Database return value is empty",
  },
} as const;

export const DEFAULT_ERROR_MSG = ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password successfully updated.",

  USER: {
    TRASH: {
      ENTRY: "Successfully trashed your entry.",
      NOTEBOOK: "Successfully trashed your notebook.",
    },
    RESTORE: {
      ENTRY: "Successfully restored your entry.",
      NOTEBOOK: "Successfully restored your notebook.",
    },
    DELETE: {
      ENTRY: "Successfully deleted your entry.",
      NOTEBOOK: "Successfully deleted your notebook.",
    },
  },
} as const;
