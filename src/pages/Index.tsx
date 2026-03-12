import { useState } from "react";
import { Helmet } from "react-helmet-async";
import RedditIcon from "@/components/RedditIcon";
import UrlInput from "@/components/UrlInput";
import VideoPreview from "@/components/VideoPreview";
import ErrorMessage from "@/components/ErrorMessage";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { fetchRedditVideo, VideoData } from "@/lib/redditApi";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUrl, setLastUrl] = useState("");
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setVideoData(null);
    setLastUrl(url);

    if (!url) {
      setError("Invalid URL: Please enter a Reddit video URL.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchRedditVideo(url);
      setVideoData(data);
      toast({
        title: "Video found!",
        description: "Your video is ready to download.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUrl) {
      handleSubmit(lastUrl);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reddit Video Downloader - Download Reddit Videos Free & Fast</title>
        <meta 
          name="description" 
          content="Download Reddit videos for free with our fast and easy-to-use tool. No login required. Supports v.redd.it and all Reddit video posts. High quality MP4 downloads." 
        />
        <meta name="keywords" content="reddit video downloader, download reddit video, v.redd.it downloader, reddit mp4 download, free reddit video download" />
        <link rel="canonical" href="https://reddit-video-downloader.lovable.app" />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden font-sans">
        {/* Deep Glowing Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] gradient-glow opacity-60 dark:opacity-60 light:opacity-20 animate-glow" style={{ opacity: theme === 'light' ? 0.2 : 0.6 }} />
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] gradient-glow opacity-40 dark:opacity-40 light:opacity-10 animate-glow" style={{ animationDelay: '2s', opacity: theme === 'light' ? 0.1 : 0.4 }} />
          
          {/* Floating Embers/Particles */}
          <div className="absolute top-[20%] left-[15%] w-3 h-3 rounded-sm bg-primary/80 shadow-glow animate-particle" />
          <div className="absolute top-[15%] right-[20%] w-4 h-4 rounded-full bg-primary/60 shadow-glow animate-particle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[40%] left-[10%] w-2 h-2 rounded-full bg-primary/90 shadow-glow animate-particle" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[35%] right-[15%] w-3 h-3 rounded-sm bg-primary/70 shadow-glow animate-particle" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-[60%] left-[25%] w-4 h-4 rounded-full bg-primary/50 shadow-glow animate-particle" style={{ animationDelay: '4s' }} />
          <div className="absolute top-[55%] right-[25%] w-2 h-2 rounded-full bg-primary/80 shadow-glow animate-particle" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[80%] left-[20%] w-3 h-3 rounded-sm bg-primary/60 shadow-glow animate-particle" style={{ animationDelay: '5s' }} />
          <div className="absolute top-[75%] right-[10%] w-4 h-4 rounded-full bg-primary/90 shadow-glow animate-particle" style={{ animationDelay: '0.5s' }} />
        </div>

        <main className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-24">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          {/* Hero Section */}
          <header className="text-center mb-16 animate-fade-in flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FF4500] text-white flex items-center justify-center mb-8 shadow-glow transition-transform hover:scale-105">
              <RedditIcon className="w-10 h-10" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Reddit Video</span><br/>
              <span className="text-primary">Downloader</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Download any Reddit video in seconds. Free, fast, and<br className="hidden md:block"/> no login required.
            </p>
          </header>

          {/* URL Input */}
          <section className="mb-20 max-w-2xl mx-auto relative z-20">
            <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
          </section>



          {/* Loading State */}
          {isLoading && (
            <div className="card-glass animate-pulse-glow text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="text-muted-foreground">Fetching video from Reddit...</p>
              </div>
            </div>
          )}

          {/* Video Preview */}
          {videoData && !isLoading && (
            <VideoPreview videoData={videoData} />
          )}

          {/* Error State */}
          {error && !isLoading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {/* Features */}
          <Features />

          {/* Bottom Call to Action */}
          <section className="mt-10 mb-20 text-center animate-fade-in relative z-20" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-display text-4xl font-bold mb-3 text-foreground">
              Reddit Video Downloader
            </h2>
            <p className="text-primary font-medium text-lg mb-8">
              Fast. Free. No Login Required.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF3D00] hover:from-[#FF7043] hover:to-[#FF5722] text-white px-10 py-4 font-bold text-lg shadow-glow border-none transition-transform hover:scale-105 active:scale-95">
              Download Now
            </button>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
