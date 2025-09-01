/**
 * Splits a string into two parts:
 * - `leading`: all words except the last
 * - `trailing`: the final word
 *
 * This helps prevent layouts where a single word wraps onto its own line,
 * which can look visually awkward.
 */
export const splitBeforeLastNthWord = (
  text: string,
  n: number,
): [string, string] => {
  const words = text.split(" ");
  const leading = words.slice(0, -n).join(" ");
  const trailing = words.slice(-n).join(" ");

  return [leading, trailing];
};
