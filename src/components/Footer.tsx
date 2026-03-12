import RedditIcon from "./RedditIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full mt-20 py-8 border-t border-border">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RedditIcon className="w-5 h-5 text-primary" />
            <span className="text-sm">Reddit Video Downloader</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
            <span>Free & Fast</span>
            <span className="hidden md:inline">•</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span className="hidden md:inline">•</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground/60 text-center mt-6">
          Disclaimer: This tool is for personal use only. Users are responsible for 
          ensuring they have the right to download and use any content. We do not 
          host any videos or content.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
