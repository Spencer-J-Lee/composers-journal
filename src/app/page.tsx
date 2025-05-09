import { ELEMENT_IDS } from "@/components/shared/constants/elementIds";
import { Filters } from "@/components/search/Filters";
import { Results } from "@/components/search/Results";

export default function Home() {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="relative flex">
      <Filters />
      <Results />
    </main>
  );
}
