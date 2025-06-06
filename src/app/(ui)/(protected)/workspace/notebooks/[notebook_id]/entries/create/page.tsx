import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { CreateEntryContent } from "@/modules/createEntry/components/CreateEntryContent";

const CreateEntryPage = () => {
  return (
    <PageWrapper maxWidth="lg">
      <CreateEntryContent />
    </PageWrapper>
  );
};

export default CreateEntryPage;
