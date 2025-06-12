import {
  faBold,
  faItalic,
  faListOl,
  faListUl,
  faQuoteRight,
  faRotateLeft,
  faRotateRight,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { Editor, useEditorState } from "@tiptap/react";

import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";

import { AddYouTubeButton } from "./AddYouTubeButton";
import { RichTextMenuButton } from "./RichTextMenuButton";
import { RichTextButtonGroup } from "./RichTextMenuGroup";
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
    <Card
      className="bg-surface sticky left-0 right-0 top-4 z-10 mb-2 flex flex-wrap gap-y-1.5"
      paddingSize="sm"
    >
      <RichTextButtonGroup>
        <RichTextMenuButton
          faIcon={faBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editorState.isBold}
        />
        <RichTextMenuButton
          faIcon={faItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editorState.isItalic}
        />
        <RichTextMenuButton
          faIcon={faUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editorState.isUnderline}
        />
      </RichTextButtonGroup>

      <Divider orientation="vertical" flexChild className="mx-3" />

      <RichTextButtonGroup>
        <RichTextMenuButton
          faIcon={faListUl}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState.isBulletList}
        />
        <RichTextMenuButton
          faIcon={faListOl}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState.isOrderedList}
        />
      </RichTextButtonGroup>

      <Divider orientation="vertical" flexChild className="mx-3" />

      <RichTextButtonGroup>
        <RichTextMenuButton
          faIcon={faQuoteRight}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
        />
      </RichTextButtonGroup>

      <Divider orientation="vertical" flexChild className="mx-3" />

      <RichTextButtonGroup>
        <SetLinkButton editor={editor} isActive={!!editorState.isLink} />
        <AddYouTubeButton editor={editor} />
      </RichTextButtonGroup>

      <Divider orientation="vertical" flexChild className="mx-3" />

      <RichTextButtonGroup>
        <RichTextMenuButton
          faIcon={faRotateLeft}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <RichTextMenuButton
          faIcon={faRotateRight}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
      </RichTextButtonGroup>
    </Card>
  );
};
