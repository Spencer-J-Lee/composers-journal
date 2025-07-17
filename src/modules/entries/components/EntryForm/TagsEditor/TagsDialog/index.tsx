import { faTags } from "@fortawesome/free-solid-svg-icons";
import { DialogClose } from "@radix-ui/react-dialog";

import { Dialog } from "@/components/dialog";
import { IconButton } from "@/components/iconButtons/IconButton";

export const TagsDialog = () => {
  return (
    <Dialog
      trigger={<IconButton faIcon={faTags} className="shrink-0" />}
      title="Tags Editor"
    >
      <div className="mt-[25px] flex justify-end">
        {/* TODO: tag editor field */}
        <DialogClose asChild>
          <button className="bg-green4 text-green11 hover:bg-green5 focus-visible:outline-green6 inline-flex h-[35px] select-none items-center justify-center rounded px-[15px] font-medium leading-none outline-none outline-offset-1 focus-visible:outline-2">
            Save changes
          </button>
        </DialogClose>
      </div>
    </Dialog>
  );
};
