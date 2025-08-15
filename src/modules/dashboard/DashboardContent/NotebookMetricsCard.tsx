"use client";

import Link from "next/link";

import { Card } from "@/components/Card";
import { ShimmerMetricsCard } from "@/components/shimmerLoaders/ShimmerMetricsCard";
import { Typography } from "@/components/Typography";
import { routes } from "@/constants/routes";
import { NotebookMetrics } from "@/db/queries/notebooks/get/types";
import { useNotebookMetrics } from "@/hooks/cache/notebooks";
import { useLogError } from "@/hooks/useLogError";

import { MetricsData, MetricsGrid } from "./MetricsGrid";

export const NotebookMetricsCard = () => {
  const { data, error, isPending, isError, isSuccess } = useNotebookMetrics();
  useLogError(error);

  if (isPending) {
    return <ShimmerMetricsCard itemCount={3} />;
  }

  const getMetricsData = (metrics: NotebookMetrics) => {
    const data: MetricsData[] = [
      {
        title: "Active notebooks",
        content: metrics.activeNotebooks,
      },
      {
        title: "Trashed notebooks",
        content: metrics.trashedNotebooks,
      },
    ];

    if (metrics.largestNotebook) {
      data.push({
        title: "Largest notebook",
        content: (
          <>
            <Link
              href={routes.notebook(metrics.largestNotebook.id)}
              className="hover:underline"
            >
              {metrics.largestNotebook.name}
            </Link>{" "}
            ({metrics.largestNotebook.entryCount} entries)
          </>
        ),
      });
    }

    return data;
  };

  return (
    <Card>
      <Typography variant="h3" className="mb-3">
        Notebook Metrics
      </Typography>

      {isError && (
        <Typography variant="fallback">
          Failed to load notebook metrics
        </Typography>
      )}

      {isSuccess && <MetricsGrid data={getMetricsData(data)} />}
    </Card>
  );
};
