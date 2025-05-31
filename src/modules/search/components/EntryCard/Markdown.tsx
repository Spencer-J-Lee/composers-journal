import clsx from "clsx";
import DOMPurify from "dompurify";

type MarkdownProps = {
  markdown: string;
  className?: string;
};

export const Markdown = ({ markdown, className }: MarkdownProps) => {
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <div
      className={clsx("markdown-container", className)}
      dangerouslySetInnerHTML={{ __html: sanitizedMarkdown }}
    />
  );
};
