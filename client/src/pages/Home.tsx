import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Intelligent analytics",
    copy: "Turn term results into clear patterns, support signals, and next best actions.",
    tone: "lavender",
  },
  {
    icon: ClipboardCheck,
    title: "Results, without the rush",
    copy: "A fast, keyboard-friendly entry flow with validation, drafts, and import previews.",
    tone: "mint",
  },
  {
    icon: MessageCircle,
    title: "Every family in the loop",
    copy: "Share reports, attendance, assignments, and teacher feedback through one calm portal.",
    tone: "peach",
  },
];

const comparison = [
  ["Results live in spreadsheets", "One source of truth from Grade 1 to 12"],
  ["Reports take days to compile", "Instant, branded digital reports"],
  ["Problems surface at end of term", "System-generated support signals"],
  ["Parents wait for updates", "Timely portal, email, and SMS notifications"],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [email, setEmail] = useState("");

  const submitDemo = (event: React.FormEvent) => {
    event.preventDefault();
    setDemoOpen(false);
    toast.success("Thanks — your demo request is on its way.", {
      description: email ? `We’ll reach out at ${email}.` : "A Gradify specialist will be in touch.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfafc] text-[#292438]">
      <header className="relative z-20 border-b border-[#ebe8f1]/80 bg-[#fbfafc]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Gradify home">
            <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#6e52b8] text-white shadow-[0_8px_18px_rgba(110,82,184,.2)]">
              <GraduationCap className="h-5 w-5" strokeWidth={2.3} />
            </div>
            <span className="text-[19px] font-semibold tracking-[-0.04em] text-[#292438]">gradify</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#817a91] md:flex">
            <a href="#platform" className="transition-colors hover:text-[#6e52b8]">Platform</a>
            <a href="#intelligence" className="transition-colors hover:text-[#6e52b8]">Intelligence</a>
            <a href="#schools" className="transition-colors hover:text-[#6e52b8]">For schools</a>
            <a href="#stories" className="transition-colors hover:text-[#6e52b8]">Stories</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#716a80] transition hover:bg-[#f0edf7]">Sign in</Link>
            <button className="rounded-xl bg-[#6e52b8] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_7px_16px_rgba(110,82,184,.18)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]" onClick={() => setDemoOpen(true)}>Request a demo</button>
          </div>

          <button className="rounded-xl p-2 text-[#6e52b8] md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#ebe8f1] bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-[#716a80]">
              <a href="#platform" onClick={() => setMobileOpen(false)}>Platform</a>
              <a href="#intelligence" onClick={() => setMobileOpen(false)}>Intelligence</a>
              <a href="#schools" onClick={() => setMobileOpen(false)}>For schools</a>
              <button className="w-fit rounded-xl bg-[#6e52b8] px-4 py-2.5 text-white" onClick={() => setDemoOpen(true)}>Request a demo</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div className="relative z-10 max-w-[520px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfd6f7] bg-[#f1edfb] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#765abd]">
              <Sparkles className="h-3.5 w-3.5" /> Built for better learning outcomes
            </div>
            <h1 className="max-w-[580px] text-[52px] font-semibold leading-[1.02] tracking-[-0.065em] text-[#2a2539] sm:text-[66px]">Smarter school data.<br /><span className="text-[#765abd]">Better learning</span><br />outcomes.</h1>
            <p className="mt-7 max-w-[465px] text-[17px] leading-8 text-[#817a91]">Gradify brings results, attendance, assignments, analytics, and parent communication into one beautifully simple school intelligence platform.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#6e52b8] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_12px_22px_rgba(110,82,184,.2)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]">Explore the dashboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e0ed] bg-white px-5 py-3.5 text-[13px] font-semibold text-[#625b72] transition hover:border-[#c8bce4] hover:text-[#6e52b8]" onClick={() => setDemoOpen(true)}>See how it works <ChevronDown className="h-4 w-4" /></button>
            </div>
            <div className="mt-7 flex items-center gap-3 text-[12px] text-[#948ca3]"><div className="flex -space-x-2"><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#fbfafc] bg-[#f7c6a8] text-[9px] font-bold text-[#704637]">AK</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#fbfafc] bg-[#bde2d3] text-[9px] font-bold text-[#38624f]">JM</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#fbfafc] bg-[#c9b9ec] text-[9px] font-bold text-[#554183]">SO</span></div><span>Trusted by forward-thinking schools in Kenya</span></div>
          </div>

          <div className="relative lg:pt-4">
            <div className="absolute -right-8 -top-16 h-72 w-72 rounded-full bg-[#e8dffb] blur-[2px] lg:h-[420px] lg:w-[420px]" />
            <div className="absolute -bottom-16 left-4 h-44 w-44 rounded-full bg-[#f8dfd0]/70 blur-2xl" />
            <div className="relative rounded-[28px] border border-white/80 bg-white/75 p-3 shadow-[0_30px_70px_rgba(75,58,112,.15)] backdrop-blur-sm sm:p-4">
              <div className="overflow-hidden rounded-[21px] border border-[#eeeaf5] bg-[#f8f7fb]">
                <div className="flex h-12 items-center justify-between border-b border-[#ebe8f2] bg-white px-4 sm:px-5"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#d6c9f5]" /><span className="h-2 w-2 rounded-full bg-[#efe2bd]" /><span className="h-2 w-2 rounded-full bg-[#cce9d8]" /></div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#aaa2b8]">School intelligence</span><div className="h-6 w-6 rounded-full bg-[#f0eefa]" /></div>
                <div className="grid min-h-[360px] grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr]">
                  <div className="border-r border-[#ebe8f2] bg-[#fcfbfd] p-3 sm:p-4"><div className="mb-7 flex items-center gap-2"><div className="grid h-7 w-7 place-items-center rounded-lg bg-[#6e52b8] text-white"><GraduationCap className="h-3.5 w-3.5" /></div><span className="hidden text-[11px] font-bold text-[#504761] sm:block">gradify</span></div><div className="space-y-2"><div className="rounded-lg bg-[#eee9fb] px-2.5 py-2 text-[10px] font-semibold text-[#6e52b8]">Overview</div><div className="px-2.5 py-2 text-[10px] text-[#9b94a8]">Students</div><div className="px-2.5 py-2 text-[10px] text-[#9b94a8]">Results</div><div className="px-2.5 py-2 text-[10px] text-[#9b94a8]">Analytics</div></div><div className="mt-12 rounded-xl bg-[#f2eef9] p-3"><div className="mb-2 h-2 w-16 rounded bg-[#ddd4ef]" /><div className="h-1.5 w-20 rounded bg-[#e6e0f1]" /><div className="mt-3 h-1.5 w-12 rounded bg-[#d1c1eb]" /></div></div>
                  <div className="p-4 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#a39bad]">Tuesday, 23 July 2024</p><h3 className="mt-1 text-[20px] font-semibold tracking-[-.04em] text-[#3b344c] sm:text-[25px]">Good morning, Alice</h3></div><div className="hidden rounded-lg border border-[#ece8f4] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#8d849c] sm:block">Term 2 <ChevronDown className="ml-1 inline h-3 w-3" /></div></div><div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3"><div className="rounded-xl bg-[#efeafb] p-3"><div className="text-[9px] text-[#81769e]">Learners</div><div className="mt-1 text-[20px] font-semibold text-[#4a3c6d]">1,248</div><div className="mt-1 text-[9px] font-semibold text-[#63a17f]">+12 this term</div></div><div className="rounded-xl bg-[#e9f5ef] p-3"><div className="text-[9px] text-[#6e9381]">Avg. score</div><div className="mt-1 text-[20px] font-semibold text-[#3d6d55]">74.8%</div><div className="mt-1 text-[9px] font-semibold text-[#63a17f]">+4.2% vs T1</div></div><div className="rounded-xl bg-[#fff1e8] p-3"><div className="text-[9px] text-[#a07f6b]">Attendance</div><div className="mt-1 text-[20px] font-semibold text-[#8a5f48]">91.6%</div><div className="mt-1 text-[9px] font-semibold text-[#c68d68]">-1.1% vs T1</div></div></div><div className="mt-4 rounded-xl border border-[#edeaf3] bg-white p-3 sm:p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-[#5d566a]">Performance trend</span><span className="text-[9px] text-[#9d95a9]">Term 1 → Term 2</span></div><div className="mt-3 flex h-24 items-end gap-1.5 sm:gap-2">{[34,45,41,58,51,65,68,62,76,72,86,80].map((height, index) => <div key={index} className="relative flex-1 rounded-t-md bg-[#e8def8]" style={{ height: `${height}%` }}><div className="absolute inset-x-0 bottom-0 rounded-t-md bg-[#8b70c8]" style={{ height: `${index > 6 ? 66 : 40}%` }} /></div>)}</div><div className="mt-2 flex justify-between text-[8px] text-[#b0a8b7]"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="border-y border-[#ebe7f0] bg-white/70 py-18 lg:py-24"><div className="mx-auto max-w-[1240px] px-5 lg:px-8"><div className="mb-12 max-w-[500px]"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8c73c5]">Everything connected</p><h2 className="mt-3 text-[36px] font-semibold leading-tight tracking-[-.055em] text-[#2f2940]">The calm behind<br />better school decisions.</h2></div><div className="grid gap-4 md:grid-cols-3">{features.map((feature) => { const Icon = feature.icon; const tone = feature.tone === "mint" ? "bg-[#e9f5ef] text-[#51906f]" : feature.tone === "peach" ? "bg-[#fff0e7] text-[#b47555]" : "bg-[#eee9fb] text-[#755ab7]"; return <div key={feature.title} className="group rounded-[22px] border border-[#eeeaf3] bg-[#fdfcfe] p-6 transition hover:-translate-y-1 hover:border-[#d8caef] hover:shadow-[0_18px_35px_rgba(91,71,135,.08)]"><div className={`grid h-11 w-11 place-items-center rounded-[14px] ${tone}`}><Icon className="h-5 w-5" /></div><h3 className="mt-6 text-[17px] font-semibold tracking-[-.02em] text-[#3d364d]">{feature.title}</h3><p className="mt-2 text-[13px] leading-6 text-[#8e879a]">{feature.copy}</p><button className="mt-6 inline-flex items-center gap-1 text-[12px] font-semibold text-[#7258b3]" onClick={() => toast.info(`${feature.title} is part of your Gradify workspace.`)}>Learn more <ArrowRight className="h-3.5 w-3.5" /></button></div>; })}</div></div></section>

        <section id="intelligence" className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-28"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e9f5ef] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#52916f]"><ShieldCheck className="h-3.5 w-3.5" /> Intelligence you can act on</div><h2 className="text-[38px] font-semibold leading-[1.08] tracking-[-.06em] text-[#2e293e] sm:text-[48px]">Not just what happened.<br /><span className="text-[#765abd]">What to do next.</span></h2><p className="mt-6 max-w-[450px] text-[16px] leading-7 text-[#827b90]">Gradify surfaces the patterns hidden in your school data — so heads of department, teachers, and families can move from questions to support faster.</p><div className="mt-8 space-y-4">{["System-generated insights, clearly labelled", "Early-support signals without guesswork", "CBC/CBE and configurable grading, side by side"].map((item) => <div key={item} className="flex items-center gap-3 text-[13px] font-medium text-[#5d566b]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f0eafa] text-[#7459b5]"><Check className="h-3.5 w-3.5" /></span>{item}</div>)}</div></div><div className="relative rounded-[28px] bg-[#f3f0fa] p-4 sm:p-7"><div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#e5dbf8] blur-3xl" /><div className="relative rounded-[20px] border border-white bg-white p-5 shadow-[0_14px_30px_rgba(79,61,118,.08)] sm:p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a29aaa]">System-generated insight</p><p className="mt-1 text-[15px] font-semibold text-[#40394e]">This week at a glance</p></div><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eee9fb] text-[#755ab7]"><Sparkles className="h-4 w-4" /></div></div><div className="mt-5 rounded-2xl bg-[#f6f2fb] p-4"><div className="flex items-start gap-3"><div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ded3f5] text-[#755ab7]"><TrendingIcon /></div><div><p className="text-[13px] font-semibold leading-5 text-[#4b4160]">Grade 7 Mathematics improved from 61% to 69% between Term 1 and Term 2.</p><p className="mt-1.5 text-[11px] leading-5 text-[#948ba2]">Consider sharing the revision approach with Grade 8 subject leads.</p></div></div></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#f0edf4] p-4"><div className="flex items-center justify-between text-[11px] text-[#92899f]"><span>Improving learners</span><ArrowRight className="h-3.5 w-3.5" /></div><div className="mt-3 text-[27px] font-semibold tracking-[-.05em] text-[#4c3d70]">23</div><div className="mt-1 text-[10px] font-semibold text-[#62a17e]">+18% this term</div></div><div className="rounded-2xl border border-[#f0edf4] p-4"><div className="flex items-center justify-between text-[11px] text-[#92899f]"><span>Needs attention</span><ArrowRight className="h-3.5 w-3.5" /></div><div className="mt-3 text-[27px] font-semibold tracking-[-.05em] text-[#915d47]">12</div><div className="mt-1 text-[10px] font-semibold text-[#c58b68]">Review attendance link</div></div></div></div></div></section>

        <section id="schools" className="bg-[#2f2940] py-20 text-white lg:py-24"><div className="mx-auto max-w-[1240px] px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#c4b2ed]">One platform, every role</p><h2 className="mt-4 text-[38px] font-semibold leading-[1.07] tracking-[-.055em]">Made for the whole<br />school community.</h2><p className="mt-5 max-w-[380px] text-[15px] leading-7 text-[#b6afc4]">From the principal’s morning view to a parent checking attendance on a phone, Gradify gives every person the right context.</p><button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#ad93e6] px-5 py-3.5 text-[13px] font-semibold text-[#352852] transition hover:bg-[#c1acf0]" onClick={() => toast.success("Gradify is ready for your school.")}>Start a conversation <ArrowRight className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2">{[{icon: GraduationCap,title:"School leaders",copy:"See the signals that deserve attention — by grade, class, subject, or term."},{icon: BookOpen,title:"Teachers",copy:"Enter, review, and understand results without fighting the spreadsheet."},{icon: Users,title:"Parents",copy:"A calm mobile portal for results, attendance, assignments, and reports."},{icon: ShieldCheck,title:"Administrators",copy:"Configure curriculum, grading, roles, audit logs, and school settings."}].map((role) => { const Icon = role.icon; return <div key={role.title} className="rounded-[20px] border border-white/10 bg-white/[.06] p-5 transition hover:bg-white/[.1]"><Icon className="h-5 w-5 text-[#c5b4ee]" /><h3 className="mt-5 text-[15px] font-semibold">{role.title}</h3><p className="mt-2 text-[12px] leading-5 text-[#aaa2ba]">{role.copy}</p></div>; })}</div></div></div></section>

        <section id="stories" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8c73c5]">Traditional vs. intelligent</p><h2 className="mt-3 text-[35px] font-semibold tracking-[-.055em] text-[#322c42]">A better way to run the term.</h2></div><span className="max-w-[260px] text-[12px] leading-5 text-[#928a9e]">Built around the questions educators ask every day.</span></div><div className="overflow-hidden rounded-[22px] border border-[#ebe7f0] bg-white"><div className="grid grid-cols-[1fr_1.2fr] border-b border-[#eeeaf2] bg-[#faf9fc] text-[11px] font-bold uppercase tracking-[.14em] text-[#a19aaa]"><div className="p-5 sm:p-6">Traditional school management</div><div className="border-l border-[#eeeaf2] p-5 text-[#765abd] sm:p-6">Gradify intelligent school management</div></div>{comparison.map(([oldWay, newWay]) => <div key={oldWay} className="grid grid-cols-[1fr_1.2fr] border-b border-[#f0edf4] last:border-0"><div className="flex items-center gap-3 p-5 text-[12px] text-[#9a92a4] sm:p-6"><span className="h-1.5 w-1.5 rounded-full bg-[#d9d3df]" />{oldWay}</div><div className="flex items-center gap-3 border-l border-[#f0edf4] bg-[#fdfcff] p-5 text-[12px] font-medium text-[#5b526c] sm:p-6"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#e9f5ef] text-[#5c9a76]"><Check className="h-3 w-3" /></span>{newWay}</div></div>)}</div></section>

        <section className="mx-5 mb-12 overflow-hidden rounded-[28px] bg-[#eee9fb] sm:mx-auto sm:max-w-[1190px]"><div className="relative flex flex-col items-start justify-between gap-8 p-8 sm:p-12 lg:flex-row lg:items-center"><div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-[#dfd2f8]" /><div className="relative"><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#866ac1]">Your next term starts here</p><h2 className="mt-3 max-w-[520px] text-[33px] font-semibold leading-tight tracking-[-.055em] text-[#3a2e52]">Give your school data a clearer voice.</h2></div><button className="relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#6e52b8] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(110,82,184,.18)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]" onClick={() => setDemoOpen(true)}>Request a demo <ArrowRight className="h-4 w-4" /></button></div></section>
      </main>

      <footer className="border-t border-[#ebe7f0] bg-white/70"><div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-5 py-7 text-[11px] text-[#9b93a6] sm:flex-row lg:px-8"><div className="flex items-center gap-2 font-semibold text-[#6952a0]"><div className="grid h-6 w-6 place-items-center rounded-lg bg-[#6e52b8] text-white"><GraduationCap className="h-3.5 w-3.5" /></div>gradify</div><span>School intelligence for better learning outcomes.</span><span>© 2024 Gradify Technologies</span></div></footer>

      {demoOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#2e2640]/35 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="demo-title"><div className="relative w-full max-w-[430px] rounded-[24px] bg-white p-7 shadow-2xl"><button className="absolute right-5 top-5 rounded-lg p-1.5 text-[#a099ac] hover:bg-[#f5f2f8]" aria-label="Close dialog" onClick={() => setDemoOpen(false)}><X className="h-4 w-4" /></button><div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#eee9fb] text-[#6e52b8]"><MessageCircle className="h-5 w-5" /></div><h2 id="demo-title" className="mt-5 text-[24px] font-semibold tracking-[-.04em] text-[#332c42]">See Gradify in action</h2><p className="mt-2 text-[13px] leading-6 text-[#8b8398]">Tell us where to send a guided tour of the platform.</p><form onSubmit={submitDemo} className="mt-6 space-y-4"><label className="block text-[12px] font-semibold text-[#5d556a]">Work email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@school.org" className="mt-2 w-full rounded-xl border border-[#e6e1ed] px-3.5 py-3 text-[13px] outline-none transition placeholder:text-[#b4adba] focus:border-[#9e86d4] focus:ring-4 focus:ring-[#eee9fb]" /></label><button type="submit" className="w-full rounded-xl bg-[#6e52b8] px-4 py-3.5 text-[13px] font-semibold text-white transition hover:bg-[#5d439e]">Request my demo</button></form></div></div>}
    </div>
  );
}

function TrendingIcon() {
  return <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M3 14.5 7.2 10l3 2.6L17 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.5 5.5H17V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
