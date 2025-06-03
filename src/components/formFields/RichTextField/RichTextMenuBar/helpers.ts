export const toYouTubeEmbedUrl = (src: string): string | null => {
  try {
    const url = new URL(src);
    let embedUrl = "https://www.youtube.com/embed/";

    if (url.hostname === "youtu.be") {
      embedUrl += url.pathname.slice(1);
    } else if (
      url.hostname.includes("youtube.com") &&
      url.searchParams.get("v")
    ) {
      embedUrl += url.searchParams.get("v");
    } else {
      return src;
    }

    const start = Number(url.searchParams.get("t")) ?? 0;
    if (start) {
      embedUrl += `?start=${start}`;
    }

    return embedUrl;
  } catch {
    return null;
  }
};
