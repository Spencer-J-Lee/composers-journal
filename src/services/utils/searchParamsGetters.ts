export const getQueryString = (params: URLSearchParams, key: string) => {
  return params.get(key) ?? undefined;
};

export const getQueryInt = (params: URLSearchParams, key: string) => {
  const val = params.get(key);

  if (val === null) {
    return undefined;
  }

  const parsed = parseInt(val);
  return isNaN(parsed) ? undefined : parsed;
};

export const getQueryValue = <T>(
  params: URLSearchParams,
  key: string,
): T | undefined => {
  return (params.get(key) as T) ?? undefined;
};
