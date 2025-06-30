import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tiptap/react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/client/toasts";

import { RichTextMenuButton } from "./RichTextMenuButton";

type SetLinkButtonProps = {
  editor: Editor | null;
  isActive: boolean;
};

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
    <RichTextMenuButton faIcon={faLink} onClick={setLink} isActive={isActive}>
      Set link
    </RichTextMenuButton>
  );
};
