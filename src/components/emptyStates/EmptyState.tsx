import { ReactNode } from "react";
import Image from "next/image";

import { Typography } from "@/components/Typography";

export type EmptyStateProps = {
  imageData: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  children?: ReactNode;
};

export const EmptyState = ({
  imageData: { src, alt },
  title,
  description,
  children,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        style={{ objectFit: "cover" }}
        className="mb-3"
      />
      <Typography variant="h2" className="mb-2">
        {title}
      </Typography>
      <Typography variant="body">{description}</Typography>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
