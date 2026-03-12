export interface VideoData {
  title: string;
  author: string;
  subreddit: string;
  videoUrl: string;
  audioUrl?: string;
  thumbnail: string;
  duration?: string;
  permalink: string;
}

const REDDIT_URL_PATTERNS = [
  /reddit\.com\/r\/\w+\/comments\/\w+/,
  /redd\.it\/\w+/,
  /v\.redd\.it\/\w+/,
  /old\.reddit\.com\/r\/\w+\/comments\/\w+/,
];

export function isValidRedditUrl(url: string): boolean {
  return REDDIT_URL_PATTERNS.some(pattern => pattern.test(url));
}

function normalizeRedditUrl(url: string): string {
  // Remove trailing slashes and query params
  let normalized = url.split('?')[0].replace(/\/+$/, '');
  
  // Handle v.redd.it URLs
  if (normalized.includes('v.redd.it')) {
    // We'll need to fetch this differently
    return normalized;
  }
  
  // Handle redd.it short URLs
  if (normalized.includes('redd.it') && !normalized.includes('v.redd.it')) {
    return normalized;
  }
  
  // Convert old.reddit.com to reddit.com
  normalized = normalized.replace('old.reddit.com', 'reddit.com');
  
  // Ensure we have the full URL
  if (!normalized.startsWith('http')) {
    normalized = 'https://' + normalized;
  }
  
  return normalized;
}

export async function fetchRedditVideo(url: string): Promise<VideoData> {
  if (!isValidRedditUrl(url)) {
    throw new Error('Invalid URL: Please enter a valid Reddit URL. Supported formats: reddit.com, v.redd.it, old.reddit.com');
  }

  const normalizedUrl = normalizeRedditUrl(url);
  
  // Handle v.redd.it URLs - they redirect to the actual post
  let jsonUrl: string;
  
  if (normalizedUrl.includes('v.redd.it')) {
    // For v.redd.it, we need to follow the redirect first
    throw new Error('Invalid URL: Direct v.redd.it links are not supported. Please use the full Reddit post URL instead.');
  } else {
    jsonUrl = `${normalizedUrl}.json`;
  }

  try {
    const response = await fetch(jsonUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post data from Reddit. The post might be private or deleted.');
    }

    const data = await response.json();
    
    // Navigate to the post data
    const postData = data[0]?.data?.children?.[0]?.data;
    
    if (!postData) {
      throw new Error('Could not parse Reddit post data. Please check the URL and try again.');
    }

    // Check if it's a video post
    if (!postData.is_video && !postData.media?.reddit_video) {
      // Check for crosspost
      if (postData.crosspost_parent_list?.[0]?.is_video) {
        const crosspost = postData.crosspost_parent_list[0];
        return extractVideoData(crosspost);
      }
      throw new Error('Invalid URL: This post does not contain a Reddit video. Only v.redd.it videos are supported.');
    }

    return extractVideoData(postData);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

function extractVideoData(postData: any): VideoData {
  const redditVideo = postData.media?.reddit_video || postData.secure_media?.reddit_video;
  
  if (!redditVideo) {
    throw new Error('Could not find video data in this post.');
  }

  // Get the highest quality video URL
  let videoUrl = redditVideo.fallback_url || redditVideo.hls_url;
  
  if (!videoUrl) {
    throw new Error('Invalid URL: Could not find a downloadable video URL in this post.');
  }

  // Remove query parameters from fallback URL to get clean MP4
  if (videoUrl.includes('?')) {
    videoUrl = videoUrl.split('?')[0];
  }

  // Try to get audio URL
  const audioUrl = videoUrl.replace(/DASH_\d+/, 'DASH_audio');

  // Format duration
  let duration: string | undefined;
  if (redditVideo.duration) {
    const mins = Math.floor(redditVideo.duration / 60);
    const secs = redditVideo.duration % 60;
    duration = mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`;
  }

  // Get thumbnail
  let thumbnail = postData.thumbnail;
  if (postData.preview?.images?.[0]?.source?.url) {
    thumbnail = postData.preview.images[0].source.url.replace(/&amp;/g, '&');
  }

  return {
    title: postData.title,
    author: postData.author,
    subreddit: postData.subreddit,
    videoUrl,
    audioUrl,
    thumbnail,
    duration,
    permalink: postData.permalink,
  };
}
