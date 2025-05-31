import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ExamplesButton = () => {
  return (
    <button className="text-accent bg-surface flex items-center justify-center p-4 hover:brightness-125 focus-visible:brightness-125 active:brightness-[1.15]">
      <FontAwesomeIcon size="2xl" icon={faHeadphones} />
    </button>
  );
};
