import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Reddit Video Downloader</title>
        <meta name="description" content="Privacy Policy for Reddit Video Downloader." />
      </Helmet>
      
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 md:py-16 flex-1">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="card-glass p-6 md:p-10 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                <p>
                  We believe in protecting your privacy. We do not require you to create an account, provide your name,
                  email address, or any other personal identifiers to use our core downloading service. We temporarily
                  process the Reddit URLs you submit strictly to fetch and provide the requested video file.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                <p>
                  The Reddit URLs you provide are used in real-time to query Reddit's public API to locate the media
                  files. We do not maintain logs or histories of the videos you download in any identifiable manner.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookies and Tracking</h2>
                <p>
                  We use standard analytics tools (such as Google Analytics) to understand how visitors interact with
                  our website. These tools may use cookies to collect non-personal information such as your browser type,
                  operating system, and the pages you visit. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
                <p>
                  Our service fetches content from Reddit, a third-party platform. Your downloaded content originates
                  from Reddit, not from our servers. We are not responsible for the content, privacy practices, or
                  data collection policies of Reddit or any other third-party websites linked from our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this privacy policy at any time. Any changes will be posted on this page
                  with a revised "Last updated" date. Your continued use of the service after such changes constitutes
                  your acceptance of the new privacy policy.
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Privacy;
