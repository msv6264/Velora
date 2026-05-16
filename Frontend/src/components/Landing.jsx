import NeuralBg from "../components/NeuralBg";
import {
  Zap,
  Sparkles,
  Wind,
  MonitorSmartphone,
  BarChart3,
  FolderHeart,
  Moon,
  Cpu,
  Check,
  ArrowRight,
} from "lucide-react";

const PricingCard = ({ title, subtitle, price, features, isPro }) => (
  <div
    className={`p-10 rounded-[2.5rem] border ${isPro ? "border-[#ba8ffa]/30 bg-white/[0.04]" : "border-white/5 bg-white/[0.01]"} backdrop-blur-2xl hover:bg-white/[0.06] transition-all duration-700 flex flex-col h-full relative group`}
  >
    {isPro && (
      <div className="absolute top-0 right-0 bg-[#ba8ffa] text-black text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-[0.2em]">
        Most Popular
      </div>
    )}

    <div className="mb-10">
      <h3 className="text-3xl font-outfit text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-spectral text-lg leading-relaxed">
        {subtitle}
      </p>
    </div>

    <div className="mb-10 flex items-baseline gap-1">
      <span className="text-6xl font-outfit text-white font-bold tracking-tighter">
        {price}
      </span>
      {price !== "Free" && (
        <span className="text-gray-500 text-xl font-spectral italic ml-1">
          /month
        </span>
      )}
    </div>

    <ul className="space-y-5 mb-12 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-4 text-gray-300">
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isPro ? "bg-[#ba8ffa]/10 text-[#ba8ffa]" : "bg-white/5 text-gray-500"}`}
          >
            <Check size={14} />
          </div>
          <span className="font-spectral text-lg">{feature}</span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-5 rounded-2xl font-outfit font-bold text-lg transition-all duration-500 flex items-center justify-center gap-2 group/btn ${isPro ? "bg-[#ba8ffa] text-black hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] hover:scale-[1.02]" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
    >
      {isPro ? "Upgrade to Plus" : "Get Started"}
      <ArrowRight
        size={18}
        className="group-hover/btn:translate-x-1 transition-transform"
      />
    </button>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
  list,
  footer,
  isSubtle,
  horizontal,
 }) => (
  <div
    className={`p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] hover:border-white/10 transition-all duration-500 group flex ${horizontal ? "flex-col sm:flex-row items-start gap-5" : "flex-col"} h-full ${isSubtle ? "opacity-60 hover:opacity-100" : ""}`}
  >
    <div
      className={`p-3 rounded-xl bg-white/5 w-fit flex-shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ${horizontal ? "mb-2 sm:mb-0" : "mb-6"}`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-outfit text-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-spectral text-lg mb-4 leading-relaxed">
        {description}
      </p>

      {list && (
        <ul
          className={`${horizontal ? "flex flex-wrap gap-x-6 gap-y-2" : "space-y-2"} mb-6 mt-auto`}
        >
          {list.map((item, i) => (
            <li
              key={i}
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-[#ba8ffa]/50" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {footer && (
        <div
          className={`mt-auto pt-4 border-t border-white/5 ${!list ? "mt-auto" : ""}`}
        >
          <p className="text-sm text-[#8791fe] font-spectral italic opacity-80">
            {footer}
          </p>
        </div>
      )}
    </div>
  </div>
);

const features = [
  {
    icon: <Zap className="text-[#ba8ffa]" size={24} />,
    title: "One-Click Save",
    description: "Save resources instantly from anywhere.",
    list: [
      "YouTube videos",
      "GitHub repositories",
      "Articles",
      "AI tools",
      "Courses",
      "Tweets",
    ],
    footer: "Without breaking your flow.",
  },
  {
    icon: <Sparkles className="text-[#8791fe]" size={24} />,
    title: "Intelligent Rediscovery",
    description: "Velora resurfaces forgotten resources at the right moment.",
    footer:
      "Instead of endlessly collecting links, actually revisit what mattered to you.",
  },
  {
    icon: <Wind className="text-[#ba8ffa]" size={24} />,
    title: "Calm Learning Feed",
    description: "No clutter. No overwhelming dashboards.",
    footer:
      "A focused experience designed to help you consume knowledge intentionally.",
  },
  {
    icon: <MonitorSmartphone className="text-[#8791fe]" size={24} />,
    title: "Cross-Platform Capture",
    description: "Save from:",
    list: ["Chrome Extension", "Mobile Share Sheet", "Web App"],
    footer: "Your knowledge stays synced everywhere.",
  },
  {
    icon: <BarChart3 className="text-[#ba8ffa]" size={24} />,
    title: "Progress Tracking",
    description: "Track what you explored, revisited, or completed.",
    footer: "Turn passive saving into meaningful progress.",
  },
  // {
  //   icon: <FolderHeart className="text-[#8791fe]" size={24} />,
  //   title: "Personalized Collections",
  //   description: "Organize resources into clean, flexible collections without complexity.",
  //   footer: "Minimal structure. Maximum clarity."
  // },
  {
    icon: <Moon className="text-[#ba8ffa]" size={24} />,
    title: "Anti-Doomscrolling Design",
    description:
      "Built to reduce mindless consumption and encourage intentional learning habits.",
    footer: "Designed psychologically for focus, not addiction.",
  },
  // {
  //   icon: <Cpu className="text-gray-400" size={24} />,
  //   title: "Future AI Features",
  //   isSubtle: true,
  //   description: "(Keep this section subtle.)",
  //   list: ["AI summaries", "Smart recommendations", "Learning paths", "Semantic rediscovery"],
  //   footer: "Upcoming"
  // }
];

export default function Landing() {
  return (
    <>
      {/* Hero section */}
      <section id="heroSec" className="h-screen relative overflow-hidden flex items-center">
        <div className="w-[60%] relative z-10 pl-16">
          <div className="flex font-outfit flex-col ml-4 text-7xl gap-0">
            <span>
              Stop collecting <i className="text-[#ba8ffa]">knowledge.</i>{" "}
            </span>
            <span className="mt-8">
              Start revisiting <i className="text-[#8791fe]">it.</i>{" "}
            </span>
          </div>

          <div className="m-5 mt-8 text-gray-400 text-2xl font-spectral">
            Save less mindlessly. Revisit more intentionally. The calm, <br />
            anti-doomscroll sanctuary for your digital library.
          </div>
        </div>

        <NeuralBg side="right" />
        
      </section>

      {/* About page */}
      <section id="abt" className="h-screen relative overflow-hidden flex items-center justify-end">
        <div className="w-[50%] relative z-10 pr-16 text-left">
          <h2 className="text-5xl font-outfit  text-white mb-8">
            Ever saved something <i className="text-[#ba8ffa]">important…</i>{" "}
            and completely forgotten where you saved it?
          </h2>
          <p className="text-gray-400 text-2xl font-spectral">
            Velora helps you rediscover forgotten videos, articles, tools, and
            ideas <br />— before they disappear into digital clutter.
          </p>
        </div>
        <NeuralBg side="left" />
      </section>

      {/* features */}
      <section id="feat" className="min-h-screen relative overflow-hidden py-24 px-16">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="text-5xl font-outfit text-white mb-4 tracking-tight">
              Designed for <i className="text-[#ba8ffa]">intentional</i>{" "}
              learners.
            </h2>
            <p className="text-gray-500 text-xl font-spectral max-w-2xl">
              Velora isn't just another bookmark manager. It's a sanctuary for
              your digital discoveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 cursor-pointer ">
            <FeatureCard {...features[0]} horizontal />
            {features.slice(1, 6).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-2/3 mx-auto">
            {features.slice(6, 8).map((feature, index) => (
              <FeatureCard key={index + 6} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen relative overflow-hidden py-32 px-16">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="text-6xl font-outfit text-white mb-6 tracking-tight">
              Invest in your <i className="text-[#ba8ffa]">focus.</i>
            </h2>
            <p className="text-gray-400 text-xl font-spectral max-w-xl leading-relaxed">
              Choose the plan that fits your learning habits. From casual
              discovery to power research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#ba8ffa]/5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8791fe]/5 blur-[120px] rounded-full" />

            <PricingCard
              title="Explorer"
              subtitle="Best for students and casual users starting their intentional journey."
              price="Free"
              features={[
                "Basic saving",
                "Categories",
                "Rediscovery feed",
                "Limited collections",
                "Chrome extension",
                "Mobile PWA access",
              ]}
            />

            <PricingCard
              isPro
              title="Velora Plus"
              subtitle="For power learners, creators, and developers who need more."
              price="₹199"
              features={[
                "Unlimited saves",
                "AI summaries",
                "Advanced rediscovery",
                "Smart recommendations",
                "Streak tracking",
                "Custom themes",
                "Priority features",
              ]}
            />
          </div>

          <div className="mt-24 text-center">
            <p className="text-gray-500 font-spectral italic text-lg">
              No hidden fees. Cancel anytime. <br />
              Need a team plan?{" "}
              <a
                href="#"
                className="text-[#8791fe] hover:underline underline-offset-4"
              >
                Contact us
              </a>
              .
            </p>
          </div>
        </div>

        <NeuralBg side="right" />
      </section>
    </>
  );
}
