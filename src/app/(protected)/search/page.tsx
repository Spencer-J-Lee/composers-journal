import { ELEMENT_IDS } from "@/constants/elementIds";
import { Filters } from "@/features/search/Filters";
import { Results } from "@/features/search/Results";

const SearchPage = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="relative flex">
      <Filters />
      <Results />
    </main>
  );
};

export default SearchPage;
