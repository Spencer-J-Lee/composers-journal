/**
 * Note: This does not handle nested values
 */
export const genUrlWithSearchParams = (
  path: string,
  params: Record<string, unknown>,
): string => {
  const query = new URLSearchParams({
    payload: JSON.stringify(params),
  });

  return `${path}?${query.toString()}`;
};
