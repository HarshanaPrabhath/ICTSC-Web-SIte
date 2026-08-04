import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Crown,
  Save,
  XCircle,
} from "lucide-react";

const TEAM_SIZE = 5;
const REQUIRED_BATCHES = 3;
const MAX_PER_BATCH = 2;
const MIN_FEMALE = 2;
const REQUIRED_BATCH = "10";
const BATCH_BY_YEAR = {
  2025: "10",
  2024: "9",
  2023: "8",
  2022: "7",
};

function parseBatch(registrationNumber) {
  const match = (registrationNumber || "").trim().match(/^TG\/(\d{4})\/\d+$/i);
  return match ? BATCH_BY_YEAR[match[1]] || "" : "";
}

function buildMember(member = {}, index = 0) {
  return {
    id: member.id || `m-${index}`,
    name: member.name || "",
    registrationNumber: member.registrationNumber || "",
    gender: member.gender || "",
    batch: parseBatch(member.registrationNumber),
  };
}

function createEmptyTeamForm() {
  return {
    name: "",
    leaderId: "",
    members: Array.from({ length: TEAM_SIZE }, (_, i) =>
      buildMember({ id: `m-${i}` }, i)
    ),
  };
}

function getTeamChecklist(team) {
  const members = team.members.map(buildMember);
  const filled = members.filter((m) => m.name && m.registrationNumber && m.gender);
  const batches = members.map((m) => m.batch).filter(Boolean);
  const uniqueBatches = new Set(batches);
  const batchCounts = batches.reduce((acc, b) => {
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});
  const femaleCount = members.filter((m) => m.gender === "Female").length;
  const hasRequiredBatch = batches.includes(REQUIRED_BATCH);

  return [
    { key: "size", label: `${TEAM_SIZE} candidates complete`, passed: filled.length === TEAM_SIZE },
    { key: "batches", label: `${REQUIRED_BATCHES} distinct batches`, passed: uniqueBatches.size === REQUIRED_BATCHES },
    { key: "spread", label: `Max ${MAX_PER_BATCH} per batch`, passed: Object.values(batchCounts).every((c) => c <= MAX_PER_BATCH) },
    { key: "female", label: `${MIN_FEMALE}+ female candidates`, passed: femaleCount >= MIN_FEMALE },
    { key: "batch10", label: "Batch 10 represented", passed: hasRequiredBatch },
  ];
}

function validateTeam(team, existingTeams = [], editingTeamId = "") {
  const errors = [];
  const name = (team.name || "").trim();
  const members = team.members.map(buildMember);

  if (!name) errors.push("Team name is required.");
  if (
    name &&
    existingTeams.some(
      (t) => t.id !== editingTeamId && t.name.trim().toLowerCase() === name.toLowerCase()
    )
  ) {
    errors.push("Team name is already taken.");
  }

  members.forEach((m, i) => {
    if (!m.name) errors.push(`Candidate ${i + 1} name is required.`);
    if (!m.registrationNumber) errors.push(`Candidate ${i + 1} registration number is required.`);
    if (!m.gender) errors.push(`Candidate ${i + 1} gender is required.`);
  });

  const checklist = getTeamChecklist(team);
  checklist.forEach((item) => {
    if (!item.passed && item.key !== "size") errors.push(`Team rule not met: ${item.label}.`);
  });

  return { errors, team: { ...team, members } };
}

