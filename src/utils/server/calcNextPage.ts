export const calcNextPage = (
  objs: unknown[],
  currPage: number,
  limit: number,
): number | null => {
  return objs.length === limit ? currPage + 1 : null;
};
