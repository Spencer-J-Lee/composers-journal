"use client";

import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import clsx from "clsx";

import { RichTextMenuBar } from "./RichTextMenuBar";
import { tipTapExtensions } from "./tipTapExtensions";

export type RichTextFieldProps = {
  value: string;
  placeholder?: string;
  hasError?: boolean;
  editable?: boolean;
  showMenuBar?: boolean;
  editorClassName?: string;
  onChange: (value: string) => void;
};

export const RichTextField = ({
  value,
  placeholder,
  hasError,
  editable = true,
  showMenuBar,
  editorClassName,
  onChange,
}: RichTextFieldProps) => {
  const editor = useEditor({
    extensions: [...tipTapExtensions, Placeholder.configure({ placeholder })],
    content: value,
    editorProps: {
      attributes: {
        class: "markdown-container h-full",
      },
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getText() ? editor.getHTML() : "");
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  return (
    <>
      {editable && showMenuBar && <RichTextMenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        spellCheck={false}
        className={clsx(
          "rounded-sm border",
          hasError ? "border-negative" : "border-transparent",
          editorClassName,
        )}
      />
    </>
  );
};
