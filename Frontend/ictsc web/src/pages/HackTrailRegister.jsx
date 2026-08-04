import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Flag,
  Info,
  MapPin,
  Sparkles,
  Users,
  Mountain,
} from "lucide-react";
import HackTrailRegisterForm from "../components/HackTrailRegisterForm";
import {
  loadHackTrailSettings,
  loadRegisteredTeams,
  saveRegisteredTeams,
} from "./hackTrailRegistrationData";

const TEAM_SIZE = 5;
const REQUIRED_BATCHES = 3;
const MAX_PER_BATCH = 2;
const MIN_FEMALE = 2;

/* ------------------------------------------------------------------ */
/*  Visual identity                                                   */
/* ------------------------------------------------------------------ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
`;

/** A numbered checkpoint marker used to thread sections together along the trail. */
function Checkpoint({ index, label, tone = "cyan" }) {
  const tones = {
    cyan: "border-cyan-400/40 text-cyan-300 shadow-cyan-400/20",
    emerald: "border-emerald-400/40 text-emerald-300 shadow-emerald-400/20",
    amber: "border-amber-400/40 text-amber-300 shadow-amber-400/20",
  };
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[#0B1120] font-mono text-xs font-semibold shadow-[0_0_0_4px_rgba(2,6,23,0.9)] ${tones[tone]}`}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-10" />
        {index}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

/** Dashed vertical trail rendered behind a column of sections (desktop only). */
function TrailSpine() {
  return (
    <div
      className="pointer-events-none absolute left-[18px] top-3 bottom-3 hidden w-px md:block"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(56,189,248,0.35) 0, rgba(56,189,248,0.35) 6px, transparent 6px, transparent 14px)",
      }}
    />
  );
}

function RulesSummary() {
  const rules = [
    { text: "Every team includes exactly 5 candidates.", icon: Users },
    { text: "Candidate lists span exactly 3 different batches.", icon: MapPin },
    { text: "No more than 2 candidates share a batch.", icon: MapPin },
    { text: "At least 2 candidates must be female.", icon: Users },
    { text: "Batch 10 must have a representative aboard.", icon: Flag },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-white/[0.06] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Mountain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[Space_Grotesk] text-lg font-semibold tracking-tight text-slate-100">
              Trail markers
            </h2>
            <p className="text-xs text-slate-500">The route every candidate list has to follow</p>
          </div>
        </div>
        <span className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 font-mono text-[11px] font-semibold text-cyan-300 sm:inline-block">
          5 checkpoints
        </span>
      </div>
      <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-5">
        {rules.map((rule, index) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.text}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="h-3.5 w-3.5 text-slate-600 transition-colors duration-200 group-hover:text-cyan-300" />
              </div>
              <p className="text-xs font-medium leading-relaxed text-slate-300">{rule.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RegistrationOverview({ registeredCount, teamLimit }) {
  const remaining = teamLimit - registeredCount;
  const stats = [
    { label: "Total capacity", value: teamLimit, note: `${teamLimit * TEAM_SIZE} participant slots overall`, icon: Users, tone: "cyan" },
    { label: "Registered teams", value: registeredCount, note: "Confirmed entries on the trail", icon: CheckCircle2, tone: "emerald" },
    { label: "Slots remaining", value: remaining, note: "Still open for registration", icon: Sparkles, tone: "amber" },
  ];
  const toneMap = {
    cyan: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  };

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${toneMap[stat.tone]}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 font-[Space_Grotesk] text-4xl font-semibold tracking-tight text-slate-100">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
          </div>
        );
      })}
    </section>
  );
}

function HackTrailRegister() {
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [teamLimit, setTeamLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadTeams() {
      try {
        const [teams, settings] = await Promise.all([
          loadRegisteredTeams(),
          loadHackTrailSettings(),
        ]);
        if (mounted) {
          setRegisteredTeams(teams);
          setTeamLimit(settings.teamLimit);
        }
      } catch {
        setMessage("Saved registration data could not be loaded.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadTeams();
    return () => {
      mounted = false;
    };
  }, []);

  async function createTeam(team) {
    if (registeredTeams.length >= teamLimit) {
      setMessage("Registration is full. No more teams can join the trail.");
      return false;
    }
    const nextTeams = [...registeredTeams, team];
    await saveRegisteredTeams(nextTeams);
    setRegisteredTeams(nextTeams);
    setMessage(`${team.name} is on the trail. Registration confirmed.`);
    return true;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B14] px-4">
        <style>{FONTS}</style>
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0B1120] px-6 py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <span className="font-mono text-xs text-slate-400">Charting the trail...</span>
        </div>
      </div>
    );
  }

  const registrationFull = registeredTeams.length >= teamLimit;

  return (
    <div
      className="min-h-screen px-4 py-12 font-[Inter] text-slate-200 antialiased"
      style={{ background: "radial-gradient(ellipse 90% 60% at 50% -10%, #14213C 0%, #070B14 55%, #050810 100%)" }}
    >
      <style>{FONTS}</style>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Hero */}
        <header className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1120] p-8 shadow-2xl shadow-black/50 md:p-10">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
          >
            {[40, 90, 140, 190, 240].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} Q 150 ${y - 30} 300 ${y} T 600 ${y} T 900 ${y}`}
                fill="none"
                stroke={i % 2 === 0 ? "#22D3EE" : "#34D399"}
                strokeWidth="1"
              />
            ))}
          </svg>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] font-medium text-slate-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span>ICTSC HackTrail 2026</span>
            </div>
            <h1 className="mt-4 font-[Space_Grotesk] text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
              Team Registration
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
              Five checkpoints stand between your squad and the starting line. Fill in your candidate list —
              the trail validates itself as you go.
            </p>
          </div>
        </header>

        {message && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm font-medium text-emerald-100 shadow-lg shadow-emerald-400/10 backdrop-blur-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <Info className="h-5 w-5" />
            </div>
            <span>{message}</span>
          </div>
        )}

        {/* Trail body */}
        <div className="relative">
          <TrailSpine />
          <div className="space-y-8 md:pl-14">
            <div className="hidden md:block">
              <Checkpoint index="01" label="Trail markers" tone="cyan" />
            </div>
            <RulesSummary />

            <div className="hidden md:block">
              <Checkpoint index="02" label="Basecamp status" tone="emerald" />
            </div>
            <RegistrationOverview registeredCount={registeredTeams.length} teamLimit={teamLimit} />

            <div className="hidden md:block">
              <Checkpoint index={registrationFull ? "—" : "03"} label={registrationFull ? "Trail closed" : "Build your candidate list"} tone="amber" />
            </div>
            {registrationFull ? (
              <div className="rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-12 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                  <Flag className="h-8 w-8" />
                </div>
                <h2 className="mt-4 font-[Space_Grotesk] text-2xl font-semibold text-slate-100">
                  Registration fully allocated
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  All {teamLimit} available team registrations have been reserved.
                </p>
              </div>
            ) : (
              <HackTrailRegisterForm
                existingTeams={registeredTeams}
                submitLabel="Complete Registration"
                onSubmit={createTeam}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackTrailRegister;

