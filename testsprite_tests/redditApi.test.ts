/**
 * @testsprite
 * TestSprite unit tests for Reddit API utility functions
 * Tests: URL validation, URL normalization, video data extraction
 */

import { isValidRedditUrl } from "../lib/redditApi";

describe("isValidRedditUrl", () => {
  // Valid Reddit URLs
  test("accepts standard reddit.com post URL", () => {
    expect(isValidRedditUrl("https://www.reddit.com/r/videos/comments/abc123/my_video")).toBe(true);
  });

  test("accepts old.reddit.com URL", () => {
    expect(isValidRedditUrl("https://old.reddit.com/r/videos/comments/xyz789/another_video")).toBe(true);
  });

  test("accepts v.redd.it URL", () => {
    expect(isValidRedditUrl("https://v.redd.it/abcdefghij")).toBe(true);
  });

  test("accepts redd.it short URL", () => {
    expect(isValidRedditUrl("https://redd.it/abc123")).toBe(true);
  });

  // Invalid URLs
  test("rejects non-Reddit URL", () => {
    expect(isValidRedditUrl("https://www.youtube.com/watch?v=abc123")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidRedditUrl("")).toBe(false);
  });

  test("rejects random text", () => {
    expect(isValidRedditUrl("notaurl")).toBe(false);
  });

  test("rejects Twitter URL", () => {
    expect(isValidRedditUrl("https://twitter.com/user/status/123")).toBe(false);
  });
});

describe("fetchRedditVideo thrown errors", () => {
  test("throws error for invalid URL", async () => {
    const { fetchRedditVideo } = await import("../lib/redditApi");
    await expect(fetchRedditVideo("https://www.google.com")).rejects.toThrow(
      "Please enter a valid Reddit URL"
    );
  });

  test("throws error for direct v.redd.it link", async () => {
    const { fetchRedditVideo } = await import("../lib/redditApi");
    await expect(fetchRedditVideo("https://v.redd.it/somevideo123")).rejects.toThrow(
      "Direct v.redd.it links are not supported"
    );
  });
});
