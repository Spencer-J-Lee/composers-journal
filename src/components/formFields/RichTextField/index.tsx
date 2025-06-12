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
  onChange: (value: string) => void;
};

export const RichTextField = ({
  value,
  placeholder,
  hasError,
  editable = true,
  showMenuBar,
  onChange,
}: RichTextFieldProps) => {
  const editor = useEditor({
    extensions: [...tipTapExtensions, Placeholder.configure({ placeholder })],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-52 markdown-container",
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
    <div className="relative">
      {editable && showMenuBar && <RichTextMenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={clsx(
          "border",
          hasError ? "border-negative" : "border-transparent",
        )}
      />
    </div>
  );
};
