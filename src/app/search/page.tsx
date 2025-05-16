import { Filters } from "@/components/search/Filters";
import { Results } from "@/components/search/Results";
import { ELEMENT_IDS } from "@/components/shared/constants/elementIds";

const SearchPage = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="relative flex">
      <Filters />
      <Results />
    </main>
  );
};

export default SearchPage;
