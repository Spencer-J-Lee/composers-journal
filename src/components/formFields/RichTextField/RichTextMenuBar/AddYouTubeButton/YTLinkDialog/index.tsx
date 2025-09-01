import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/buttons/Button";
import { Dialog } from "@/components/dialogs/components/Dialog";
import { DialogActionsWrapper } from "@/components/dialogs/components/Dialog/DialogContent/DialogActions/DialogActionsWrapper";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";

import { youTubeUrlFormSchema, YouTubeUrlFormValues } from "./schema";
import { RichTextMenuButton } from "../../RichTextMenuButton";

type YTLinkDialogProps = {
  onConfirm: (url: string) => boolean;
};

export const YTLinkDialog = ({ onConfirm }: YTLinkDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<YouTubeUrlFormValues>({
    resolver: zodResolver(youTubeUrlFormSchema),
    defaultValues: { url: "" },
  });

  const handleSubmit = ({ url }: YouTubeUrlFormValues) => {
    if (onConfirm(url)) {
      setOpen(false);
      methods.reset();
    }
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={
        <RichTextMenuButton faIcon={faYoutube}>YouTube</RichTextMenuButton>
      }
      title="Embed YouTube Video"
      description={
        <>
          Paste a YouTube link straight from your browser's address bar or by
          right-clicking a video. <b>Links with timestamps are supported.</b>
        </>
      }
      size="md"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: figure out why this is causing entry form to submit even
            // though this dialog isn't nested inside of the entry form
            e.stopPropagation();
            methods.handleSubmit(handleSubmit)(e);
          }}
        >
          <div className="mb-5 space-y-4">
            <RHFTextField name="url" label="YouTube URL" />
          </div>

          <DialogActionsWrapper>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </DialogActionsWrapper>
        </form>
      </FormProvider>
    </Dialog>
  );
};
