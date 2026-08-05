import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Crown,
  Download,
  Flag,
  Info,
  MapPin,
  Pencil,
  RefreshCw,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import HackTrailRegisterForm from "../components/HackTrailRegisterForm";
import {
  TEAM_SIZE,
  deleteRegisteredTeam,
  deriveBatch,
  loadHackTrailSettings,
  loadRegisteredTeams,
  saveHackTrailSettings,
  saveRegisteredTeam,
} from "./hackTrailRegistrationData";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
`;

function formatDate(value) {
  if (!value) return "Not recorded";

  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "Not recorded";
  }
}

function getBatch(member) {
  const derivedBatch = deriveBatch(member.registrationNumber || "");

  return derivedBatch || member.batch || "";
}

function getTeamMeta(team) {
  const members = team.members || [];
  const completeMembers = members.filter(
    (member) => member.name && member.registrationNumber && member.gender,
  );
  const femaleCount = members.filter(
    (member) => member.gender === "Female",
  ).length;
  const batches = [...new Set(members.map(getBatch).filter(Boolean))];
  const captain =
    members.find((member) => member.id === team.leaderId) || members[0] || null;

  return {
    batches,
    captain,
    completeMembers: completeMembers.length,
    femaleCount,
  };
}

function escapeCsvValue(value) {
  const text = value == null ? "" : String(value);

  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function buildTeamsCsv(teams) {
  const headers = [
    "team_id",
    "team_name",
    "registered_at",
    "leader_name",
    "member_number",
    "member_id",
    "member_name",
    "registration_number",
    "gender",
    "batch",
    "is_leader",
  ];

  const rows = teams.flatMap((team) => {
    const members = team.members || [];
    const leader =
      members.find((member) => member.id === team.leaderId) || members[0] || {};

    return members.map((member, memberIndex) => {
      const isLeader =
        (team.leaderId && team.leaderId === member.id) ||
        (!team.leaderId && memberIndex === 0);

      return [
        team.id,
        team.name,
        team.createdAt,
        leader.name,
        memberIndex + 1,
        member.id,
        member.name,
        member.registrationNumber,
        member.gender,
        getBatch(member),
        isLeader ? "Yes" : "No",
      ];
    });
  });

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\r\n");
}

function downloadCsv(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function StatCard({ label, value, note, icon, tone = "cyan" }) {
  const IconComponent = icon;
  const toneMap = {
    cyan: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    rose: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl border ${toneMap[tone]}`}
        >
          <IconComponent className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 font-[Space_Grotesk] text-4xl font-semibold tracking-tight text-slate-100">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function TeamCard({ team, index, onEdit, onDelete }) {
  const meta = getTeamMeta(team);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="border-b border-white/[0.06] p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
              Team {String(index + 1).padStart(2, "0")}
            </div>
            <h2 className="font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-slate-100">
              {team.name || "Unnamed team"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Registered {formatDate(team.createdAt)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEdit(team)}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/[0.15] active:scale-[0.99]"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit team
              </button>
              <button
                type="button"
                onClick={() => onDelete(team)}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3.5 py-2 text-xs font-semibold text-rose-300 transition-all duration-200 hover:bg-rose-400/[0.15] active:scale-[0.99]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <p className="font-mono text-lg font-semibold text-slate-100">
                {meta.completeMembers}/{TEAM_SIZE}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Candidates
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-3">
              <p className="font-mono text-lg font-semibold text-emerald-200">
                {meta.femaleCount}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Female
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] px-4 py-3">
              <p className="font-mono text-lg font-semibold text-amber-200">
                {meta.batches.length}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Batches
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {meta.captain && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Crown className="h-3.5 w-3.5" />
              Leader: {meta.captain.name || "Candidate 1"}
            </span>
          )}
          {meta.batches.map((batch) => (
            <span
              key={batch}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-semibold text-slate-300"
            >
              <MapPin className="h-3.5 w-3.5 text-cyan-300" />
              Batch {batch}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-5 md:p-6">
        {(team.members || []).map((member, memberIndex) => {
          const isCaptain =
            (team.leaderId && team.leaderId === member.id) ||
            (!team.leaderId && memberIndex === 0);

          return (
            <div
              key={member.id || memberIndex}
              className={`rounded-2xl border p-4 ${
                isCaptain
                  ? "border-cyan-400/25 bg-cyan-400/[0.04]"
                  : "border-white/[0.06] bg-white/[0.015]"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0B1120] font-mono text-[11px] font-semibold text-slate-400">
                  {memberIndex + 1}
                </span>
                {isCaptain && <Crown className="h-4 w-4 text-amber-400" />}
              </div>
              <p className="truncate text-sm font-semibold text-slate-100">
                {member.name || "No name"}
              </p>
              <p className="mt-1 truncate font-mono text-[11px] text-slate-500">
                {member.registrationNumber || "No reg no"}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {getBatch(member) && (
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300">
                    B{getBatch(member)}
                  </span>
                )}
                {member.gender && (
                  <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    {member.gender}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function HackTrailDashboard() {
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [teamLimit, setTeamLimit] = useState(3);
  const [teamLimitDraft, setTeamLimitDraft] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [message, setMessage] = useState("");

  const totalMembers = useMemo(
    () =>
      registeredTeams.reduce(
        (count, team) =>
          count + (team.members || []).filter((member) => member.name).length,
        0,
      ),
    [registeredTeams],
  );
  const slotsRemaining = Math.max(teamLimit - registeredTeams.length, 0);
  const isFull = registeredTeams.length >= teamLimit;

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [teams, settings] = await Promise.all([
        loadRegisteredTeams(),
        loadHackTrailSettings(),
      ]);
      setRegisteredTeams(teams);
      setTeamLimit(settings.teamLimit);
      setTeamLimitDraft(settings.teamLimit);
      setMessage("");
    } catch {
      setMessage("Admin data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function updateTeamLimit(event) {
    event.preventDefault();

    const nextLimit = Math.max(1, Number(teamLimitDraft) || 1);

    setSaving(true);
    try {
      await saveHackTrailSettings({ teamLimit: nextLimit });
      setTeamLimit(nextLimit);
      setTeamLimitDraft(nextLimit);
      setMessage(`Team count limit updated to ${nextLimit}.`);
    } catch {
      setMessage("Team count limit could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  async function updateRegisteredTeam(team) {
    try {
      const savedTeam = await saveRegisteredTeam(team);
      setRegisteredTeams((currentTeams) =>
        currentTeams.map((currentTeam) =>
          currentTeam.id === savedTeam.id ? savedTeam : currentTeam,
        ),
      );
      setEditingTeam(null);
      setMessage(`${savedTeam.name} was updated successfully.`);
      return true;
    } catch {
      setMessage("Registered team could not be updated.");
      return false;
    }
  }

  async function removeRegisteredTeam(team) {
    const confirmed = window.confirm(
      `Delete ${team.name || "this team"} from HackTrail registrations?`,
    );

    if (!confirmed) return;

    if (!team.id) {
      console.error("removeRegisteredTeam: team has no id", team);
      setMessage("This team has no ID and can't be deleted — try refreshing.");
      return;
    }

    try {
      await deleteRegisteredTeam(team.id);
      setRegisteredTeams((currentTeams) =>
        currentTeams.filter((currentTeam) => currentTeam.id !== team.id),
      );
      if (editingTeam?.id === team.id) setEditingTeam(null);
      setMessage(`${team.name || "Team"} was deleted from registrations.`);
    } catch (error) {
      console.error("removeRegisteredTeam failed:", error);
      setMessage(`Registered team could not be deleted: ${error.message}`);
    }
  }

  function backupTeamsToCsv() {
    if (registeredTeams.length === 0) {
      setMessage("No registered teams available to back up.");
      return;
    }

    const dateStamp = new Date().toISOString().slice(0, 10);

    downloadCsv(
      `hacktrail-teams-backup-${dateStamp}.csv`,
      buildTeamsCsv(registeredTeams),
    );
    setMessage(`Backup CSV created for ${registeredTeams.length} teams.`);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B14] px-4">
        <style>{FONTS}</style>
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0B1120] px-6 py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <span className="font-mono text-xs text-slate-400">
            Loading admin Dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12 font-[Inter] text-slate-200 antialiased"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -10%, #14213C 0%, #070B14 55%, #050810 100%)",
      }}
    >
      <style>{FONTS}</style>
      <div className="mx-auto max-w-6xl space-y-8">
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
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] font-medium text-slate-300 backdrop-blur-md">
                <Settings2 className="h-3.5 w-3.5 text-cyan-300" />
                <span>ICTSC HackTrail Admin</span>
              </div>
              <h1 className="mt-4 font-[Space_Grotesk] text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
                Registration Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                Monitor registered teams, candidate details, capacity, and the
                team count limit from one basecamp.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={backupTeamsToCsv}
                disabled={registeredTeams.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-400/[0.15] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Backup CSV
              </button>
              <button
                type="button"
                onClick={loadDashboardData}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-white/[0.07] active:scale-[0.99]"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </header>

        {message && (
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4 text-sm font-medium text-slate-200 backdrop-blur-xl">
            <Info className="h-5 w-5 shrink-0 text-cyan-300" />
            <span>{message}</span>
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard
            label="Team limit"
            value={teamLimit}
            note={`${teamLimit * TEAM_SIZE} participant slots maximum`}
            icon={Settings2}
          />
          <StatCard
            label="Registered"
            value={registeredTeams.length}
            note="Teams currently confirmed"
            icon={CheckCircle2}
            tone="emerald"
          />
          <StatCard
            label="Remaining"
            value={slotsRemaining}
            note={
              isFull
                ? "Registration is currently full"
                : "Teams can still register"
            }
            icon={isFull ? AlertCircle : Sparkles}
            tone={isFull ? "rose" : "amber"}
          />
          <StatCard
            label="Candidates"
            value={totalMembers}
            note="Participants listed across teams"
            icon={Users}
            tone="cyan"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <form
            onSubmit={updateTeamLimit}
            className="rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-white/[0.06] pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Settings2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-[Space_Grotesk] text-lg font-semibold tracking-tight text-slate-100">
                  Team count control
                </h2>
                <p className="text-xs text-slate-500">
                  Change how many teams can register
                </p>
              </div>
            </div>

            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Maximum teams
            </label>
            <input
              type="number"
              min="1"
              value={teamLimitDraft}
              onChange={(event) => setTeamLimitDraft(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 font-mono text-sm font-medium text-slate-100 transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/[0.04] focus:outline-none focus:ring-4 focus:ring-cyan-400/10"
            />
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Current scenario: {registeredTeams.length} of {teamLimit} team
              slots are used.
              {Number(teamLimitDraft) < registeredTeams.length
                ? " Saving below the registered count will mark registration as full, but existing teams stay visible."
                : ""}
            </p>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-4 text-sm font-semibold text-[#04121a] shadow-lg shadow-emerald-400/20 transition-all duration-200 hover:shadow-emerald-400/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save team count"}
            </button>
          </form>

          <div className="rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-white/[0.06] pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <Flag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-[Space_Grotesk] text-lg font-semibold tracking-tight text-slate-100">
                  Registration scenario
                </h2>
                <p className="text-xs text-slate-500">
                  Live status based on team limit and submitted teams
                </p>
              </div>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className={`h-full rounded-full ${isFull ? "bg-amber-400" : "bg-gradient-to-r from-emerald-400 to-cyan-400"}`}
                style={{
                  width: `${Math.min((registeredTeams.length / teamLimit) * 100, 100)}%`,
                }}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>
                <p
                  className={`mt-2 text-sm font-semibold ${isFull ? "text-amber-300" : "text-emerald-300"}`}
                >
                  {isFull
                    ? "Trail registration is full"
                    : "Trail registration is open"}
                </p>
              </div>
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Capacity
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {registeredTeams.length}/{teamLimit} teams
                </p>
              </div>
            </div>
          </div>
        </section>

        {editingTeam && (
          <section className="space-y-4 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Edit registered team
                </p>
                <h2 className="mt-1 font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-slate-100">
                  Updating {editingTeam.name || "selected team"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingTeam(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.05] active:scale-[0.99]"
              >
                <X className="h-4 w-4" />
                Close editor
              </button>
            </div>

            <HackTrailRegisterForm
              key={editingTeam.id}
              initialTeam={editingTeam}
              existingTeams={registeredTeams}
              editingTeamId={editingTeam.id}
              submitLabel="Update Team"
              onSubmit={updateRegisteredTeam}
              onCancel={() => setEditingTeam(null)}
            />
          </section>
        )}

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Registered teams
              </p>
              <h2 className="mt-1 font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-slate-100">
                Team candidate list
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={backupTeamsToCsv}
                disabled={registeredTeams.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-400/[0.15] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                Backup CSV
              </button>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 font-mono text-[11px] font-semibold text-slate-300">
                {registeredTeams.length} teams
              </span>
            </div>
          </div>

          {registeredTeams.length > 0 ? (
            <div className="space-y-5">
              {registeredTeams.map((team, index) => (
                <TeamCard
                  key={team.id || team.name || index}
                  team={team}
                  index={index}
                  onEdit={setEditingTeam}
                  onDelete={removeRegisteredTeam}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/[0.06] bg-[#0B1120]/70 p-12 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="mt-4 font-[Space_Grotesk] text-2xl font-semibold text-slate-100">
                No teams registered yet
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Submitted HackTrail teams will appear here for admins.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HackTrailDashboard;
