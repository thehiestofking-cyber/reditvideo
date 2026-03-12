import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Clock, User } from "lucide-react";

interface VideoData {
  title: string;
  author: string;
  subreddit: string;
  videoUrl: string;
  audioUrl?: string;
  thumbnail: string;
  duration?: string;
  permalink: string;
}

interface VideoPreviewProps {
  videoData: VideoData;
}

const VideoPreview = ({ videoData }: VideoPreviewProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(videoData.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reddit-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback: open in new tab
      window.open(videoData.videoUrl, '_blank');
    }
  };

  return (
    <div className="w-full card-glass animate-scale-in">
      {/* Video Player */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-4">
        <video
          src={videoData.videoUrl}
          poster={videoData.thumbnail}
          controls
          className="w-full h-full object-contain"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2">
          {videoData.title}
        </h3>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary">
            <User className="w-3.5 h-3.5" />
            u/{videoData.author}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary">
            r/{videoData.subreddit}
          </span>
          {videoData.duration && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary">
              <Clock className="w-3.5 h-3.5" />
              {videoData.duration}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="hero"
            size="lg"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="w-5 h-5" />
            Download MP4
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={() => window.open(`https://reddit.com${videoData.permalink}`, '_blank')}
            className="flex-1"
          >
            <ExternalLink className="w-5 h-5" />
            View on Reddit
          </Button>
        </div>

        {!videoData.audioUrl && (
          <p className="text-xs text-muted-foreground text-center">
            Note: Some Reddit videos may not include audio
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
