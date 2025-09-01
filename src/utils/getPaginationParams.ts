export const getPaginationParams = (
  page: number,
  limit: number,
  offset: number = 0,
): { limit: number; offset: number } => {
  return {
    limit,
    offset: page * limit + offset,
  };
};
