import { usePathname } from "next/navigation";

export const useSidebarLinkProps = (route: string) => {
  const pathname = usePathname();

  return {
    activeClassName: pathname === route ? "pointer-events-none" : "",
    isActive: pathname === route,
  };
};
