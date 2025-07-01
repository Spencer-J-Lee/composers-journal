import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { NotebooksContent } from "@/modules/notebooks/list/NotebooksContent";

const NotebooksPage = async () => {
  return (
    <WorkspacePageWrapper paddingSize="none">
      <NotebooksContent />
    </WorkspacePageWrapper>
  );
};

export default NotebooksPage;
