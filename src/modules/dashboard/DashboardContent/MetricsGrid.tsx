import { ReactNode } from "react";

import { Typography } from "@/components/Typography";

export type MetricsData = {
  title: string;
  content: ReactNode;
};

type MetricsGridProps = {
  data: MetricsData[];
};

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  return (
    <ul
      className="grid gap-2"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(248px, 100%), 1fr)",
      }}
    >
      {data.map(({ title, content }, i) => (
        <li key={i}>
          <Typography variant="smallMuted">{title}</Typography>
          <Typography variant="body" htmlTag="div">
            {content}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
