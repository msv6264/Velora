"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabase from "../../../lib/supabase";

const logo = "/logo.png";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Plus,
  Search,
  Settings,
  LogOut,
  Bookmark,
  Clock,
  TrendingUp,
  FolderOpen,
  Filter,
  XCircle,
  Menu, BrainCircuit,
  X,
} from "lucide-react";
import { getUserData } from "@/services/auth";
import { getResourceCnt, getVisitedResourcesCnt } from "@/services/dashboard.service";

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clipboardLink, setClipboardLink] = useState(null);
  const [userName, setUserName] = useState(null);
  const [resourceCount, setResourceCount] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const [reDiscRate, setReDiscRate] = useState(0);

  // Initialize sidebar based on screen width
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    const fetchCnts = async () => {
      const resCnt = await getResourceCnt();
      const visCnt = await getVisitedResourcesCnt();

      setResourceCount(typeof resCnt === 'number' ? resCnt : 0);
      setVisitedCount(typeof visCnt === 'number' ? visCnt : 0);

      resCnt > 0 ? (visCnt / resCnt) * 100 : 0;
      setReDiscRate(Math.round(calc));
    };
    fetchCnts();
  }, []);

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <BookOpen size={20} />,
      label: "My Library",
      href: "/library",
    },
    {
      icon: <Sparkles size={20} />,
      label: "Rediscovery",
      href: "/rediscovery",
    },
    {
      icon: <FolderOpen size={20} />,
      label: "Collections",
      href: "/collections",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
      type: "bottom",
    },
    {
      label: "Log out",
      href: "/",
      icon: <LogOut size={20} />,
      type: "bottom",
    },
  ];

  // fetching user name to greet user
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      const userName = user?.user_metadata?.username;
      setUserName(userName);
    };

    fetchUser();
  }, []);

  // Check clipboard for links (Zero-friction save)
  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text.startsWith("http")) {
          setClipboardLink(text);
        }
      } catch (err) {
        // Clipboard access might be denied, which is fine
      }
    };

    checkClipboard();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout failed: " + error.message);
    } else {
      router.push("/");
    }
  };

  const stats = [
    {
      label: "Total Saved",
      value: resourceCount,
      icon: <Bookmark className="text-[#ba8ffa]" size={20} />,
      href: "/library",
    },
    {
      label: "Revisited",
      value: visitedCount,
      icon: <Clock className="text-[#8791fe]" size={20} />,
      href: "/rediscovery",
    },
    {
      label: "Rediscovery Rate",
      value: `${reDiscRate.toFixed(0)}%`,
      icon: <BrainCircuit className="text-[#8791fe]" size={20} />,
    },
      {/* TO:DO - PAUSED TILL MVP */}
    // {
    //   label: "Streaks",
    //   value: "12 Days",
    //   icon: <TrendingUp className="text-[#ba8ffa]" size={20} />,
    // },
  ];

  // const resources = [
  //   {
  //     id: 1,
  //     title: "The Future of AI Agents",
  //     type: "Article",
  //     date: "2 hours ago",
  //     color: "bg-[#ba8ffa]",
  //     tab: "Article",
  //   },
  //   {
  //     id: 2,
  //     title: "Advanced React Patterns",
  //     type: "Video",
  //     date: "1 day ago",
  //     color: "bg-[#8791fe]",
  //     tab: "Video",
  //   },
  //   {
  //     id: 3,
  //     title: "UI Design Principles",
  //     type: "Course",
  //     date: "3 days ago",
  //     color: "bg-[#ba8ffa]",
  //     tab: "Course",
  //   },
  //   {
  //     id: 4,
  //     title: "Modern CSS Techniques",
  //     type: "Article",
  //     date: "4 days ago",
  //     color: "bg-[#8791fe]",
  //     tab: "Article",
  //   },
  //   {
  //     id: 5,
  //     title: "Web Performance Guide",
  //     type: "PDF",
  //     date: "1 week ago",
  //     color: "bg-[#ba8ffa]",
  //     tab: "PDF",
  //   },
  //   {
  //     id: 6,
  //     title: "TypeScript Best Practices",
  //     type: "Video",
  //     date: "2 weeks ago",
  //     color: "bg-[#8791fe]",
  //     tab: "Video",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit flex overflow-hidden relative">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-500 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-[#ba8ffa]/10 rounded-xl flex items-center justify-center border border-[#ba8ffa]/20 overflow-hidden p-2 cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(false);
                router.push("/");
              }}
            >
              <img
                src={logo}
                alt="Velora Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">Velora</span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-white md:hidden focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems
            .filter((item) => item.type !== "bottom")
            .map((item) => (
              <NavItem
                className="cursor-pointer"
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
                onClick={() => {
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                  router.push(item.href);
                }}
              />
            ))}
          <div className="pt-8 pb-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            System
          </div>
          {navItems
            .filter((item) => item.type === "bottom")
            .map((item) => (
              <NavItem
                className="cursor-pointer"
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
                onClick={() => {
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                  if (item.label === "Log out") {
                    handleLogout();
                  } else {
                    router.push(item.href);
                  }
                }}
              />
            ))}
        </nav>

            {/* TO-DO: view insigts page */}
        {/* <div className="p-6">
          <div className="p-5 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-xl">
            <p className="text-sm text-gray-400 mb-4 font-spectral italic">
              You've rediscovered 5 items this week!
            </p>
            <button
              onClick={() => {
                if (window.innerWidth < 768) setIsSidebarOpen(false);
                router.push("/insights");
              }}
              className="w-full py-3 bg-[#ba8ffa] text-black rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
            >
              View Insights
            </button>
          </div>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative h-screen bg-black">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 md:flex-none">
            {/* Sidebar toggle button (Mobile only) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white md:hidden focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => router.push("/add-resource")}
              className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[#ba8ffa] group"
            >
              <Plus
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#8791fe]/20 border border-[#8791fe]/30 flex items-center justify-center text-[#8791fe] font-bold">
              {userName?.[0]?.toUpperCase() || "V"}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">
              Welcome, <span className="text-[#ba8ffa]"> {userName} 👋🏻</span>
            </h1>
            <p className="text-gray-400 font-spectral italic text-lg sm:text-xl">
              What would you like to revisit today?
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl sm:rounded-4xl bg-white/2 border border-white/5 backdrop-blur-xl hover:bg-white/5 transition-all group ${stat.href ? 'cursor-pointer' : ''}`}
                onClick={() => stat.href && router.push(stat.href)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-all">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Resources Section */}
          {/* TO:DO - PAUSED TILL MVP */}
          {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              {["All", "Articles", "Videos", "Courses", "PDFs", "Tools"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-base sm:text-lg font-medium transition-all shrink-0 pb-1 ${activeTab === tab ? "text-white border-b-2 border-[#ba8ffa]" : "text-gray-500 hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "All"
              ? resources.map((res) => <ResourceCard key={res.id} {...res} />)
              : activeTab === "Articles"
                ? resources
                    .filter((res) => res.type === "Article")
                    .map((res) => <ResourceCard key={res.id} {...res} />)
                : activeTab === "Videos"
                  ? resources
                      .filter((res) => res.type === "Video")
                      .map((res) => <ResourceCard key={res.id} {...res} />)
                  : activeTab === "Courses"
                    ? resources
                        .filter((res) => res.type === "Course")
                        .map((res) => <ResourceCard key={res.id} {...res} />)
                    : activeTab === "PDFs"
                      ? resources
                          .filter((res) => res.type === "PDF")
                          .map((res) => <ResourceCard key={res.id} {...res} />)
                      : activeTab === "Tools"
                        ? resources
                            .filter((res) => res.type === "Tool")
                            .map((res) => (
                              <ResourceCard key={res.id} {...res} />
                            ))
                        : null}
          </div> */}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${active ? "bg-[#ba8ffa] text-black font-bold shadow-[0_0_20px_rgba(186,143,250,0.2)]" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const ResourceCard = ({ title, type, date, color }) => (
  <div className="p-6 rounded-3xl sm:rounded-4xl bg-white/2 border border-white/5 backdrop-blur-xl hover:bg-white/6 hover:border-white/10 transition-all duration-500 group cursor-pointer">
    <div className={`w-12 h-1.5 rounded-full ${color} mb-6`} />
    <h3 className="text-lg sm:text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] transition-colors">
      {title}
    </h3>
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-bold">
        {type}
      </span>
      <span className="text-xs text-gray-600 font-spectral italic">{date}</span>
    </div>
  </div>
);

export default Dashboard;

