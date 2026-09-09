import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, Calculator, CheckCircle2, ChevronDown, Download, GraduationCap, Plus, Save, Search, SlidersHorizontal, Users } from "lucide-react";

type ResultRow = { id: number; name: string; cat1: number; cat2: number };
const initialRows: ResultRow[] = [
  { id: 1, name: "Amina Mwangi", cat1: 38, cat2: 42 },
  { id: 2, name: "Kevin Otieno", cat1: 31, cat2: 35 },
  { id: 3, name: "Zawadi Njeri", cat1: 24, cat2: 29 },
  { id: 4, name: "Brian Muthoni", cat1: 44, cat2: 46 },
  { id: 5, name: "Faith Wambui", cat1: 35, cat2: 39 },
];
const grades = Array.from({ length: 12 }, (_, index) => `Grade ${index + 1}`);
const streams = ["East", "West", "North", "Central"];
const terms = ["Term 1", "Term 2", "Term 3"];

function getBand(average: number) {
  if (average >= 90) return { label: "EE", name: "Exceeding Expectations", tone: "green" };
  if (average >= 75) return { label: "ME", name: "Meeting Expectations", tone: "blue" };
  if (average >= 50) return { label: "AE", name: "Approaching Expectations", tone: "amber" };
  return { label: "BE", name: "Below Expectations", tone: "red" };
}

