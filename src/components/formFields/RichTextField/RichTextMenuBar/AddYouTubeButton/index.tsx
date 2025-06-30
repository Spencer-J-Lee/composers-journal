import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Editor } from "@tiptap/react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/client/toasts";

import { toYouTubeEmbedUrl } from "./helpers";
import { RichTextMenuButton } from "../RichTextMenuButton";

type AddYouTubeButtonProps = {
  editor: Editor | null;
};

export const AddYouTubeButton = ({ editor }: AddYouTubeButtonProps) => {
  if (!editor) {
    return null;
  }

  const addYouTubeVideo = () => {
    // TODO: add modal for this(?)
    const url = prompt("Enter YouTube URL");

    if (url) {
      const embededUrl = toYouTubeEmbedUrl(url);
      if (!embededUrl) {
        showErrorToast(ERROR_MESSAGES.USER.YOUTUBE_LINK);
        return;
      }

      const success = editor.commands.setYoutubeVideo({
        src: embededUrl,
      });
      if (!success) {
        showErrorToast(ERROR_MESSAGES.USER.YOUTUBE_LINK);
      }
    }
  };

  return (
    <RichTextMenuButton faIcon={faYoutube} onClick={addYouTubeVideo}>
      YouTube
    </RichTextMenuButton>
  );
};
