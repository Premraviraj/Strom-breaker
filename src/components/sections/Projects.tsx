"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Flag, Trophy, GitCompare,
  Users, MapPin, Tv, BarChart2, TrendingUp, PieChart, Brain, Wallet, 
  Bus, Coins, Gift, Leaf, Shield, LucideIcon
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectFeature {
  icon: LucideIcon;
  label: string;
  color: string;
  desc: string;
  preview: React.ReactNode;
}

interface Project {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string; // used for the live-button gradient
  techStack: string[];
  features: ProjectFeature[];
}

// ─── Project Data ─────────────────────────────────────────────────────────────
// To add a new project: push a new object into this array. That's it.

const PROJECTS: Project[] = [
  {
    emoji: "🏎️",
    title: "Pitwall — F1 Live Dashboard",
    subtitle: "Formula 1 Race Data · Next.js · Ergast API",
    description:
      "A full-stack Formula 1 dashboard aggregating live standings, race schedules, driver profiles, circuit data, and head-to-head comparisons — all in one place. Deployed on Vercel.",
    liveUrl: "https://pitwall.rprem.online",
    githubUrl: "https://github.com/Premraviraj/Fast",
    accentColor: "#e10600",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Ergast API", "Recharts", "Framer Motion", "Vercel"],
    features: [
      {
        icon: Flag,
        label: "Race Schedule",
        color: "#e10600",
        desc: "Full 2026 F1 calendar with circuit details, dates, and race status — past and upcoming.",
        preview: (
          <div className="space-y-2">
            {["Bahrain GP · Mar 2", "Saudi Arabian GP · Mar 9", "Australian GP · Mar 23", "Japanese GP · Apr 6"].map((r, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="font-medium text-gray-800">{r}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${i < 2 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {i < 2 ? "Done" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: Trophy,
        label: "Live Standings",
        color: "#f5a623",
        desc: "Driver and Constructor championship standings updated after every race with points, wins, and nationality.",
        preview: (
          <div className="space-y-2">
            {[
              { pos: 1, name: "Verstappen", team: "Red Bull", pts: 77 },
              { pos: 2, name: "Leclerc",    team: "Ferrari",  pts: 64 },
              { pos: 3, name: "Norris",     team: "McLaren",  pts: 58 },
              { pos: 4, name: "Hamilton",   team: "Mercedes", pts: 51 },
            ].map((d) => (
              <div key={d.pos} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-[10px]">{d.pos}</span>
                <span className="font-semibold text-gray-800 flex-1">{d.name}</span>
                <span className="text-gray-500">{d.team}</span>
                <span className="font-bold text-gray-900">{d.pts} pts</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: GitCompare,
        label: "Driver Comparison",
        color: "#1565c0",
        desc: "Head-to-head driver stats — points progression charts and race finish positions across a full season.",
        preview: (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center px-3 py-2 rounded-lg bg-red-50 border border-red-200">
                <div className="text-xs font-bold text-red-700">Verstappen</div>
                <div className="text-lg font-black text-red-600">77</div>
                <div className="text-[10px] text-red-500">points</div>
              </div>
              <div className="px-3 font-black text-gray-400 text-sm">VS</div>
              <div className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-xs font-bold text-blue-700">Norris</div>
                <div className="text-lg font-black text-blue-600">58</div>
                <div className="text-[10px] text-blue-500">points</div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-blue-500" style={{ width: "75%" }} />
            </div>
            <div className="text-[10px] text-center text-gray-400">Points progression · 2026 season</div>
          </div>
        ),
      },
      {
        icon: Users,
        label: "Drivers & Teams",
        color: "#2e7d32",
        desc: "Complete driver and constructor profiles — nationality, team, car number, and season stats.",
        preview: (
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Verstappen", team: "Red Bull",  num: 1  },
              { name: "Leclerc",    team: "Ferrari",   num: 16 },
              { name: "Norris",     team: "McLaren",   num: 4  },
              { name: "Hamilton",   team: "Mercedes",  num: 44 },
            ].map((d) => (
              <div key={d.name} className="px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <div className="font-bold text-gray-800">{d.name}</div>
                <div className="text-gray-500 text-[10px]">{d.team} · #{d.num}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: MapPin,
        label: "Circuits",
        color: "#6a1b9a",
        desc: "All 24 circuits with location, lap record, and circuit characteristics for the 2026 season.",
        preview: (
          <div className="space-y-2">
            {["Silverstone · UK · 5.891 km", "Monza · Italy · 5.793 km", "Spa · Belgium · 7.004 km"].map((c, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <MapPin size={10} className="text-purple-500 flex-shrink-0" />
                <span className="text-gray-700">{c}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: Tv,
        label: "Race Highlights",
        color: "#c62828",
        desc: "Official F1 race highlight videos linked directly — watch the best moments from every Grand Prix.",
        preview: (
          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video flex items-center justify-center border border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-black/60" />
            <div className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-white ml-1" />
              </div>
              <div className="text-white text-xs font-semibold">Race Highlights</div>
              <div className="text-gray-400 text-[10px]">Opens YouTube</div>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    emoji: "💸",
    title: "ExpenseStory — Personal Finance Tracker",
    subtitle: "Neo-Brutalist SPA · Vanilla JS · Node.js · Supabase",
    description:
      "A neo-brutalist single-page finance app with auth, a narrative InsightsEngine that turns spending into stories, community budget groups with invite codes, survival prediction (days of budget remaining), and an admin portal — all built with zero frontend framework.",
    liveUrl: "https://moneymatter.rprem.online",
    githubUrl: "https://github.com/Premraviraj/Expo",
    accentColor: "#d97706",
    techStack: ["Vanilla JS", "Node.js", "Express", "Supabase", "PostgreSQL", "Lucide", "Vercel"],
    features: [
      {
        icon: BarChart2,
        label: "Dashboard",
        color: "#d97706",
        desc: "Total spent, top category, daily average, income vs spend panel with survival prediction — how many days of budget remain at current burn rate.",
        preview: (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Total Spent",   val: "₹14,200", color: "#ef4444" },
                { label: "Daily Avg",     val: "₹473",    color: "#f59e0b" },
                { label: "Transactions",  val: "38",       color: "#3b82f6" },
                { label: "Days Left",     val: "12 days",  color: "#10b981" },
              ].map((s) => (
                <div key={s.label} className="px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-center">
                  <div className="text-sm font-black" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[10px] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 font-medium text-center">
              🔥 Budget survives ~12 more days at current burn
            </div>
          </div>
        ),
      },
      {
        icon: Brain,
        label: "Stories",
        color: "#7c3aed",
        desc: "InsightsEngine generates narrative spending cards per category — most spent, rent %, shopping habits, food and entertainment patterns.",
        preview: (
          <div className="space-y-2">
            {[
              { emoji: "🍕", title: "Food Fanatic",    body: "You spent 34% of your budget on food this month — mostly weekends.",  color: "#ef4444" },
              { emoji: "🛍️", title: "Shopping Spree",  body: "3 big purchases pushed shopping to ₹4,200 — highest in 3 months.",    color: "#3b82f6" },
              { emoji: "🏠", title: "Rent Reality",    body: "Rent takes up 42% of income. That's above the recommended 30%.",       color: "#f59e0b" },
            ].map((c) => (
              <div key={c.title} className="flex gap-2 px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="text-base flex-shrink-0">{c.emoji}</span>
                <div>
                  <div className="font-bold" style={{ color: c.color }}>{c.title}</div>
                  <div className="text-gray-500 text-[10px] leading-relaxed">{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: TrendingUp,
        label: "Trends",
        color: "#0284c7",
        desc: "Monthly bar charts, category breakdown, and spending patterns over time to spot where habits are shifting.",
        preview: (
          <div className="space-y-3">
            <div className="flex items-end gap-1.5 h-16 px-1">
              {[
                { h: 55, label: "Oct" },
                { h: 70, label: "Nov" },
                { h: 45, label: "Dec" },
                { h: 80, label: "Jan" },
                { h: 60, label: "Feb" },
                { h: 90, label: "Mar" },
              ].map((m) => (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-amber-400" style={{ height: `${m.h}%` }} />
                  <span className="text-[9px] text-gray-400">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { label: "Food",      pct: 34, color: "#ef4444" },
                { label: "Shopping",  pct: 28, color: "#3b82f6" },
                { label: "Transport", pct: 20, color: "#10b981" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-gray-600">{c.label} {c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        icon: Users,
        label: "Community",
        color: "#059669",
        desc: "Create event-based budget groups with an invite code. Members join via code, track shared expenses per category, and see each member's contribution.",
        preview: (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-xs">
              <span className="font-bold text-green-700">Goa Trip 🏖️</span>
              <span className="font-mono text-green-600 bg-green-100 px-2 py-0.5 rounded text-[10px]">GOA-4X2</span>
            </div>
            {[
              { name: "Prem",   amt: "₹3,200", pct: 40 },
              { name: "Arjun",  amt: "₹2,800", pct: 35 },
              { name: "Sneha",  amt: "₹2,000", pct: 25 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="w-12 font-medium text-gray-700">{m.name}</span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-green-400" style={{ width: `${m.pct}%` }} />
                </div>
                <span className="font-bold text-gray-700">{m.amt}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: Wallet,
        label: "Auth & Profile",
        color: "#6366f1",
        desc: "Email signup with password strength meter, monthly income set at registration. Update name, nickname, and income from the profile page.",
        preview: (
          <div className="space-y-3">
            <div className="px-3 py-3 rounded-lg bg-indigo-50 border border-indigo-200 space-y-2">
              <div className="text-xs font-bold text-indigo-700">Sign Up</div>
              <div className="h-2 rounded bg-gray-200 overflow-hidden">
                <div className="h-full rounded bg-gradient-to-r from-red-400 via-yellow-400 to-green-500" style={{ width: "75%" }} />
              </div>
              <div className="text-[10px] text-indigo-500">Password strength: Strong</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="px-3 py-2 rounded-lg bg-white/80 border border-gray-200">
                <div className="text-[10px] text-gray-400">Monthly Income</div>
                <div className="font-bold text-gray-800">₹45,000</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/80 border border-gray-200">
                <div className="text-[10px] text-gray-400">Payment Filter</div>
                <div className="font-bold text-gray-800">UPI / Cash / Card</div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    emoji: "🚌",
    title: "TRIPP — Bangalore Transit Rewards",
    subtitle: "Public Transit · React + Vite · Supabase · Razorpay",
    description:
      "A Bangalore public transit rewards app. Book trips across BMTC, Namma Metro, KSRTC, and Railway — pay via Razorpay — and earn TRT tokens proportional to distance. Redeem tokens for bike rentals, bus passes, and movie tickets.",
    liveUrl: "https://tripp.rprem.online",
    githubUrl: "https://github.com/Premraviraj/major",
    accentColor: "#16a34a",
    techStack: ["React 18", "Vite", "Supabase", "Razorpay", "React Leaflet", "Chart.js", "Vercel"],
    features: [
      {
        icon: Bus,
        label: "Book & Pay",
        color: "#16a34a",
        desc: "Book trips across BMTC bus, Namma Metro, KSRTC, and Railway. Pay via Razorpay checkout and earn TRT tokens proportional to distance travelled.",
        preview: (
          <div className="space-y-2">
            {[
              { icon: "🚌", name: "BMTC Bus",     route: "Majestic → Koramangala", tokens: "+12 TRT" },
              { icon: "🚇", name: "Namma Metro",  route: "MG Road → Whitefield",   tokens: "+18 TRT" },
              { icon: "🚂", name: "Railway",      route: "KSR → Yeshwanthpur",     tokens: "+25 TRT" },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="text-base">{t.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{t.name}</div>
                  <div className="text-gray-400 text-[10px]">{t.route}</div>
                </div>
                <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{t.tokens}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: Coins,
        label: "TRT Tokens",
        color: "#d97706",
        desc: "Earn TRT tokens on every trip based on distance and transport type. Token balance, earned/spent breakdown, and a unified transaction timeline in the Wallet.",
        preview: (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
              <div>
                <div className="text-[10px] text-amber-600 font-medium">Total Balance</div>
                <div className="text-2xl font-black text-amber-700">1,240 TRT</div>
              </div>
              <div className="text-3xl">🪙</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-center">
                <div className="font-black text-green-700">+2,100</div>
                <div className="text-[10px] text-green-500">Earned</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-center">
                <div className="font-black text-red-600">-860</div>
                <div className="text-[10px] text-red-400">Spent</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        icon: Gift,
        label: "Rewards",
        color: "#7c3aed",
        desc: "Redeem TRT tokens from a DB-driven reward catalog — bike rentals, bus passes, movie tickets, and more. Filter by category, see token cost per reward.",
        preview: (
          <div className="space-y-2">
            {[
              { emoji: "🛵", name: "Yulu Bike — 1hr",   cost: "80 TRT",  cat: "Mobility" },
              { emoji: "🎟️", name: "BMTC Day Pass",      cost: "150 TRT", cat: "Transit"  },
              { emoji: "🎬", name: "PVR Movie Ticket",   cost: "200 TRT", cat: "Leisure"  },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-xs">
                <span className="text-base">{r.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  <div className="text-gray-400 text-[10px]">{r.cat}</div>
                </div>
                <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{r.cost}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        icon: Leaf,
        label: "Eco Stats",
        color: "#059669",
        desc: "Track CO₂ saved per trip based on transport type config stored in DB. Dashboard shows total CO₂ saved, trip count, and leaderboard ranking.",
        preview: (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              {[
                { val: "14.2 kg", label: "CO₂ Saved", color: "#059669" },
                { val: "38",      label: "Trips",      color: "#0284c7" },
                { val: "#4",      label: "Leaderboard",color: "#d97706" },
              ].map((s) => (
                <div key={s.label} className="px-2 py-2 rounded-lg bg-white/80 border border-gray-200">
                  <div className="font-black text-sm" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[10px] text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700 text-center font-medium">
              🌱 Equivalent to planting 2 trees this month
            </div>
          </div>
        ),
      },
      {
        icon: Shield,
        label: "Audit Chain",
        color: "#1e40af",
        desc: "Every token transaction is stored in an append-only SHA-256 hash chain — each entry hashes userId, distance, tokens, timestamp, and the previous hash. Tamper-evident without a real blockchain.",
        preview: (
          <div className="space-y-2">
            <div className="px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 break-all leading-relaxed">
              <div className="text-[10px] text-blue-400 mb-1">entry_hash</div>
              a3f9c2...d84e1b
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 px-1">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              SHA-256(userId | distance | tokens | timestamp | prevHash)
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/80 border border-gray-200 text-[10px] text-gray-500">
              Append-only · No wallet · No gas · Tamper-evident
            </div>
          </div>
        ),
      },
    ],
  },
];

// ─── Shared style helpers ─────────────────────────────────────────────────────

const skeuCard  = `bg-gradient-to-b from-white to-gray-50 border border-gray-300 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]`;
const skeuBadge = `bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]`;
const skeuBtn   = `bg-gradient-to-b from-gray-700 to-gray-900 text-white border border-gray-800 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]`;

// ─── Single project card ──────────────────────────────────────────────────────

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === "extrovert";
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden ${
        isExtrovert
          ? "border-4 border-black"
          : "rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.08)]"
      }`}
      style={isExtrovert ? { backgroundColor: `${project.accentColor}12`, boxShadow: "12px 12px 0px 0px #000" } : { background: "white" }}
    >
      {/* Accent strip top */}
      {!isExtrovert && (
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}66)` }} />
      )}

      {/* Browser chrome bar */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${
        isExtrovert
          ? "bg-black border-black"
          : "bg-gray-50/80 border-gray-100"
      }`}>
        <div className="flex gap-1 flex-shrink-0">
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className={`flex-1 min-w-0 flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono ${
          isExtrovert
            ? "bg-white/10 text-white/80 border border-white/20"
            : "bg-white border border-gray-200 text-gray-400 shadow-inner"
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          <span className="truncate">{project.liveUrl ? project.liveUrl.replace("https://","") : "localhost:3000"}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {project.githubUrl && (
            <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-md ${
                isExtrovert ? "bg-white text-black border-2 border-white" : "bg-white border border-gray-200 text-gray-600 shadow-sm"
              }`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <Github size={10} /> <span className="hidden sm:inline">Code</span>
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-md ${
                isExtrovert ? "bg-yellow-400 text-black border-2 border-white" : "text-white shadow-sm"
              }`}
              style={!isExtrovert ? { background: project.accentColor } : {}}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={10} /> <span className="hidden sm:inline">Live</span>
            </motion.a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* ── Left sidebar ── */}
        <div className={`p-4 lg:p-6 flex flex-col gap-3 lg:gap-4 ${
          isExtrovert ? "border-b-4 lg:border-b-0 lg:border-r-4 border-black" : "border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/40"
        }`}>
          {/* Project number + emoji — compact row */}
          <div className="flex items-center gap-2.5">
            <span
              className={`text-2xl font-black leading-none select-none tabular-nums ${isExtrovert ? "text-black" : ""}`}
              style={!isExtrovert ? { color: `${project.accentColor}55` } : {}}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={`w-px h-6 ${isExtrovert ? "bg-black" : "bg-gray-300"}`} />
            <motion.div
              className={`w-9 h-9 flex items-center justify-center text-lg flex-shrink-0 ${
                isExtrovert ? "bg-black text-white border-2 border-black" : "rounded-lg"
              }`}
              style={!isExtrovert ? {
                background: `linear-gradient(135deg, ${project.accentColor}22, ${project.accentColor}44)`,
                border: `1.5px solid ${project.accentColor}44`,
              } : {}}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {project.emoji}
            </motion.div>
          </div>

          {/* Title + description */}
          <div>
            <h3 className={`text-sm font-bold leading-tight mb-1 ${isExtrovert ? "brutalist-all uppercase" : "minimalist-heading"}`}
              style={{ color: theme.colors.text }}>
              {project.title}
            </h3>
            <p className="text-[10px] mb-2 font-medium" style={{ color: project.accentColor }}>{project.subtitle}</p>
            <p className={`text-xs leading-relaxed ${isExtrovert ? "brutalist-all" : "minimalist-body"}`}
              style={{ color: theme.colors.textSecondary }}>
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.techStack.map((t) => (
              <span key={t} className={`px-2 py-0.5 text-[10px] font-semibold ${
                isExtrovert
                  ? "bg-black text-white border-2 border-black brutalist-all"
                  : "rounded-full border text-gray-600"
              }`}
              style={!isExtrovert ? { borderColor: `${project.accentColor}44`, background: `${project.accentColor}08` } : {}}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: feature explorer ── */}
        <div className="p-4 lg:p-6 flex flex-col gap-3">
          {/* Feature tabs — horizontal scrollable row */}
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {project.features.map((f, i) => (
              <motion.button
                key={f.label}
                onClick={() => setActiveFeature(i)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold flex-shrink-0 transition-all duration-200 ${
                  isExtrovert
                    ? activeFeature === i
                      ? "bg-black text-white border-2 border-black brutalist-all"
                      : "bg-white text-black border-2 border-black brutalist-all hover:bg-gray-100"
                    : activeFeature === i
                      ? "rounded-lg text-white shadow-sm"
                      : "rounded-lg bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                style={!isExtrovert && activeFeature === i ? { background: project.accentColor } : {}}
                whileTap={{ scale: 0.96 }}
              >
                <f.icon size={11} style={{ color: activeFeature === i && !isExtrovert ? "white" : f.color }} />
                {f.label}
              </motion.button>
            ))}
          </div>

          {/* Feature preview panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`flex-1 p-4 min-h-[200px] ${
                isExtrovert
                  ? "border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]"
                  : "rounded-xl border border-gray-100 bg-gray-50/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {(() => { const F = project.features[activeFeature]; return <F.icon size={13} style={{ color: F.color }} />; })()}
                <span className={`text-xs font-semibold ${isExtrovert ? "brutalist-all" : ""}`} style={{ color: theme.colors.text }}>
                  {project.features[activeFeature].label}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed mb-3 text-gray-500">
                {project.features[activeFeature].desc}
              </p>
              {project.features[activeFeature].preview}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Projects = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === "extrovert";

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-2xl sm:text-3xl lg:text-4xl mb-4 ${isExtrovert ? "brutalist-heading" : "font-bold tracking-tight minimalist-heading"}`}
            style={{ color: theme.colors.text }}
          >
            My <span style={{ color: theme.colors.textSecondary }}>Work</span>
          </motion.h2>
          <p style={{ color: theme.colors.textSecondary }}>
            Click the feature tabs to explore each project
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
