import { ReactNode, useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Collapsible } from "./Collapsible";
import { Typography } from "./Typography";

type CollapsibleSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export const CollapsibleSection = ({
  title,
  children,
  className,
}: CollapsibleSectionProps) => {
  const [show, setShow] = useState(true);

  return (
    <section className={clsx(className)}>
      <button
        className="mb-2 flex w-full items-center gap-x-3 rounded text-left"
        onClick={() => setShow((prev) => !prev)}
      >
        <Typography variant="h2">{title}</Typography>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </button>

      <Collapsible show={show}>{children}</Collapsible>
    </section>
  );
};
