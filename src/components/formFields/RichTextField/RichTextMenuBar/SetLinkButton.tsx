import { Editor } from "@tiptap/react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/toasts";

import { RichTextMenuButton } from "./RichTextMenuButton";

type SetLinkButtonProps = {
  editor: Editor | null;
  isActive: boolean;
};

/**
 * TODO: style this component
 */
export const SetLinkButton = ({ editor, isActive }: SetLinkButtonProps) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const prevUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", prevUrl);

    if (url === null) {
      return;
    }

    // Unsetting link
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN);
    }
  };

  return (
    <RichTextMenuButton onClick={setLink} isActive={isActive}>
      Set link
    </RichTextMenuButton>
  );
};
