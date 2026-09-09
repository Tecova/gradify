import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const trendData = [
  { month: "Jan", score: 61, attendance: 88 },
  { month: "Feb", score: 64, attendance: 90 },
  { month: "Mar", score: 63, attendance: 89 },
  { month: "Apr", score: 68, attendance: 92 },
  { month: "May", score: 71, attendance: 91 },
  { month: "Jun", score: 75, attendance: 94 },
];

const subjectData = [
  { subject: "Math", score: 74 },
  { subject: "English", score: 82 },
  { subject: "Science", score: 68 },
  { subject: "Kiswahili", score: 77 },
  { subject: "Social studies", score: 71 },
];

const students = [
  { initials: "AM", name: "Amina Mwangi", class: "Grade 7 · East", score: "86%", change: "+12%", tone: "lavender", status: "Improving" },
  { initials: "KO", name: "Kevin Otieno", class: "Grade 8 · West", score: "74%", change: "+6%", tone: "mint", status: "On track" },
  { initials: "ZN", name: "Zawadi Njeri", class: "Grade 6 · North", score: "68%", change: "−3%", tone: "peach", status: "Needs attention" },
  { initials: "BM", name: "Brian Muthoni", class: "Grade 7 · East", score: "91%", change: "+8%", tone: "blue", status: "Improving" },
];

