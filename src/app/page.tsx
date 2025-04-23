import { ELEMENT_IDS } from "@/components/common/constants/elementIds";
import { Filters } from "@/components/searchPage/Filters";
import { Results } from "@/components/searchPage/Results";

export default function Home() {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="relative flex">
      <Filters />
      <Results />
    </main>
  );
}
