import { Status, statusValues } from "./types";

export const isStatus = (value: unknown): value is Status => {
  return typeof value === "string" && statusValues.includes(value as Status);
};
