import { usePathname } from "next/navigation";

export const useSidebarLinkStyles = (route: string) => {
  const pathname = usePathname();

  return {
    activeClassName:
      pathname === route ? "pointer-events-none brightness-[1.4]" : "",
  };
};
