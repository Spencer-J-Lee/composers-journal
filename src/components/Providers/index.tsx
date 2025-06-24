import { ReactNode } from "react";

import { TanStackQueryProvider } from "./tanStackQuery";

export default function Providers({ children }: { children: ReactNode }) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>;
}
