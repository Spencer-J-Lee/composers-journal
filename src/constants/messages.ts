export const ERROR_MESSAGES = {
  USER: {
    TRY_AGAIN_LATER: "Something went wrong. Please try again later.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    INTERNAL_SERVER_ERROR: "Something went wrong on our end.",

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

export const SUCCESS_MESSAGES = {
  PASSWORD_RESET: "Password successfully updated.",
} as const;
