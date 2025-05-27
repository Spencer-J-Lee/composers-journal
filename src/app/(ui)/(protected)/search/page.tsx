import { ELEMENT_IDS } from "@/constants/elementIds";
import { Filters } from "@/modules/search/components/Filters";
import { Results } from "@/modules/search/components/Results";

const SearchPage = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="relative flex">
      <Filters />
      <Results />
    </main>
  );
};

export default SearchPage;
