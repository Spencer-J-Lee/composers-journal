import { Editor, useEditorState } from "@tiptap/react";

import { AddYouTubeButton } from "./AddYouTubeButton";
import { RichTextMenuButton } from "./RichTextMenuButton";
import { SetLinkButton } from "./SetLinkButton";

type RichTextMenuBarProps = {
  editor: Editor | null;
};

/**
 * TODO: style this component
 */
export const RichTextMenuBar = ({ editor }: RichTextMenuBarProps) => {
  /**
   * `editorState` is used to watch for changes in editor state
   * to inform re-renders when necessary.
   */
  const editorState = useEditorState({
    editor,
    selector: (context) => ({
      isBold: context.editor?.isActive("bold"),
      isItalic: context.editor?.isActive("italic"),
      isUnderline: context.editor?.isActive("underline"),
      isParagraph: context.editor?.isActive("paragraph"),
      isBulletList: context.editor?.isActive("bulletList"),
      isOrderedList: context.editor?.isActive("orderedList"),
      isBlockquote: context.editor?.isActive("blockquote"),
      isLink: context.editor?.isActive("link"),
      isPlainText: !context.editor?.isActive("link"),
    }),
  });

  if (!editor || !editorState) {
    return null;
  }

  return (
    <div className="sticky left-0 right-0 top-0 z-10 flex flex-wrap gap-2">
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
      >
        B
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
      >
        I
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editorState.isUnderline}
      >
        U
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
      >
        Bullet List
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState.isOrderedList}
      >
        Ordered List
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState.isBlockquote}
      >
        Quote
      </RichTextMenuButton>

      <SetLinkButton editor={editor} isActive={!!editorState.isLink} />

      <RichTextMenuButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={editorState.isPlainText}
      >
        Unset link
      </RichTextMenuButton>

      <RichTextMenuButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        Break
      </RichTextMenuButton>

      <AddYouTubeButton editor={editor} />

      <RichTextMenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        Undo
      </RichTextMenuButton>
      <RichTextMenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        Redo
      </RichTextMenuButton>
    </div>
  );
};
