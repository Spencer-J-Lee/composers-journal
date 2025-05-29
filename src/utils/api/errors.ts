import { ERROR_MESSAGES } from "@/constants/messages";

type RespondWithErrorProps = {
  status: number;
  userMsg: string;
  devMsg?: string;
  err?: unknown;
  resData?: Record<string, unknown>;
};

export const respondWithError = ({
  status,
  userMsg,
  devMsg,
  err,
  resData = {},
}: RespondWithErrorProps) => {
  if (devMsg) {
    const msg = `[Error ${status}] ${devMsg}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    err ? console.error(msg, err) : console.error(msg);
  }

  return Response.json({ error: userMsg, ...resData }, { status });
};

export const respondWithUnauthorized = () => {
  return respondWithError({
    status: 401,
    userMsg: ERROR_MESSAGES.USER.UNAUTHORIZED,
    devMsg: ERROR_MESSAGES.DEV.UNAUTHORIZED,
  });
};
