import { PageWrapperBase } from "@/components/pageWrappers/PageWrapperBase";
import { Filters } from "@/modules/search/components/Filters";
import { Results } from "@/modules/search/components/Results";

const SearchPage = () => {
  return (
    <PageWrapperBase className="relative flex">
      <Filters />
      <Results />
    </PageWrapperBase>
  );
};

export default SearchPage;
