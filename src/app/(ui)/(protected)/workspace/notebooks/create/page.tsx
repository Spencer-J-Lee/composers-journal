import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { CreateNotebookContent } from "@/modules/notebooks/create/CreateNotebookContent";

const CreateNotebookPage = () => {
  return (
    <WorkspacePageWrapper>
      <CreateNotebookContent />
    </WorkspacePageWrapper>
  );
};

export default CreateNotebookPage;
