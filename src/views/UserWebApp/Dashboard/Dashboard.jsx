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
} from "lucide-react";
import { getUserData } from "@/src/services/auth";

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [clipboardLink, setClipboardLink] = useState(null);
  const [userName, setUserName] = useState(null);

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
      value: "128",
      icon: <Bookmark className="text-[#ba8ffa]" size={20} />,
    },
    {
      label: "Revisited",
      value: "42",
      icon: <Clock className="text-[#8791fe]" size={20} />,
    },
    {
      label: "Streaks",
      value: "12 Days",
      icon: <TrendingUp className="text-[#ba8ffa]" size={20} />,
    },
  ];

  const resources = [
    {
      id: 1,
      title: "The Future of AI Agents",
      type: "Article",
      date: "2 hours ago",
      color: "bg-[#ba8ffa]",
      tab: "Article",
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      type: "Video",
      date: "1 day ago",
      color: "bg-[#8791fe]",
      tab: "Video",
    },
    {
      id: 3,
      title: "UI Design Principles",
      type: "Course",
      date: "3 days ago",
      color: "bg-[#ba8ffa]",
      tab: "Course",
    },
    {
      id: 4,
      title: "Modern CSS Techniques",
      type: "Article",
      date: "4 days ago",
      color: "bg-[#8791fe]",
      tab: "Article",
    },
    {
      id: 5,
      title: "Web Performance Guide",
      type: "PDF",
      date: "1 week ago",
      color: "bg-[#ba8ffa]",
      tab: "PDF",
    },
    {
      id: 6,
      title: "TypeScript Best Practices",
      type: "Video",
      date: "2 weeks ago",
      color: "bg-[#8791fe]",
      tab: "Video",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-500 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex items-center gap-3">
          <div
            className="w-10 h-10 bg-[#ba8ffa]/10 rounded-xl flex items-center justify-center border border-[#ba8ffa]/20 overflow-hidden p-2"
            onClick={() => router.push("/")}
          >
            <img
              src={logo}
              alt="Velora Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight">Velora</span>
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
                onClick={() => router.push(item.href)}
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
                onClick={() =>
                  item.label === "Log out"
                    ? handleLogout()
                    : router.push(item.href)
                }
              />
            ))}
        </nav>

        <div className="p-6">
          <div className="p-5 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-xl">
            <p className="text-sm text-gray-400 mb-4 font-spectral italic">
              You've rediscovered 5 items this week!
            </p>
            <button
              onClick={() => router.push("/insights")}
              className="w-full py-3 bg-[#ba8ffa] text-black rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
            >
              View Insights
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative h-screen bg-black">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-xl border-b border-white/5 p-6 flex items-center justify-between">
          <div className="relative w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search your knowledge base..."
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
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

        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">
              Welcome, <span className="text-[#ba8ffa]"> {userName} 👋🏻</span>
            </h1>
            <p className="text-gray-400 font-spectral italic text-xl">
              What would you like to revisit today?
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-xl hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-all">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Resources Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              {["All", "Articles", "Videos", "Courses", "PDFs", "Tools"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-lg font-medium transition-all ${activeTab === tab ? "text-white border-b-2 border-[#ba8ffa]" : "text-gray-500 hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {/* TO-DO: enhancement in production */}
            {/* <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Filter size={18} />
              <span>Filter</span>
            </button> */}
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
          </div>
        </div>

        {/* TO-DO: implement clipboard suggestion in production when backend is added */}
        {/* Clipboard Suggestion Toast */}
        {/* {clipboardLink && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-[#121212]/80 backdrop-blur-3xl border border-[#ba8ffa]/30 p-5 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6 max-w-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#ba8ffa]/10 flex items-center justify-center text-[#ba8ffa]">
                <Plus size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Link detected in clipboard</p>
                <p className="text-white font-medium truncate w-64">{clipboardLink}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/add-resource?url=${encodeURIComponent(clipboardLink)}`)}
                  className="px-6 py-2.5 bg-[#ba8ffa] text-black rounded-xl font-bold text-sm hover:scale-[1.05] transition-all"
                >
                  Save Now
                </button>
                <button
                  onClick={() => setClipboardLink(null)}
                  className="p-2.5 text-gray-500 hover:text-white transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        )} */}
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
  <div className="p-6 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-xl hover:bg-white/6 hover:border-white/10 transition-all duration-500 group cursor-pointer">
    <div className={`w-12 h-1.5 rounded-full ${color} mb-6`} />
    <h3 className="text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] transition-colors">
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
