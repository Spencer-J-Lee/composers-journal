import { DEFAULT_ERROR_MSG } from "@/constants/messages";

type Options = {
  defaultErrMsg: string;
};

export const fetchWithErrorHandling = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: Options,
): Promise<T> => {
  const res = await fetch(input, init);
  const { defaultErrMsg = DEFAULT_ERROR_MSG } = options ?? {};

  if (!res.ok) {
    let errMsg = defaultErrMsg;

    try {
      const data = await res.json();
      errMsg = data?.error || errMsg;
    } catch {
      // Body not JSON or couldn't parse. Fallback to default message
    }

    throw new Error(errMsg);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  try {
    return (await res.json()) as T;
  } catch {
    throw new Error(DEFAULT_ERROR_MSG);
  }
};
