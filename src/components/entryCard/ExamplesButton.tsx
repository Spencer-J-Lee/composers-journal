import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export const ExamplesButton = () => {
  return (
    <button className="text-accent border-border bg-surface flex items-center justify-center border-l py-4 pl-4 pr-5 hover:brightness-[0.97] active:brightness-95">
      <FontAwesomeIcon size="2xl" icon={faMusic} />
    </button>
  );
};
