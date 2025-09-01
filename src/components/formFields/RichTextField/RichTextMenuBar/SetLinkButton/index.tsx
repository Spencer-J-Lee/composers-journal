import { Editor } from "@tiptap/react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/client/toasts";

import { SetLinkDialog } from "./SetLinkDialog";

type SetLinkButtonProps = {
  editor: Editor | null;
  active: boolean;
};

export const SetLinkButton = ({ editor, active }: SetLinkButtonProps) => {
  if (!editor) {
    return null;
  }

  const handleConfirm = (url: string) => {
    // Unset link if given empty url
    if (url === "") {
      handleReset();
      return true;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();

      return true;
    } catch (err) {
      console.error(err);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN);

      return false;
    }
  };

  const handleReset = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  return (
    <SetLinkDialog
      editor={editor}
      onConfirm={handleConfirm}
      onReset={handleReset}
      active={active}
    />
  );
};
