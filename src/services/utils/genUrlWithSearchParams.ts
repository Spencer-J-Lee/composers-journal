/**
 * Note: This does not handle nested values
 */
export const genUrlWithSearchParams = (
  path: string,
  params: Record<string, unknown>,
): string => {
  const query = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }

        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return `${path}?${query.toString()}`;
};
