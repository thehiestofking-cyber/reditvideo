import { Zap, Shield, Smartphone, Download } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast",
    description: "Download videos in seconds!",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Safe and anonymous downloads",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices",
  },
  {
    icon: Download,
    title: "HD Download",
    description: "Get high-quality videos easily",
  },
];

const Features = () => {
  return (
    <section className="w-full mb-24 animate-fade-in relative z-20" style={{ animationDelay: "0.4s" }}>
      <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 text-center shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2A1510] to-[#1A0D0A] border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-all">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
