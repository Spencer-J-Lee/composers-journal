import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

export const ExamplesButton = () => {
  return (
    <button className="text-accent border-border bg-surface flex items-center justify-center border-l p-4 hover:brightness-[0.97] active:brightness-95">
      <FontAwesomeIcon size="2xl" icon={faHeadphones} />
    </button>
  );
};
