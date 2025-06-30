import { ReactNode } from "react";

import { TanStackQueryProvider } from "./TanStackQueryProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>;
}
