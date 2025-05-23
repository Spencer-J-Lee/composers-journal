import { StyledLink } from "./StyledLink";

export const Footer = () => {
  const genExternalLink = (text: string, href: string) => {
    return (
      <StyledLink href={href} external>
        {text}
      </StyledLink>
    );
  };

  const links = {
    next: genExternalLink("Next.js", "https://nextjs.org/"),
    tailwind: genExternalLink("Tailwind CSS", "https://tailwindcss.com/"),
    vercel: genExternalLink("Vercel", "https://vercel.com/"),
  };

  return (
    <footer className="bg-background">
      <div className="m-auto max-w-screen-xl px-5 py-3 lg:px-11">
        Built with {links.next}, {links.tailwind}. Deployed with {links.vercel}.
      </div>
    </footer>
  );
};
