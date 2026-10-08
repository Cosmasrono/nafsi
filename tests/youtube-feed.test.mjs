import { test } from "node:test";
import assert from "node:assert/strict";
import { parseYouTubeFeed } from "../src/lib/youtube-feed.ts";

const entry = (id, title, date) => `<entry><yt:videoId>${id}</yt:videoId><title>${title}</title><published>${date}</published></entry>`;
const feed = (entries) => `<feed>${entries.join("")}</feed>`;

test("returns only the 5 newest unique uploads, ordered by publication rather than feed order", () => {
  const entries = Array.from({ length: 17 }, (_, i) => entry(`video${String(i).padStart(6, "0")}`, `Upload ${i}`, `2026-09-${10 + i}T12:00:00Z`));
  const result = parseYouTubeFeed(feed([...entries, entries[16]]));
  assert.deepEqual(result.map(v => v.title), Array.from({ length: 5 }, (_, i) => `Upload ${16 - i}`));
});

test("decodes titles safely and supports CDATA and Unicode", () => {
  const result = parseYouTubeFeed(feed([
    entry("abcdefghijk", "Arts &amp; stories &#x1F600; &lt;script&gt;", "2026-09-23T13:00:07Z"),
    entry("12345678901", "<![CDATA[Music & community]]>", "2026-09-22T13:00:07Z"),
  ]));
  assert.equal(result[0].title, "Arts & stories 😀 <script>");
  assert.equal(result[1].title, "Music & community");
  assert.equal(result[0].image, "https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg");
});

test("skips invalid items and handles empty or unavailable feeds", () => {
  assert.deepEqual(parseYouTubeFeed(feed([])), []);
  assert.throws(() => parseYouTubeFeed("<html>Unavailable</html>"));
  assert.throws(() => parseYouTubeFeed(feed([entry("bad", "Invalid", "not a date")])));
  const result = parseYouTubeFeed(feed([
    entry("abcdefghijk", "Valid", "2026-09-23T13:00:07Z"),
    entry("bad", "Invalid", "not a date"),
  ]));
  assert.equal(result.length, 1);
});
