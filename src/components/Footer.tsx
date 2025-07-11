import { StyledLink } from "./StyledLink";
import { Typography } from "./Typography";

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
    illustrations_credit: genExternalLink(
      "Lanrentuku (懒人图库)",
      "https://www.figma.com/community/file/1127890500079525273",
    ),
    cc_by_4: genExternalLink(
      "CC BY 4.0 License",
      "https://www.figma.com/community/file/1127890500079525273",
    ),
  };

  return (
    <footer className="bg-background">
      <div className="m-auto max-w-screen-xl px-5 py-3 lg:px-11">
        <Typography variant="body">
          Built with {links.next}, {links.tailwind}. Deployed with{" "}
          {links.vercel}.
        </Typography>
        <Typography variant="body">
          Illustrations by {links.illustrations_credit}, shared on Figma
          Community. Used under the {links.cc_by_4}.
        </Typography>
      </div>
    </footer>
  );
};