export default function Results() {
  const [term, setTerm] = useState("Term 2");
  const [grade, setGrade] = useState("Grade 7");
  const [stream, setStream] = useState("East");
  const [subject, setSubject] = useState("Mathematics");
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const filteredRows = useMemo(() => rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const totals = rows.map((row) => row.cat1 + row.cat2);
  const classAverage = totals.reduce((sum, value) => sum + value, 0) / Math.max(1, totals.length);
  const classBand = getBand(classAverage);

  const updateMark = (id: number, key: "cat1" | "cat2", value: string) => {
    const numeric = Math.min(50, Math.max(0, Number(value.replace(/\D/g, "")) || 0));
    setRows((current) => current.map((row) => row.id === id ? { ...row, [key]: numeric } : row));
  };
  const saveResults = () => {
    setSaved(true);
    toast.success(`${term} results saved`, { description: `${grade} ${stream} · ${subject} is ready for analysis.` });
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <div className="min-h-screen bg-[#f8f7fb] text-[#302a40]">
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#ebe7f1] bg-[#f8f7fb]/90 px-5 backdrop-blur-xl lg:px-10"><div className="flex items-center gap-3"><Link href="/dashboard" className="grid h-9 w-9 place-items-center rounded-xl border border-[#e8e3ee] bg-white text-[#765abd] transition hover:border-[#cfc1e8]" aria-label="Back to dashboard"><ArrowLeft className="h-4 w-4" /></Link><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a39aa9]">Academic records</p><h1 className="mt-1 text-[19px] font-semibold tracking-[-.04em] text-[#383044]">Results analysis</h1></div></div><div className="flex items-center gap-2"><button onClick={() => toast.info("Export is ready for the saved result set.")} className="hidden items-center gap-2 rounded-xl border border-[#e9e5ef] bg-white px-3 py-2.5 text-[11px] font-semibold text-[#6d6478] sm:flex"><Download className="h-3.5 w-3.5" /> Export</button><button onClick={saveResults} className="inline-flex items-center gap-2 rounded-xl bg-[#6e52b8] px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-[0_7px_14px_rgba(110,82,184,.16)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]"><Save className="h-3.5 w-3.5" /> {saved ? "Saved" : "Save results"}</button></div></header>

    <main className="mx-auto max-w-[1400px] px-5 py-7 lg:px-10 lg:py-9"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="flex items-center gap-2 text-[11px] text-[#a29aaa]"><Link href="/dashboard" className="hover:text-[#6e52b8]">Overview</Link><span>/</span><span>Results</span></div><h2 className="mt-3 text-[29px] font-semibold tracking-[-.055em] text-[#342d42]">Calculate. Understand. Support.</h2><p className="mt-1.5 max-w-[610px] text-[13px] leading-6 text-[#948b9f]">Enter CAT 1 and CAT 2 marks to automatically calculate total marks, average performance, and the learner’s CBE achievement level.</p></div><div className="flex items-center gap-2 text-[11px] text-[#91889d]"><CheckCircle2 className="h-3.5 w-3.5 text-[#62a17e]" /> Auto-calculation on</div></div>

      <section className="mt-7 rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-[#eee9fb] text-[#7258ae]"><SlidersHorizontal className="h-4 w-4" /></div><div><h3 className="text-[14px] font-semibold text-[#4a4256]">Choose assessment view</h3><p className="mt-1 text-[11px] text-[#a39aa9]">Select the term, grade, stream, and subject you are recording.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><SelectField label="Term" value={term} options={terms} onChange={setTerm} /><SelectField label="Grade" value={grade} options={grades} onChange={setGrade} /><SelectField label="Class / stream" value={stream} options={streams} onChange={setStream} /><SelectField label="Subject" value={subject} options={["Mathematics", "English", "Integrated Science", "Kiswahili", "Social Studies"]} onChange={setSubject} /></div></section>

      <div className="mt-5 grid gap-4 sm:grid-cols-3"><Summary icon={Users} label="Learners" value={String(rows.length)} tone="lavender" /><Summary icon={Calculator} label="Class average" value={`${classAverage.toFixed(1)}%`} tone="mint" /><Summary icon={GraduationCap} label="Class band" value={classBand.label} detail={classBand.name} tone="peach" /></div>

      <section className="mt-6 rounded-[20px] border border-[#ebe7f1] bg-white p-5 shadow-[0_5px_20px_rgba(60,45,92,.025)] sm:p-6"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 className="text-[14px] font-semibold text-[#4a4256]">{term} · {grade} {stream} · {subject}</h3><p className="mt-1 text-[11px] text-[#a39aa9]">Each CAT is marked out of 50. Total is out of 100.</p></div><div className="flex items-center rounded-xl border border-[#e9e5ef] bg-[#fcfbfd] px-3"><Search className="h-3.5 w-3.5 text-[#aaa1b2]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search learner" className="w-[160px] bg-transparent py-2.5 pl-2 text-[11px] outline-none placeholder:text-[#b2aab8]" /></div></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left"><thead><tr className="text-[10px] font-bold uppercase tracking-[.13em] text-[#aaa1b0]"><th className="px-4 pb-2">Learner</th><th className="px-4 pb-2">CAT 1 <span className="font-normal normal-case tracking-normal">/ 50</span></th><th className="px-4 pb-2">CAT 2 <span className="font-normal normal-case tracking-normal">/ 50</span></th><th className="px-4 pb-2">Total <span className="font-normal normal-case tracking-normal">/ 100</span></th><th className="px-4 pb-2">Average</th><th className="px-4 pb-2">Performance</th></tr></thead><tbody>{filteredRows.map((row) => { const total = row.cat1 + row.cat2; const average = total; const band = getBand(average); return <tr key={row.id} className="rounded-xl bg-[#fcfbfd] text-[12px] text-[#5f566b]"><td className="rounded-l-xl px-4 py-3.5 font-semibold text-[#4f465b]">{row.name}</td><td className="px-4 py-3.5"><input value={row.cat1} onChange={(event) => updateMark(row.id, "cat1", event.target.value)} className="w-16 rounded-lg border border-[#e5e0eb] bg-white px-2.5 py-2 text-center text-[12px] font-semibold outline-none focus:border-[#9e86d4] focus:ring-4 focus:ring-[#eee9fb]" /></td><td className="px-4 py-3.5"><input value={row.cat2} onChange={(event) => updateMark(row.id, "cat2", event.target.value)} className="w-16 rounded-lg border border-[#e5e0eb] bg-white px-2.5 py-2 text-center text-[12px] font-semibold outline-none focus:border-[#9e86d4] focus:ring-4 focus:ring-[#eee9fb]" /></td><td className="px-4 py-3.5 font-bold text-[#40374d]">{total}</td><td className="px-4 py-3.5">{average.toFixed(1)}%</td><td className="rounded-r-xl px-4 py-3.5"><span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold ${band.tone === "green" ? "bg-[#e9f5ef] text-[#579374]" : band.tone === "blue" ? "bg-[#eaf2fa] text-[#557d9f]" : band.tone === "amber" ? "bg-[#fff4e5] text-[#b17b43]" : "bg-[#fbeaea] text-[#b76767]"}`}><span className="text-[12px]">{band.label}</span><span className="font-medium">{band.name}</span></span></td></tr>; })}</tbody></table></div>{filteredRows.length === 0 && <div className="py-10 text-center text-[12px] text-[#948b9f]">No learners match this search.</div>}<button onClick={() => toast.info("Add learner from the Students section first.")} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#cfc1e8] px-3 py-2.5 text-[11px] font-semibold text-[#765abd] hover:bg-[#faf8fe]"><Plus className="h-3.5 w-3.5" /> Add learner to class</button></section>

      <section className="mt-5 rounded-[18px] border border-[#e5def2] bg-[#f1edfb] p-5"><div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#7359b3]"><BookOpen className="h-4 w-4" /></div><div><h3 className="text-[13px] font-semibold text-[#55486d]">CBE performance bands</h3><p className="mt-1 text-[11px] leading-5 text-[#8c809b]">EE = 90–100% Exceeding Expectations · ME = 75–89% Meeting Expectations · AE = 50–74% Approaching Expectations · BE = 0–49% Below Expectations.</p></div></div></section>
    </main>
  </div>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="relative text-[11px] font-semibold text-[#665d70]">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full appearance-none rounded-xl border border-[#e5e0eb] bg-[#fcfbfd] px-3 py-3 pr-8 text-[12px] font-semibold text-[#5f566b] outline-none focus:border-[#a18ad1] focus:ring-4 focus:ring-[#f0ebfa]">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-[34px] h-3.5 w-3.5 text-[#a49bab]" /></label>; }
function Summary({ icon: Icon, label, value, detail, tone }: { icon: typeof Users; label: string; value: string; detail?: string; tone: string }) { const styles: Record<string, string> = { lavender: "bg-[#eee9fb] text-[#7157ae]", mint: "bg-[#e9f5ef] text-[#579374]", peach: "bg-[#fff0e7] text-[#b47758]" }; return <div className="rounded-[18px] border border-[#ebe7f1] bg-white p-4 shadow-[0_5px_20px_rgba(60,45,92,.025)]"><div className="flex items-center justify-between"><span className="text-[11px] text-[#958c9e]">{label}</span><span className={`grid h-8 w-8 place-items-center rounded-xl ${styles[tone]}`}><Icon className="h-4 w-4" /></span></div><p className="mt-4 text-[25px] font-semibold tracking-[-.055em] text-[#40384d]">{value}</p>{detail && <p className="mt-1 text-[10px] text-[#958c9e]">{detail}</p>}</div>; }
