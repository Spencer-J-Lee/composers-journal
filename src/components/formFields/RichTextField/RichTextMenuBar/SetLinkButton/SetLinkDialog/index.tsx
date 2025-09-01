import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";

import { Button } from "@/components/buttons/Button";
import { Dialog } from "@/components/dialogs/components/Dialog";
import { DialogActionsWrapper } from "@/components/dialogs/components/Dialog/DialogContent/DialogActions/DialogActionsWrapper";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";

import { setLinkFormSchema, SetLinkFormValues } from "./schema";
import { RichTextMenuButton } from "../../RichTextMenuButton";

type SetLinkDialogProps = {
  editor: Editor;
  onConfirm: (url: string) => boolean;
  onReset: () => void;
  active: boolean;
};

export const SetLinkDialog = ({
  editor,
  onConfirm,
  onReset,
  active,
}: SetLinkDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<SetLinkFormValues>({
    resolver: zodResolver(setLinkFormSchema),
    defaultValues: { url: editor.getAttributes("link").href ?? "" },
  });

  useEffect(() => {
    if (open) {
      methods.setValue("url", editor.getAttributes("link").href ?? "");
    }
  }, [editor, methods, open]);

  const handleSubmit = ({ url }: SetLinkFormValues) => {
    if (onConfirm(url)) {
      setOpen(false);
      methods.reset();
    }
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
    methods.reset();
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={
        <RichTextMenuButton faIcon={faLink} active={active}>
          Set link
        </RichTextMenuButton>
      }
      title="Set link"
      size="md"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: [med] figure out why this causes entry form to submit
            // even though this dialog isn't nested inside of the entry form
            e.stopPropagation();
            methods.handleSubmit(handleSubmit)(e);
          }}
        >
          <div className="mb-5 space-y-4">
            <RHFTextField name="url" label="URL" />
          </div>

          <DialogActionsWrapper>
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>

            {editor.getAttributes("link").href && (
              <Button onClick={handleReset} variant="negative">
                Unlink
              </Button>
            )}

            <Button type="submit">Confirm</Button>
          </DialogActionsWrapper>
        </form>
      </FormProvider>
    </Dialog>
  );
};
