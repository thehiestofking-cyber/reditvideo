import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Link2 } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-slide-up">
      <div className="relative flex items-center bg-[#1A1A1A] rounded-full p-2 border border-white/5 shadow-[0_0_20px_rgba(255,69,0,0.1)] transition-all hover:border-primary/20">
        <div className="absolute left-6 text-muted-foreground pointer-events-none">
          <Link2 className="w-5 h-5 opacity-60" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Reddit video URL here..."
          className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 focus:outline-none pl-14 pr-4 py-3 min-w-0"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF3D00] hover:from-[#FF7043] hover:to-[#FF5722] text-white px-8 py-6 shadow-glow border-none whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Fetching...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              <span>Get Video</span>
            </>
          )}
        </Button>
      </div>
      <p className="text-muted-foreground/50 text-xs mt-4 text-center">
        Supports reddit.com, v.redd.it, and old.reddit.com links
      </p>
    </form>
  );
};

export default UrlInput;
