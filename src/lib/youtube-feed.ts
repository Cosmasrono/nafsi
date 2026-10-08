export type YouTubeVideo = {
  youtubeId: string;
  title: string;
  image: string;
  publishedAt: string;
};

function decodeXml(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
    const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
    if (!code.startsWith("#")) return named[code.toLowerCase()] ?? entity;
    const point = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
    return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : "�";
  });
}

// Read the small, fixed Atom vocabulary served by YouTube; never evaluate XML entities.
export function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  if (!/<feed(?:\s|>)/.test(xml) || !xml.includes("</feed>")) throw new Error("Invalid YouTube feed");
  const videos = new Map<string, YouTubeVideo>();
  const entries = [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/g)];
  for (const [, entry] of entries) {
    const field = (tag: string) => {
      const raw = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? "";
      return raw.startsWith("<![CDATA[") && raw.endsWith("]]>") ? raw.slice(9, -3) : decodeXml(raw);
    };
    const youtubeId = field("yt:videoId");
    const title = field("title");
    const published = Date.parse(field("published"));
    if (!/^[A-Za-z0-9_-]{11}$/.test(youtubeId) || !title || !Number.isFinite(published)) continue;
    videos.set(youtubeId, {
      youtubeId, title, publishedAt: new Date(published).toISOString(),
      image: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    });
  }
  if (entries.length && !videos.size) throw new Error("No valid videos in YouTube feed");
  return [...videos.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 15);
}
