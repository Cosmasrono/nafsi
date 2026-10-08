import { parseYouTubeFeed } from "./youtube-feed";

// Resolved from the public @NaiWave channel page.
const CHANNEL_ID = "UCxdaiu7u2n8wsdEsCTKgobQ";

export async function getLatestYouTubeVideos() {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);
  return parseYouTubeFeed(await response.text());
}
