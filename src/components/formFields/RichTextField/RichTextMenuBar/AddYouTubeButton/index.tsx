import { Editor } from "@tiptap/react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/client/toasts";

import { toYouTubeEmbedUrl } from "./helpers";
import { YTLinkDialog } from "./YTLinkDialog";

type AddYouTubeButtonProps = {
  editor: Editor | null;
};

export const AddYouTubeButton = ({ editor }: AddYouTubeButtonProps) => {
  if (!editor) {
    return null;
  }

  const addYouTubeVideo = (url: string) => {
    const embededUrl = toYouTubeEmbedUrl(url);
    if (!embededUrl) {
      showErrorToast(ERROR_MESSAGES.USER.YOUTUBE_LINK);
      return false;
    }

    const success = editor.commands.setYoutubeVideo({
      src: embededUrl,
    });
    if (!success) {
      showErrorToast(ERROR_MESSAGES.USER.YOUTUBE_LINK);
      return false;
    }

    return true;
  };

  return <YTLinkDialog onConfirm={addYouTubeVideo} />;
};
