import { EntryCard } from "../entryCard/EntryCard";
import { genTestResultsData } from "./testData";

export const Results = () => {
  const data = genTestResultsData(50);

  return (
    <section className="flex-1 px-8 py-5">
      <ul className="flex flex-col gap-4">
        {data.map((entry) => (
          <li key={entry.title}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
};
