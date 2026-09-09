export type Learner = { id: string; name: string; admission: string; grade: string; stream: string; attendance: number; average: number; status: string };
export type AttendanceRecord = { id: string; learner: string; grade: string; date: string; status: "Present" | "Late" | "Absent" };
export type Assignment = { id: string; title: string; subject: string; grade: string; due: string; completion: number };

export const defaultLearners: Learner[] = [
  { id: "1", name: "Amina Mwangi", admission: "BFA-0248", grade: "Grade 7", stream: "East", attendance: 96, average: 86, status: "Improving" },
  { id: "2", name: "Kevin Otieno", admission: "BFA-0199", grade: "Grade 8", stream: "West", attendance: 92, average: 74, status: "On track" },
  { id: "3", name: "Zawadi Njeri", admission: "BFA-0214", grade: "Grade 6", stream: "North", attendance: 81, average: 68, status: "Needs attention" },
  { id: "4", name: "Brian Muthoni", admission: "BFA-0177", grade: "Grade 7", stream: "East", attendance: 98, average: 91, status: "Improving" },
];
export const defaultAttendance: AttendanceRecord[] = defaultLearners.map((learner, index) => ({ id: learner.id, learner: learner.name, grade: `${learner.grade} · ${learner.stream}`, date: "23 Jul 2024", status: index === 2 ? "Late" : "Present" }));
export const defaultAssignments: Assignment[] = [
  { id: "a1", title: "Fractions and data handling", subject: "Mathematics", grade: "Grade 7", due: "26 Jul 2024", completion: 82 },
  { id: "a2", title: "Living things investigation", subject: "Integrated Science", grade: "Grade 8", due: "29 Jul 2024", completion: 64 },
  { id: "a3", title: "Reading comprehension", subject: "English", grade: "Grade 6", due: "31 Jul 2024", completion: 91 },
];

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const value = window.localStorage.getItem(`gradify:${key}`); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}
export function writeStore<T>(key: string, value: T) { if (typeof window !== "undefined") window.localStorage.setItem(`gradify:${key}`, JSON.stringify(value)); }
export function downloadCsv(filename: string, rows: string[][]) { const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url); }
