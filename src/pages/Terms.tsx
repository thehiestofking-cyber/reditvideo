import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Reddit Video Downloader</title>
        <meta name="description" content="Terms and Conditions for using Reddit Video Downloader." />
      </Helmet>
      
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 md:py-16 flex-1">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="card-glass p-6 md:p-10 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our Reddit Video Downloader, you agree to be bound by these Terms and Conditions.
                  If you do not agree, please refrain from using our service. We provide a tool that helps users download
                  media content publicly available on Reddit for personal, offline viewing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. User Responsibilities</h2>
                <p>
                  You agree to use this service only for lawful purposes. You are solely responsible for ensuring you have the
                  right to download and use the content. You may not use our service to download copyrighted material you do
                  not have permission to use, or any content that violates the law or Reddit's own terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Copyright & Intellectual Property</h2>
                <p>
                  We do not host, own, or store any of the videos downloaded through our service. All media downloaded belongs
                  to its respective copyright owners. Our tool merely facilitates the extraction of the CDN links provided by
                  Reddit. Any redistribution, commercial use, or modification of downloaded content is strictly prohibited unless
                  authorized by the rights holder.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Disclaimer of Warranties</h2>
                <p>
                  Our service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, explicit or implied.
                  We do not guarantee that the service will be continuous, uninterrupted, error-free, or entirely secure.
                  We cannot guarantee the successful downloading of any specific video due to potential limitations imposed
                  by Reddit or technical difficulties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
                <p>
                  Under no circumstances shall we be liable for any direct, indirect, incidental, special, or consequential
                  damages arising out of the use or inability to use our service. You agree to indemnify and hold us harmless
                  from any claims arising out of your reliance on our tool or downloaded content.
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

export default Terms;
