import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isEmail = identifier.includes("@");
  const isPhone = /^[+\d\s()-]{7,}$/.test(identifier.trim());
  const validIdentifier = isEmail || isPhone;
  const channel = isEmail ? "email" : "phone";
  const maskedIdentifier = isEmail
    ? identifier.replace(/(^.).*(@.*$)/, "$1••••$2")
    : identifier.length > 4
      ? `${identifier.slice(0, 3)} •••• ${identifier.slice(-3)}`
      : identifier;

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const sendOtp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validIdentifier) {
      toast.error("Enter a valid email address or phone number.");
      return;
    }
    setSent(true);
    setSeconds(30);
    setOtp(["", "", "", "", "", ""]);
    toast.success(`Verification code sent by ${channel}.`, {
      description: "For this demo, use 123456 to continue.",
    });
    window.setTimeout(() => inputRefs.current[0]?.focus(), 60);
  };

  const updateOtp = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const verifyOtp = (event: React.FormEvent) => {
    event.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the six-digit verification code.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      if (code !== "123456") {
        setSubmitting(false);
        toast.error("That code doesn’t look right.", { description: "Check the latest message and try again." });
        return;
      }
      toast.success("You’re verified. Welcome back.");
      setLocation("/dashboard");
    }, 450);
  };

  const resend = () => {
    if (seconds > 0) return;
    setSeconds(30);
    toast.success(`A new code was sent by ${channel}.`, { description: "The previous code is no longer valid." });
  };

  return (
    <div className="min-h-screen bg-[#f8f6fc] text-[#302a40]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#302742] p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-14 xl:p-20">
          <div className="absolute -right-28 -top-28 h-[430px] w-[430px] rounded-full bg-[#654a9e]/45 blur-2xl" />
          <div className="absolute -bottom-28 -left-28 h-[340px] w-[340px] rounded-full bg-[#8b6fd0]/20 blur-3xl" />
          <Link href="/" className="relative flex w-fit items-center gap-3" aria-label="Back to Gradify home"><img src="/manus-storage/gradify-symbol-transparent_32addc62.png" alt="Gradify" className="h-10 w-10 object-contain" /><span className="text-[20px] font-semibold tracking-[-.05em]">gradify</span></Link>
          <div className="relative max-w-[440px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.17em] text-[#d3c4f4]"><Sparkles className="h-3.5 w-3.5" /> Teacher workspace</div>
            <h1 className="text-[54px] font-semibold leading-[1.03] tracking-[-.065em]">Your classroom<br /><span className="text-[#bda9eb]">starts here.</span></h1>
            <p className="mt-6 max-w-[380px] text-[15px] leading-7 text-[#b7aec9]">Enter your results, understand your learners, and keep every family in the loop — all from one calm workspace.</p>
            <div className="mt-9 space-y-3 text-[12px] text-[#d3ccdf]"><div className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[#c5b6ec]"><CheckCircle2 className="h-3.5 w-3.5" /></span> Secure passwordless access</div><div className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[#c5b6ec]"><CheckCircle2 className="h-3.5 w-3.5" /></span> Works with your school email or phone</div><div className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[#c5b6ec]"><CheckCircle2 className="h-3.5 w-3.5" /></span> Your learner data stays protected</div></div>
          </div>
          <div className="relative flex items-center gap-2 text-[10px] text-[#948aa9]"><ShieldCheck className="h-4 w-4 text-[#b9a6e7]" /> Trusted access for Brookfield Academy</div>
        </section>

        <main className="flex min-h-screen flex-col bg-white px-5 py-6 sm:px-10 lg:bg-[#f8f6fc] lg:px-16 lg:py-10 xl:px-24">
          <div className="flex items-center justify-between lg:hidden"><Link href="/" className="flex items-center gap-2.5"><img src="/manus-storage/gradify-symbol-transparent_32addc62.png" alt="Gradify" className="h-9 w-9 object-contain" /><span className="text-[18px] font-semibold tracking-[-.05em]">gradify</span></Link><span className="text-[11px] font-medium text-[#9a91a5]">Teacher sign in</span></div>
          <div className="flex flex-1 items-center justify-center py-12 lg:py-0"><div className="w-full max-w-[430px] rounded-[28px] border border-[#ebe7f1] bg-white p-6 shadow-[0_20px_60px_rgba(72,53,108,.07)] sm:p-9">
            <Link href="/" className="mb-8 hidden items-center gap-1.5 text-[11px] font-semibold text-[#968da0] transition hover:text-[#6e52b8] lg:inline-flex"><ArrowLeft className="h-3.5 w-3.5" /> Back to Gradify</Link>
            {!sent ? <><div className="grid h-12 w-12 place-items-center rounded-[16px] bg-[#eee9fb] text-[#6e52b8]"><LockKeyhole className="h-5 w-5" /></div><h2 className="mt-6 text-[28px] font-semibold tracking-[-.055em] text-[#342d42]">Welcome back</h2><p className="mt-2 text-[13px] leading-6 text-[#948b9f]">Sign in to your teacher workspace. We’ll send a one-time verification code.</p><form onSubmit={sendOtp} className="mt-7"><label className="text-[12px] font-semibold text-[#5f566c]">Email or phone number<div className="relative mt-2"><span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a59baa]">{isEmail ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}</span><input autoFocus value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="teacher@school.org or +254 712 345 678" className="w-full rounded-xl border border-[#e5e0eb] bg-white py-3.5 pl-10 pr-3 text-[13px] font-normal outline-none transition placeholder:text-[#b1a9b8] focus:border-[#9e86d4] focus:ring-4 focus:ring-[#eee9fb]" /></div></label><button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6e52b8] px-4 py-3.5 text-[13px] font-semibold text-white shadow-[0_9px_18px_rgba(110,82,184,.16)] transition hover:-translate-y-0.5 hover:bg-[#5d439e]">Send verification code <ArrowRight className="h-4 w-4" /></button></form><div className="mt-7 flex items-start gap-2.5 rounded-xl bg-[#faf8fd] p-3.5 text-[11px] leading-5 text-[#93899f]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8065c2]" /> No password required. Your code expires after 10 minutes and can only be used once.</div></> : <><button className="mb-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#968da0] transition hover:text-[#6e52b8]" onClick={() => setSent(false)}><ArrowLeft className="h-3.5 w-3.5" /> Change email or phone</button><div className="grid h-12 w-12 place-items-center rounded-[16px] bg-[#e9f5ef] text-[#5d9976]"><MessageCircle className="h-5 w-5" /></div><h2 className="mt-6 text-[28px] font-semibold tracking-[-.055em] text-[#342d42]">Check your {channel}</h2><p className="mt-2 text-[13px] leading-6 text-[#948b9f]">We sent a 6-digit code to <strong className="font-semibold text-[#665b70]">{maskedIdentifier}</strong>.</p><form onSubmit={verifyOtp} className="mt-7"><label className="text-[12px] font-semibold text-[#5f566c]">Verification code<div className="mt-2 flex gap-2 sm:gap-2.5">{otp.map((digit, index) => <input key={index} ref={(element) => { inputRefs.current[index] = element; }} value={digit} onChange={(event) => updateOtp(index, event.target.value)} onKeyDown={(event) => handleOtpKeyDown(index, event)} inputMode="numeric" maxLength={1} aria-label={`Verification digit ${index + 1}`} className="h-12 w-full rounded-xl border border-[#e5e0eb] bg-white text-center text-[18px] font-semibold text-[#4f4461] outline-none transition focus:border-[#9e86d4] focus:ring-4 focus:ring-[#eee9fb]" />)}</div></label><button type="submit" disabled={submitting} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6e52b8] px-4 py-3.5 text-[13px] font-semibold text-white shadow-[0_9px_18px_rgba(110,82,184,.16)] transition hover:bg-[#5d439e] disabled:cursor-wait disabled:opacity-70">{submitting ? "Verifying..." : "Verify and continue"} <ArrowRight className="h-4 w-4" /></button></form><div className="mt-6 flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 text-[#a198a9]"><Clock3 className="h-3.5 w-3.5" /> Code expires in 10 minutes</span><button className={`inline-flex items-center gap-1.5 font-semibold ${seconds > 0 ? "text-[#b1a9b7]" : "text-[#765abd]"}`} disabled={seconds > 0} onClick={resend}><RefreshCw className="h-3.5 w-3.5" /> {seconds > 0 ? `Resend in ${seconds}s` : "Resend code"}</button></div><div className="mt-7 rounded-xl border border-[#eeeaf3] bg-[#fcfbfd] p-3.5 text-center text-[10px] leading-5 text-[#9a91a3]">Demo mode: enter <strong className="font-bold text-[#6e52b8]">123456</strong> to access the teacher dashboard.</div></>}
          </div></div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#a49baa] lg:justify-start"><ShieldCheck className="h-3.5 w-3.5 text-[#7e66bb]" /> Gradify protects your school data with secure, role-based access.</div>
        </main>
      </div>
    </div>
  );
}
