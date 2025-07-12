export const withFirstResult = async <T>(
  func: () => Promise<T[]>,
  notFoundMsg: string,
): Promise<T> => {
  const objs = await func();
  if (!objs[0]) throw new Error(notFoundMsg);
  return objs[0];
};