const navSections = [
  { label: "Workspace", items: [{ label: "Overview", path: "/dashboard", icon: LayoutDashboard }, { label: "Students", path: "/students", icon: Users }, { label: "Results", path: "/results", icon: ClipboardList }] },
  { label: "Understand", items: [{ label: "Analytics", path: "/analytics", icon: BarChart3 }, { label: "Attendance", path: "/attendance", icon: CalendarDays }, { label: "Assignments", path: "/assignments", icon: BookOpen }] },
  { label: "Share", items: [{ label: "Reports", path: "/reports", icon: FileText }, { label: "Settings", path: "/settings", icon: Settings }] },
];

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const [mobileNav, setMobileNav] = useState(false);
  const [term, setTerm] = useState("Term 2, 2024");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentSection = navSections.flatMap((section) => section.items).find((item) => item.path === location)?.label ?? "Overview";
  const filteredStudents = useMemo(() => students.filter((student) => `${student.name} ${student.class}`.toLowerCase().includes(search.toLowerCase())), [search]);

  const navigate = (path: string) => {
    setLocation(path);
    setMobileNav(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Dashboard view saved", { description: "Your filters will be ready next time you visit." });
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] text-[#302a40]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-[258px] border-r border-[#ebe7f1] bg-white transition-transform duration-200 lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col px-4 py-5">
          <div className="flex items-center justify-between px-2"><Link href="/" className="flex items-center gap-2.5"><div className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#6e52b8] text-white shadow-[0_8px_18px_rgba(110,82,184,.17)]"><GraduationCap className="h-[18px] w-[18px]" /></div><span className="text-[19px] font-semibold tracking-[-.05em]">gradify</span></Link><button className="rounded-lg p-1.5 text-[#a39bac] hover:bg-[#f5f2f8] lg:hidden" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X className="h-4 w-4" /></button></div>
          <div className="mt-9 rounded-2xl bg-[#f5f1fc] p-3"><div className="flex items-center gap-2.5"><div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#7157af] shadow-sm"><ShieldCheck className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-[11px] font-semibold text-[#514666]">Brookfield Academy</p><p className="mt-0.5 text-[10px] text-[#998fa8]">Nairobi · 2024 / 25</p></div><ChevronDown className="ml-auto h-3.5 w-3.5 text-[#968ba7]" /></div></div>
          <div className="mt-7 flex-1 overflow-y-auto pr-1">{navSections.map((section) => <div key={section.label} className="mb-7"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#b0a8b6]">{section.label}</p><div className="space-y-1">{section.items.map((item) => { const Icon = item.icon; const active = item.path === location || (item.path === "/dashboard" && location === "/"); return <button key={item.path} onClick={() => navigate(item.path)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium transition ${active ? "bg-[#eee9fb] text-[#6e52b8]" : "text-[#8e8799] hover:bg-[#faf8fd] hover:text-[#5b526d]"}`}><Icon className={`h-[16px] w-[16px] ${active ? "text-[#7458b6]" : "text-[#aaa2b1]"}`} />{item.label}{item.label === "Results" && <span className="ml-auto rounded-md bg-[#fae7dc] px-1.5 py-0.5 text-[9px] font-bold text-[#bc7c5b]">12</span>}</button>; })}</div></div>)}</div>
          <div className="rounded-2xl border border-[#eeeaf2] bg-[#fcfbfd] p-3"><div className="flex items-center gap-2.5"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#ded2f3] text-[10px] font-bold text-[#624b98]">AN</div><div className="min-w-0"><p className="truncate text-[11px] font-semibold text-[#564d65]">Alice Njeri</p><p className="text-[10px] text-[#a29aaa]">School administrator</p></div><MoreHorizontal className="ml-auto h-4 w-4 text-[#a29aaa]" /></div></div>
        </div>
      </aside>
      {mobileNav && <button className="fixed inset-0 z-30 bg-[#2d2540]/20 lg:hidden" aria-label="Close navigation overlay" onClick={() => setMobileNav(false)} />}

      <div className="lg:pl-[258px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#ebe7f1] bg-[#f8f7fb]/90 px-5 backdrop-blur-xl lg:px-9"><div className="flex items-center gap-3"><button className="rounded-xl border border-[#e9e5ef] bg-white p-2 text-[#6f6590] lg:hidden" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu className="h-4 w-4" /></button><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a39aa9]">School overview</p><h1 className="mt-1 text-[19px] font-semibold tracking-[-.04em] text-[#383044]">{currentSection}</h1></div></div><div className="flex items-center gap-2.5"><div className="relative hidden items-center rounded-xl border border-[#e9e5ef] bg-white px-3 sm:flex"><Search className="h-3.5 w-3.5 text-[#aaa1b2]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search learners..." className="w-[150px] bg-transparent py-2.5 pl-2 text-[11px] outline-none placeholder:text-[#b2aab8]" /></div><button onClick={() => toast.info("You’re all caught up.")} className="rounded-xl border border-[#e9e5ef] bg-white p-2.5 text-[#8d839e] transition hover:border-[#d4c8e8] hover:text-[#6e52b8]" aria-label="Help"><HelpCircle className="h-4 w-4" /></button><div className="relative"><button onClick={() => setShowNotifications((value) => !value)} className="relative rounded-xl border border-[#e9e5ef] bg-white p-2.5 text-[#8d839e] transition hover:border-[#d4c8e8] hover:text-[#6e52b8]" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c88367] ring-2 ring-white" /></button>{showNotifications && <div className="absolute right-0 top-12 w-[280px] rounded-2xl border border-[#ece8f1] bg-white p-4 shadow-[0_18px_40px_rgba(65,49,94,.14)]"><div className="flex items-center justify-between"><p className="text-[13px] font-semibold">Notifications</p><button className="text-[10px] font-semibold text-[#765abd]" onClick={() => setShowNotifications(false)}>Close</button></div><div className="mt-4 space-y-3"><div className="flex gap-2.5 rounded-xl bg-[#f5f1fc] p-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6d55a9]" /><p className="text-[11px] leading-5 text-[#6c637c]">Grade 7 reports are ready to review.</p></div><div className="flex gap-2.5 rounded-xl bg-[#fff4ec] p-3"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#bc7c5b]" /><p className="text-[11px] leading-5 text-[#6c637c]">12 learners may need academic support.</p></div></div></div>}</div><div className="relative"><button onClick={() => setShowProfileMenu((value) => !value)} className="flex items-center gap-2 rounded-xl border border-[#e9e5ef] bg-white p-1.5 pr-2.5"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ded2f3] text-[9px] font-bold text-[#624b98]">AN</span><span className="hidden text-[11px] font-semibold text-[#60576d] sm:block">Alice Njeri</span><ChevronDown className="h-3 w-3 text-[#a19aaa]" /></button>{showProfileMenu && <div className="absolute right-0 top-12 w-40 rounded-2xl border border-[#ece8f1] bg-white p-2 shadow-[0_18px_40px_rgba(65,49,94,.14)]"><button className="w-full rounded-xl px-3 py-2 text-left text-[11px] text-[#726a7e] hover:bg-[#f8f5fc]" onClick={() => navigate("/settings")}>Account settings</button><button className="w-full rounded-xl px-3 py-2 text-left text-[11px] text-[#726a7e] hover:bg-[#f8f5fc]" onClick={() => toast.success("You’re signed out of the demo workspace.")}>Sign out</button></div>}</div></div></header>

        <main className="mx-auto max-w-[1400px] px-5 py-7 lg:px-9 lg:py-9">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-[11px] text-[#aaa1b0]"><span>Tuesday, 23 July 2024</span><span className="h-1 w-1 rounded-full bg-[#c8c0cc]" /><span className="flex items-center gap-1 text-[#66a07e]"><Wifi className="h-3 w-3" /> Synced just now</span></div><h2 className="mt-2 text-[28px] font-semibold tracking-[-.055em] text-[#332c42] lg:text-[34px]">Good morning, Alice <span className="inline-block">✦</span></h2><p className="mt-1 text-[13px] text-[#958c9e]">Here’s what’s happening across Brookfield Academy.</p></div><div className="flex items-center gap-2"><button onClick={() => setShowImport(true)} className="inline-flex items-center gap-2 rounded-xl border border-[#e7e1ee] bg-white px-3.5 py-2.5 text-[11px] font-semibold text-[#6d6478] transition hover:border-[#cfc1e8] hover:text-[#6e52b8]"><Upload className="h-3.5 w-3.5" /> Import results</button><button onClick={() => setShowAddStudent(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#6e52b8] px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-[0_7px_14px_rgba(110,82,184,.16)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]"><Plus className="h-3.5 w-3.5" /> Add learner</button></div></div>

          <div className="mb-7 flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-[11px] font-semibold text-[#8d8496]">Showing data for</span><button className="flex items-center gap-2 rounded-lg border border-[#e8e3ee] bg-white px-3 py-2 text-[11px] font-semibold text-[#5e556b]" onClick={() => setTerm(term === "Term 2, 2024" ? "Term 1, 2024" : "Term 2, 2024")}>{term}<ChevronDown className="h-3.5 w-3.5 text-[#9d94aa]" /></button></div><button onClick={handleSave} className="hidden items-center gap-1.5 text-[11px] font-semibold text-[#7c6ca0] sm:flex"><SlidersHorizontal className="h-3.5 w-3.5" />{saved ? "Saved" : "Customize view"}</button></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Total learners" value="1,248" delta="+12 this term" icon={Users} tone="lavender" /><MetricCard label="Average performance" value="74.8%" delta="+4.2% vs Term 1" icon={TrendingUp} tone="mint" positive /><MetricCard label="Attendance rate" value="91.6%" delta="−1.1% vs Term 1" icon={CalendarDays} tone="peach" /><MetricCard label="Reports to review" value="34" delta="12 need attention" icon={FileText} tone="blue" /></div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]"><section className="rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><h3 className="text-[14px] font-semibold text-[#4a4256]">Performance trend</h3><span className="rounded-md bg-[#e9f5ef] px-1.5 py-1 text-[9px] font-bold text-[#5e9b77]">+4.2%</span></div><p className="mt-1 text-[11px] text-[#a39aa9]">Average score across the last six months</p></div><button className="rounded-lg p-1.5 text-[#aaa1b1] hover:bg-[#f7f4fa]" onClick={() => toast.info("More chart options are coming soon.")}><MoreHorizontal className="h-4 w-4" /></button></div><div className="mt-5 h-[245px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 5, right: 2, left: -24, bottom: 0 }}><defs><linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9d83d5" stopOpacity={0.3} /><stop offset="100%" stopColor="#9d83d5" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#f0edf4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#aaa1b0", fontSize: 10 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#aaa1b0", fontSize: 10 }} domain={[50, 85]} ticks={[50, 60, 70, 80]} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee9f4", boxShadow: "0 10px 25px rgba(68,50,102,.1)", fontSize: 11 }} /><Area type="monotone" dataKey="score" stroke="#8065c2" strokeWidth={2.5} fill="url(#scoreFill)" dot={{ r: 3.5, fill: "#8065c2", stroke: "white", strokeWidth: 2 }} activeDot={{ r: 5 }} /></AreaChart></ResponsiveContainer></div><div className="mt-1 flex items-center gap-2 text-[10px] text-[#a29aaa]"><span className="h-2 w-2 rounded-full bg-[#8065c2]" /> Average score <span className="ml-2 text-[#b0a8b5]">Term 1</span></div></section><section className="rounded-[20px] border border-[#ebe7f1] bg-[#2f2940] p-5 text-white shadow-[0_5px_20px_rgba(60,45,92,.06)] sm:p-6"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><h3 className="text-[14px] font-semibold">This week’s insight</h3><Sparkles className="h-3.5 w-3.5 text-[#c7b4ef]" /></div><p className="mt-1 text-[11px] text-[#a9a0b9]">System-generated insight</p></div><span className="rounded-lg bg-white/10 px-2 py-1 text-[9px] font-semibold text-[#cdbef0]">New</span></div><div className="mt-7"><p className="text-[22px] font-semibold leading-[1.22] tracking-[-.04em]">Grade 7 Maths is moving in the right direction.</p><p className="mt-4 text-[12px] leading-6 text-[#b8afc6]">Performance improved from <strong className="font-semibold text-[#e7defb]">61% to 69%</strong> between Term 1 and Term 2. The biggest lift came from fractions and data handling.</p></div><button className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold text-[#cdbcf0]" onClick={() => navigate("/analytics")}>Explore the analysis <ArrowRight className="h-3.5 w-3.5" /></button><div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[69%] rounded-full bg-[#ad94e7]" /></div><div className="mt-2 flex justify-between text-[9px] text-[#9e95ad]"><span>Term 1 · 61%</span><span>Term 2 · 69%</span></div></section></div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_1fr]"><section className="rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex items-start justify-between"><div><h3 className="text-[14px] font-semibold text-[#4a4256]">Subject performance</h3><p className="mt-1 text-[11px] text-[#a39aa9]">Average score by learning area</p></div><button className="text-[11px] font-semibold text-[#765abd]" onClick={() => navigate("/analytics")}>View analysis</button></div><div className="mt-5 h-[220px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={subjectData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }} barCategoryGap={10}><CartesianGrid horizontal={false} stroke="#f1eef5" /><XAxis type="number" domain={[0, 100]} hide /><YAxis type="category" dataKey="subject" axisLine={false} tickLine={false} width={84} tick={{ fill: "#81788e", fontSize: 10 }} /><Tooltip cursor={{ fill: "#faf8fc" }} contentStyle={{ borderRadius: 12, border: "1px solid #eee9f4", fontSize: 11 }} /><Bar dataKey="score" fill="#9074ca" radius={[0, 6, 6, 0]} barSize={18} label={{ position: "right", fill: "#6d6479", fontSize: 10, fontWeight: 600 }} /></BarChart></ResponsiveContainer></div></section><section className="rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex items-start justify-between"><div><h3 className="text-[14px] font-semibold text-[#4a4256]">Learner signals</h3><p className="mt-1 text-[11px] text-[#a39aa9]">Students worth a closer look</p></div><button className="rounded-lg border border-[#e9e5ef] p-1.5 text-[#9e95a9] hover:bg-[#faf8fc]" onClick={() => toast.info("Signal filters are ready for your next review.")}><SlidersHorizontal className="h-3.5 w-3.5" /></button></div><div className="mt-5 space-y-3">{[{icon:TrendingUp,label:"Improving steadily",value:"23 learners",tone:"mint",copy:"Across 5 classes"},{icon:AlertTriangle,label:"Needs attention",value:"12 learners",tone:"peach",copy:"Review attendance link"},{icon:Activity,label:"Assignment dip",value:"8 learners",tone:"lavender",copy:"Below 70% completion"}].map((signal) => { const Icon = signal.icon; return <button key={signal.label} className="flex w-full items-center gap-3 rounded-xl border border-[#f0edf4] p-3 text-left transition hover:border-[#d8caee] hover:bg-[#fdfbff]" onClick={() => toast.info(`${signal.label}: ${signal.value}`)}><div className={`grid h-9 w-9 place-items-center rounded-xl ${signal.tone === "mint" ? "bg-[#e9f5ef] text-[#5e9977]" : signal.tone === "peach" ? "bg-[#fff0e7] text-[#b47759]" : "bg-[#eee9fb] text-[#7259b1]"}`}><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold text-[#62596e]">{signal.label}</p><p className="mt-0.5 text-[10px] text-[#a29aaa]">{signal.copy}</p></div><span className="text-[12px] font-semibold text-[#605771]">{signal.value}</span><ArrowRight className="h-3.5 w-3.5 text-[#b0a7b7]" /></button>; })}</div></section></div>

          <section className="mt-5 rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><h3 className="text-[14px] font-semibold text-[#4a4256]">Learners to celebrate</h3><span className="rounded-md bg-[#eee9fb] px-1.5 py-1 text-[9px] font-bold text-[#755ab7]">Live</span></div><p className="mt-1 text-[11px] text-[#a39aa9]">A snapshot of recent progress across your school</p></div><button onClick={() => navigate("/students")} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#765abd]">View all learners <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] border-separate border-spacing-0"><thead><tr className="text-left text-[10px] font-bold uppercase tracking-[.13em] text-[#aaa1b0]"><th className="border-b border-[#f0edf4] pb-3 pl-1">Learner</th><th className="border-b border-[#f0edf4] pb-3">Class</th><th className="border-b border-[#f0edf4] pb-3">Average</th><th className="border-b border-[#f0edf4] pb-3">Change</th><th className="border-b border-[#f0edf4] pb-3">Signal</th><th className="border-b border-[#f0edf4] pb-3 text-right">Action</th></tr></thead><tbody>{filteredStudents.map((student) => <tr key={student.name} className="group text-[11px] text-[#71687d]"><td className="border-b border-[#f4f1f6] py-3.5 pl-1"><div className="flex items-center gap-2.5"><span className={`grid h-8 w-8 place-items-center rounded-full text-[9px] font-bold ${student.tone === "lavender" ? "bg-[#ded2f3] text-[#624b98]" : student.tone === "mint" ? "bg-[#d7eddf] text-[#4d8464]" : student.tone === "peach" ? "bg-[#f9dfd1] text-[#a96849]" : "bg-[#dceaf5] text-[#52738e]"}`}>{student.initials}</span><span className="font-semibold text-[#5b5269]">{student.name}</span></div></td><td className="border-b border-[#f4f1f6] py-3.5">{student.class}</td><td className="border-b border-[#f4f1f6] py-3.5 font-semibold text-[#51475f]">{student.score}</td><td className="border-b border-[#f4f1f6] py-3.5"><span className={`inline-flex items-center gap-1 font-semibold ${student.change.startsWith("+") ? "text-[#5c9874]" : "text-[#b87959]"}`}>{student.change.startsWith("+") ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{student.change}</span></td><td className="border-b border-[#f4f1f6] py-3.5"><span className={`rounded-md px-2 py-1 text-[9px] font-semibold ${student.status === "Needs attention" ? "bg-[#fff0e7] text-[#b97858]" : student.status === "On track" ? "bg-[#edf6f0] text-[#5b9874]" : "bg-[#eee9fb] text-[#7459b3]"}`}>{student.status}</span></td><td className="border-b border-[#f4f1f6] py-3.5 text-right"><button className="rounded-lg p-1.5 text-[#aaa1b1] transition hover:bg-[#f7f4fa] hover:text-[#6e52b8]" onClick={() => toast.info(`Opening ${student.name}’s performance profile.`)} aria-label={`Open ${student.name}`}><ArrowRight className="h-3.5 w-3.5" /></button></td></tr>)}</tbody></table>{filteredStudents.length === 0 && <div className="py-10 text-center text-[12px] text-[#9b92a4]">No learners match “{search}”.</div>}</div></section>

          <div className="mt-5 grid gap-4 md:grid-cols-3"><QuickAction icon={UserPlus} title="Add learner" copy="Create a new student profile" onClick={() => setShowAddStudent(true)} /><QuickAction icon={Upload} title="Import results" copy="Upload Excel, CSV, or PDF" onClick={() => setShowImport(true)} /><QuickAction icon={Download} title="Generate reports" copy="Export term reports in bulk" onClick={() => { navigate("/reports"); toast.success("Report centre opened."); }} /></div>
        </main>
      </div>

      {showAddStudent && <Modal title="Add a learner" description="Create a profile for a new learner in Brookfield Academy." onClose={() => setShowAddStudent(false)}><div className="grid gap-3 sm:grid-cols-2"><Field label="First name" placeholder="Amina" /><Field label="Last name" placeholder="Mwangi" /><Field label="Admission number" placeholder="BFA-0248" /><Field label="Grade" placeholder="Grade 7" /></div><div className="mt-5 flex justify-end gap-2"><button className="rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[#7a7184] hover:bg-[#f7f4fa]" onClick={() => setShowAddStudent(false)}>Cancel</button><button className="rounded-xl bg-[#6e52b8] px-4 py-2.5 text-[12px] font-semibold text-white" onClick={() => { setShowAddStudent(false); toast.success("Learner profile created", { description: "Amina Mwangi was added to Grade 7." }); }}>Create learner</button></div></Modal>}
      {showImport && <Modal title="Import results" description="Upload a file and Gradify will validate every row before saving." onClose={() => setShowImport(false)}><div className="rounded-2xl border-2 border-dashed border-[#d9ccef] bg-[#faf8fe] p-8 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#eee9fb] text-[#7359b3]"><Upload className="h-5 w-5" /></div><p className="mt-4 text-[13px] font-semibold text-[#544b62]">Drop your file here</p><p className="mt-1 text-[11px] text-[#9d94a8]">Excel, CSV, PDF, or Word · max 10 MB</p><button className="mt-5 rounded-xl bg-[#6e52b8] px-4 py-2.5 text-[12px] font-semibold text-white" onClick={() => { setShowImport(false); toast.success("Import preview ready", { description: "1,250 records detected · 32 require correction." }); }}>Choose a file</button></div><div className="mt-5 flex items-center gap-3 text-[10px] text-[#9b92a5]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#e9f5ef] text-[#5c9975]"><Check className="h-3 w-3" /></span>Results are never saved before validation.</div></Modal>}
    </div>
  );
}

function MetricCard({ label, value, delta, icon: Icon, tone, positive = false }: { label: string; value: string; delta: string; icon: typeof Users; tone: string; positive?: boolean }) { const tones: Record<string, string> = { lavender: "bg-[#eee9fb] text-[#7157ae]", mint: "bg-[#e9f5ef] text-[#579374]", peach: "bg-[#fff0e7] text-[#b47758]", blue: "bg-[#e9f0f7] text-[#547d9d]" }; return <div className="rounded-[18px] border border-[#ebe7f1] bg-white p-4 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-5"><div className="flex items-center justify-between"><span className="text-[11px] font-medium text-[#958c9e]">{label}</span><span className={`grid h-8 w-8 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-4 w-4" /></span></div><div className="mt-4 flex items-end justify-between"><span className="text-[25px] font-semibold tracking-[-.055em] text-[#40384d]">{value}</span><span className={`text-[10px] font-semibold ${positive ? "text-[#5e9976]" : tone === "peach" ? "text-[#b9795a]" : "text-[#8f869c]"}`}>{delta}</span></div></div>; }

function QuickAction({ icon: Icon, title, copy, onClick }: { icon: typeof Users; title: string; copy: string; onClick: () => void }) { return <button onClick={onClick} className="group flex items-center gap-3 rounded-[16px] border border-[#ebe7f1] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#d8caed] hover:shadow-[0_10px_25px_rgba(60,45,92,.06)]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f2eef9] text-[#7359b3]"><Icon className="h-4 w-4" /></span><span><span className="block text-[11px] font-semibold text-[#5e556a]">{title}</span><span className="mt-0.5 block text-[10px] text-[#a39aa9]">{copy}</span></span><ArrowRight className="ml-auto h-3.5 w-3.5 text-[#b2a9b8] transition group-hover:translate-x-1 group-hover:text-[#765abd]" /></button>; }

function Field({ label, placeholder }: { label: string; placeholder: string }) { return <label className="text-[11px] font-semibold text-[#665d70]">{label}<input placeholder={placeholder} className="mt-2 w-full rounded-xl border border-[#e7e2ed] px-3 py-2.5 text-[12px] font-normal outline-none focus:border-[#a18ad1] focus:ring-4 focus:ring-[#f0ebfa]" /></label>; }

function Modal({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: React.ReactNode }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-[#2d2540]/30 px-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-[470px] rounded-[24px] bg-white p-6 shadow-2xl sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-[20px] font-semibold tracking-[-.04em] text-[#3a3248]">{title}</h2><p className="mt-1.5 text-[12px] leading-5 text-[#948b9f]">{description}</p></div><button className="rounded-lg p-1.5 text-[#a49bab] hover:bg-[#f7f4fa]" aria-label="Close modal" onClick={onClose}><X className="h-4 w-4" /></button></div><div className="mt-6">{children}</div></div></div>; }
