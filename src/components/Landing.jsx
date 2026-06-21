"use client";
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
    className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border ${isPro ? "border-[#ba8ffa]/30 bg-white/4" : "border-white/5 bg-white/1"} backdrop-blur-2xl hover:bg-white/6 transition-all duration-700 flex flex-col h-full relative group`}
  >
    {isPro && (
      <div className="absolute top-0 right-0 bg-[#ba8ffa] text-black text-[10px] font-black px-3 sm:px-6 py-2 rounded-bl-lg sm:rounded-bl-2xl uppercase tracking-[0.2em]">
        Most Popular
      </div>
    )}

    <div className="mb-6 sm:mb-8 lg:mb-10">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-outfit text-white mb-2 sm:mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-spectral text-sm sm:text-base lg:text-lg leading-relaxed">
        {subtitle}
      </p>
    </div>

    <div className="mb-6 sm:mb-8 lg:mb-10 flex items-baseline gap-1">
      <span className="text-4xl sm:text-5xl lg:text-6xl font-outfit text-white font-bold tracking-tighter">
        {price}
      </span>
      {price !== "Free" && (
        <span className="text-gray-500 text-sm sm:text-base lg:text-xl font-spectral italic ml-1">
          /month
        </span>
      )}
    </div>

    <ul className="space-y-3 sm:space-y-4 lg:space-y-5 mb-8 sm:mb-10 lg:mb-12 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 sm:gap-4 text-gray-300">
          <div
            className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${isPro ? "bg-[#ba8ffa]/10 text-[#ba8ffa]" : "bg-white/5 text-gray-500"}`}
          >
            <Check size={14} />
          </div>
          <span className="font-spectral text-sm sm:text-base lg:text-lg">
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-outfit font-bold text-sm sm:text-base lg:text-lg transition-all duration-500 flex items-center justify-center gap-2 group/btn ${isPro ? "bg-[#ba8ffa] text-black hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] hover:scale-[1.02]" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
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
    className={`p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md hover:bg-white/7 hover:border-white/10 transition-all duration-500 group flex ${horizontal ? "flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-5" : "flex-col"} h-full ${isSubtle ? "opacity-60 hover:opacity-100" : ""}`}
  >
    <div
      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 w-fit shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ${horizontal ? "mb-2 sm:mb-0" : "mb-4 sm:mb-6"}`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-outfit text-white mb-1 sm:mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-spectral text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 leading-relaxed">
        {description}
      </p>

      {list && (
        <ul
          className={`${horizontal ? "flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2" : "space-y-2"} mb-4 sm:mb-6 mt-auto`}
        >
          {list.map((item, i) => (
            <li
              key={i}
              className="text-xs sm:text-sm text-gray-500 flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-[#ba8ffa]/50 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {footer && (
        <div
          className={`mt-auto pt-3 sm:pt-4 border-t border-white/5 ${!list ? "mt-auto" : ""}`}
        >
          <p className="text-xs sm:text-sm text-[#8791fe] font-spectral italic opacity-80">
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
      <section
        id="heroSec"
        className="min-h-[70vh] sm:min-h-screen relative overflow-hidden flex flex-col sm:flex-row items-center justify-center sm:justify-start px-4 sm:px-8 lg:px-16 py-16 sm:py-0"
      >
        <div className="w-full sm:w-[60%] relative z-10">
          <div className="flex font-outfit flex-col text-4xl sm:text-5xl lg:text-7xl gap-0 text-center sm:text-left">
            <span>
              Stop collecting <i className="text-[#ba8ffa]">knowledge.</i>{" "}
            </span>
            <span className="mt-4 sm:mt-6 lg:mt-8">
              Start revisiting <i className="text-[#8791fe]">it.</i>{" "}
            </span>
          </div>

          <div className="mt-6 sm:mt-8 text-gray-400 text-base sm:text-lg lg:text-2xl font-spectral text-center sm:text-left">
            Save less mindlessly. Revisit more intentionally. The calm,
            anti-doomscroll sanctuary for your digital library.
          </div>
        </div>

        <NeuralBg side="right" />
      </section>

      {/* About page */}
      <section
        id="abt"
        className="min-h-[60vh] sm:min-h-screen relative overflow-hidden flex flex-col sm:flex-row items-center justify-center sm:justify-end px-4 sm:px-8 lg:px-16 py-16 sm:py-0"
      >
        <div className="w-full sm:w-[50%] relative z-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-outfit text-white mb-6 sm:mb-8">
            Ever saved something <i className="text-[#ba8ffa]">important…</i>{" "}
            and completely forgotten where you saved it?
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-2xl font-spectral">
            Velora helps you rediscover forgotten videos, articles, tools, and
            ideas — before they disappear into digital clutter.
          </p>
        </div>
        <NeuralBg side="left" />
      </section>

      {/* features */}
      <section
        id="feat"
        className="min-h-screen relative overflow-hidden py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-16"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-outfit text-white mb-3 sm:mb-4 tracking-tight px-2">
              Designed for <i className="text-[#ba8ffa]">intentional</i>{" "}
              learners.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base lg:text-xl font-spectral max-w-2xl px-2">
              Velora isn't just another bookmark manager. It's a sanctuary for
              your digital discoveries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 cursor-pointer">
            <FeatureCard {...features[0]} horizontal />
            {features.slice(1, 6).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 lg:w-2/3 mx-auto">
            {features.slice(6, 8).map((feature, index) => (
              <FeatureCard key={index + 6} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="min-h-screen relative overflow-hidden py-12 sm:py-20 lg:py-32 px-4 sm:px-8 lg:px-16"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-24 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-outfit text-white mb-4 sm:mb-6 tracking-tight px-2">
              Invest in your <i className="text-[#ba8ffa]">focus.</i>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-xl font-spectral max-w-xl leading-relaxed px-2">
              Choose the plan that fits your learning habits. From casual
              discovery to power research.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#ba8ffa]/5 blur-[120px] rounded-full hidden lg:block" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8791fe]/5 blur-[120px] rounded-full hidden lg:block" />

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

          <div className="mt-12 sm:mt-16 lg:mt-24 text-center px-4">
            <p className="text-gray-500 font-spectral italic text-sm sm:text-base lg:text-lg">
              No hidden fees. Cancel anytime. <br className="hidden sm:block" />
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
