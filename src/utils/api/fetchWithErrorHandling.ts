import { DEFAULT_ERROR_MSG } from "@/constants/messages";

type FetchOptions = {
  defaultErrMsg?: string;
} & RequestInit;

export async function fetchWithErrorHandling<T>(
  input: RequestInfo | URL,
  options?: FetchOptions,
): Promise<T> {
  const { defaultErrMsg = DEFAULT_ERROR_MSG, ...fetchOptions } = options || {};

  const res = await fetch(input, fetchOptions);

  if (!res.ok) {
    let errMsg = defaultErrMsg;

    try {
      const data = await res.json();
      errMsg = data?.error || errMsg;
    } catch {
      // Body not JSON or couldn't parse – fallback to default message
    }

    throw new Error(errMsg);
  }

  try {
    return (await res.json()) as T;
  } catch {
    throw new Error(DEFAULT_ERROR_MSG);
  }
}
