export const getPaginationParams = (
  page: number,
  limit: number,
): { limit: number; offset: number } => {
  return {
    limit,
    offset: page * limit,
  };
};