function TeamChecklist({ team }) {
  const checklist = getTeamChecklist(team);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Live trail check
          </p>
        </div>
        <span className="font-mono text-[10px] text-slate-600">auto-verified</span>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {checklist.map((item) => (
          <div
            key={item.key}
            className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-all duration-200 ${
              item.passed
                ? "border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200"
                : "border-white/[0.06] bg-white/[0.015] text-slate-500"
            }`}
          >
            {item.passed ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-slate-600" />
            )}
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HackTrailRegisterForm({
  initialTeam = null,
  existingTeams = [],
  editingTeamId = "",
  submitLabel = "Register Team",
  onSubmit,
  onCancel,
}) {
  const resolvedInitialTeam = useMemo(
    () => initialTeam || createEmptyTeamForm(),
    [initialTeam]
  );
  const [team, setTeam] = useState(resolvedInitialTeam);
  const [errors, setErrors] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const previewTeam = useMemo(
    () => ({ ...team, members: team.members.map(buildMember) }),
    [team]
  );


  function groupErrors(errorList) {
    const unique = [...new Set(errorList)];
    return [
      { title: "Team details", items: unique.filter((e) => e.startsWith("Team name")) },
      { title: "Candidate details", items: unique.filter((e) => e.startsWith("Candidate ")) },
      {
        title: "Trail rules",
        items: unique.filter((e) => !e.startsWith("Team name") && !e.startsWith("Candidate ")),
      },
    ].filter((g) => g.items.length > 0);
  }

  function updateTeamField(key, value) {
    setTeam((cur) => ({ ...cur, [key]: value }));
    setErrors([]);
  }

  function updateMember(index, key, value) {
    setTeam((cur) => ({
      ...cur,
      members: cur.members.map((m, i) => (i === index ? { ...m, [key]: value } : m)),
    }));
    setErrors([]);
  }

  async function submitTeam(event) {
    event.preventDefault();
    const result = validateTeam(team, existingTeams, editingTeamId);
    if (result.errors.length) {
      setErrors([...new Set(result.errors)]);
      return;
    }
    const saved = await onSubmit({
      ...result.team,
      id: editingTeamId || `team-${Date.now()}`,
      name: result.team.name.trim(),
      leaderId: result.team.leaderId || result.team.members[0].id,
      createdAt: resolvedInitialTeam.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    if (saved === false) return;
    setErrors([]);
    setShowSuccessModal(true);
    setTeam(createEmptyTeamForm());
  }

  return (
    <form
      className="space-y-8 rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8"
      onSubmit={submitTeam}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Team name
          </label>
          <input
            value={team.name}
            onChange={(e) => updateTeamField("name", e.target.value)}
            placeholder="e.g. Nightwatch"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm font-medium text-slate-100 placeholder:text-slate-600 transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/[0.04] focus:outline-none focus:ring-4 focus:ring-cyan-400/10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Team leader
          </label>
          <div className="relative">
            <select
              value={team.leaderId}
              onChange={(e) => updateTeamField("leaderId", e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm font-medium text-slate-100 transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/[0.04] focus:outline-none focus:ring-4 focus:ring-cyan-400/10"
            >
              {previewTeam.members.map((m, i) => (
                <option className="bg-[#0B1120]" key={m.id} value={m.id}>
                  {m.name || `Candidate ${i + 1}`}
                </option>
              ))}
            </select>
            <Crown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Candidate list · {team.members.length} of {TEAM_SIZE} slots
        </p>

        <div className="grid gap-4">
          {team.members.map((member, index) => {
            const normalized = buildMember(member, index);
            const isLeader =
              (team.leaderId && team.leaderId === member.id) || (!team.leaderId && index === 0);

            return (
              <div
                key={member.id}
                className={`group relative rounded-2xl border p-5 transition-all duration-200 ${
                  isLeader
                    ? "border-cyan-400/25 bg-cyan-400/[0.04]"
                    : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]"
                }`}
              >
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0B1120] font-mono text-[11px] font-semibold text-slate-400">
                      {index + 1}
                    </span>
                    {isLeader && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-0.5 text-[11px] font-semibold text-amber-300">
                        <Crown className="h-3 w-3" />
                        Leader
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1.5">
                    {normalized.batch && (
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-300">
                        Batch {normalized.batch}
                      </span>
                    )}
                    {normalized.gender && (
                      <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                        {normalized.gender}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    value={member.name}
                    onChange={(e) => updateMember(index, "name", e.target.value)}
                    placeholder="Candidate full name"
                    className="w-full rounded-lg border border-white/[0.08] bg-[#0B1120]/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 transition-all duration-200 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/10"
                  />
                  <input
                    value={member.registrationNumber}
                    onChange={(e) => updateMember(index, "registrationNumber", e.target.value)}
                    placeholder="Registration No (e.g. TG/2025/0001)"
                    className="w-full rounded-lg border border-white/[0.08] bg-[#0B1120]/60 px-3.5 py-2.5 font-mono text-sm text-slate-100 placeholder:text-slate-600 placeholder:font-sans transition-all duration-200 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/10"
                  />
                  <select
                    value={member.gender}
                    onChange={(e) => updateMember(index, "gender", e.target.value)}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#0B1120]/60 px-3.5 py-2.5 text-sm text-slate-100 transition-all duration-200 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option className="bg-[#0B1120]" value="">Select gender</option>
                    <option className="bg-[#0B1120]" value="Female">Female</option>
                    <option className="bg-[#0B1120]" value="Male">Male</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TeamChecklist team={previewTeam} />

      {errors.length > 0 && (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] p-5 text-sm text-rose-100">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-rose-200">This candidate list can't hit the trail yet</p>
              <p className="mt-1 text-xs text-rose-300/80">
                Fix the flagged checkpoints below, then submit again.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {groupErrors(errors).map((group) => (
              <div key={group.title} className="rounded-xl border border-rose-400/10 bg-[#0B1120]/50 p-4">
                <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-rose-300">
                  {group.title}
                </p>
                <div className="space-y-2">
                  {group.items.map((error) => (
                    <div key={error} className="flex items-start gap-2 text-xs text-rose-200/90">
                      <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-4 text-sm font-semibold text-[#04121a] shadow-lg shadow-emerald-400/20 transition-all duration-200 hover:shadow-emerald-400/30 active:scale-[0.99]"
        >
          <Save className="h-4 w-4" />
          <span>{submitLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-4 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.05] active:scale-[0.99]"
          >
            Cancel
          </button>
        )}
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#020617]/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-emerald-400/20 bg-[#0B1120]/95 p-6 shadow-2xl shadow-emerald-400/10">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-emerald-200">Team created successfully</p>
                <p className="mt-1 text-sm text-slate-300">
                  Your team has been registered.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-white/[0.06]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default HackTrailRegisterForm;




