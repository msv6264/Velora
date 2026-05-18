"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  FolderOpen,
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
  Trash2,
  Check,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import { getUserData, logoutUser, updateAuthData, updateUserMetaData } from "@/src/services/auth";

const logo = "/logo.png";

/* ─────────────────────────── Sidebar NavItem ─────────────────────────── */
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
      active
        ? "bg-[#ba8ffa] text-black font-bold shadow-[0_0_20px_rgba(186,143,250,0.2)]"
        : "text-gray-500 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

/* ─────────────────────────── Section wrapper ─────────────────────────── */
const Section = ({ icon, title, children }) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-[#ba8ffa]/10 text-[#ba8ffa]">{icon}</div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

/* ─────────────────────────── Toggle ─────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
      checked ? "bg-[#ba8ffa]" : "bg-white/10"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
        checked ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
const SettingsPage = () => {
  const router = useRouter();

  /* ── user data ── */
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  /* ── password ── */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  /* ── notifications ── */
  const [notifWeekly, setNotifWeekly] = useState(true);
  const [notifReminders, setNotifReminders] = useState(true);
  const [notifNewFeatures, setNotifNewFeatures] = useState(false);

  /* ── appearance ── */
  const [accentColor, setAccentColor] = useState("#ba8ffa");

  /* ── privacy ── */
  const [privateProfile, setPrivateProfile] = useState(false);
  const [analyticsOpt, setAnalyticsOpt] = useState(true);

  /* ── ui state ── */
  const [profileSaved, setProfileSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  /* ── load user ── */
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      setUsername(userData?.user_metadata?.username);
      setEmail(userData?.email);
    };
    fetchUser();
  }, []);

  /* ── logout ── */
  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  /* ── save profile (username updated in Supabase) ── */
  const handleSaveProfile = async () => {
    const { data, error } = await updateUserMetaData({ username });
    if (error) {
      alert("Failed to update profile: " + error.message);
    } else {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    }
  };

  /* ── change password (updates in Supabase) ── */
  const handleChangePassword = async () => {
    setPwError("");
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }

    const { error } = await updateAuthData({ password: newPassword });
    if (error) {
      setPwError(error.message);
      return;
    }

    setPwSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPwSaved(false), 2500);
  };

  const accentOptions = [
    { label: "Velora Purple", value: "#ba8ffa" },
    { label: "Indigo Blue",   value: "#8791fe" },
    { label: "Rose Pink",     value: "#f472b6" },
    { label: "Emerald",       value: "#34d399" },
    { label: "Amber",         value: "#fbbf24" },
  ];

  const avatarInitial = username?.[0]?.toUpperCase() || "V";

  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit flex overflow-hidden">

      {/* ─── Sidebar ─── */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div
            className="w-10 h-10 bg-[#ba8ffa]/10 rounded-xl flex items-center justify-center border border-[#ba8ffa]/20 overflow-hidden p-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src={logo} alt="Velora Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Velora</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard"   onClick={() => router.push("/dashboard")} />
          <NavItem icon={<BookOpen size={20} />}        label="My Library"  onClick={() => router.push("/library")} />
          <NavItem icon={<Sparkles size={20} />}        label="Rediscovery" onClick={() => router.push("/rediscovery")} />
          <NavItem icon={<FolderOpen size={20} />}      label="Collections" onClick={() => router.push("/collections")} />

          <div className="pt-8 pb-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            System
          </div>
          <NavItem icon={<Settings size={20} />} label="Settings" active />
          <NavItem icon={<LogOut size={20} />}   label="Log out"  onClick={handleLogout} />
        </nav>
      </aside>

      {/* ─── Main ─── */}
      <main className="flex-1 overflow-y-auto h-screen bg-black relative">
        {/* background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

        {/* header */}
        <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-xl border-b border-white/5 px-10 py-6">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm font-spectral italic mt-0.5">
            Manage your account and preferences
          </p>
        </header>

        <div className="p-10 max-w-3xl mx-auto">

          {/* ── Profile ── */}
          <Section icon={<User size={20} />} title="Profile">
            {/* avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ba8ffa]/30 to-[#8791fe]/30 border border-[#ba8ffa]/30 flex items-center justify-center text-3xl font-bold text-[#ba8ffa]">
                {avatarInitial}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{username || "User"}</p>
                <p className="text-gray-500 text-sm">{email}</p>
              </div>
            </div>

            {/* username field */}
            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleChangeName(e)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ba8ffa]/40 focus:bg-white/8 transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* email field (read-only) */}
            <div className="mb-7">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Email <span className="text-gray-600 text-xs">(cannot be changed here)</span>
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 px-5 text-gray-500 cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-7 py-3 bg-[#ba8ffa] text-black font-bold rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] transition-all duration-300"
            >
              {profileSaved ? <><Check size={18} /> Saved!</> : "Save Profile"}
            </button>
          </Section>

          {/* ── Password ── */}
          <Section icon={<Lock size={20} />} title="Change Password">
            <div className="space-y-4 mb-2">
              {[
                // TO-DO: "add authentication for current password, allow new password only if current password is correct"
                // { label: "Current Password", value: currentPassword, setter: setCurrentPassword },
                { label: "New Password",     value: newPassword,     setter: setNewPassword },
                { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">{label}</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-5 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ba8ffa]/40 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pwError && (
              <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                <AlertTriangle size={14} /> {pwError}
              </p>
            )}

            <button
              onClick={handleChangePassword}
              className="flex items-center gap-2 px-7 py-3 mt-4 bg-[#ba8ffa] text-black font-bold rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] transition-all duration-300"
            >
              {pwSaved ? <><Check size={18} /> Password updated!</> : "Update Password"}
            </button>
          </Section>

          {/* ── Appearance ── */}
          <Section icon={<Palette size={20} />} title="Appearance">
            <p className="text-sm text-gray-400 mb-5">Choose your accent colour</p>
            <div className="flex flex-wrap gap-4">
              {accentOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAccentColor(opt.value)}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    borderColor: accentColor === opt.value ? opt.value : "rgba(255,255,255,0.08)",
                    background: accentColor === opt.value ? `${opt.value}18` : "rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ background: opt.value }}
                  />
                  <span className="text-sm text-gray-300">{opt.label}</span>
                  {accentColor === opt.value && <Check size={14} className="text-[#ba8ffa]" />}
                </button>
              ))}
            </div>
          </Section>

          {/* ── Notifications ── */}
          <Section icon={<Bell size={20} />} title="Notifications">
            {[
              { label: "Weekly digest",    sub: "A curated summary of your saved resources every Monday", state: notifWeekly,    setter: setNotifWeekly },
              { label: "Daily reminders",  sub: "Gentle nudges to revisit something you saved",            state: notifReminders, setter: setNotifReminders },
              { label: "Product updates",  sub: "New features and announcements from Velora",              state: notifNewFeatures, setter: setNotifNewFeatures },
            ].map(({ label, sub, state, setter }) => (
              <div key={label} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white font-medium">{label}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{sub}</p>
                </div>
                <Toggle checked={state} onChange={setter} />
              </div>
            ))}
          </Section>

          {/* ── Privacy ── */}
          <Section icon={<Shield size={20} />} title="Privacy & Data">
            {[
              { label: "Private profile",       sub: "Only you can see your library and collections", state: privateProfile, setter: setPrivateProfile },
              { label: "Share anonymous analytics", sub: "Help us improve Velora by sharing usage data", state: analyticsOpt, setter: setAnalyticsOpt },
            ].map(({ label, sub, state, setter }) => (
              <div key={label} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white font-medium">{label}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{sub}</p>
                </div>
                <Toggle checked={state} onChange={setter} />
              </div>
            ))}

            <button className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              Download my data <ChevronRight size={16} />
            </button>
          </Section>

          {/* ── Danger Zone ── */}
          <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                <Trash2 size={20} />
              </div>
              <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
            </div>

            <p className="text-gray-400 text-sm mb-5">
              Deleting your account is permanent and cannot be undone. All your saved resources and collections will be lost.
            </p>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Type <span className="text-red-400 font-bold">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-white/5 border border-red-500/20 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>

            <button
              disabled={deleteConfirm !== "DELETE"}
              className="px-7 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-red-500 enabled:hover:text-white enabled:hover:scale-[1.02]"
            >
              Delete Account
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
