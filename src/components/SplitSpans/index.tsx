import { splitBeforeLastNthWord } from "@/components/SplitSpans/splitBeforeLastNthWord";

type SplitSpansProps = {
  text: string;
  // Number of words from the end to group into the trailing span
  splitOnLastNthWord: number;
};

/**
 * `SplitSpans` renders text as two spans by splitting before the last N words.
 *
 * Example:
 *   text = "Hello world from ChatGPT"
 *   splitOnLastNthWord = 2
 *   → <span>Hello world</span> <span class="inline-block">from ChatGPT</span>
 *
 * This helps control wrapping behavior so that short trailing text
 * like a single word or phrase doesn’t appear isolated on a new line.
 */
export const SplitSpans = ({ text, splitOnLastNthWord }: SplitSpansProps) => {
  const [leading, trailing] = splitBeforeLastNthWord(text, splitOnLastNthWord);

  return (
    <>
      <span>{leading}</span> <span className="inline-block">{trailing}</span>
    </>
  );
};
