import { db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export const HACKTRAIL_STORAGE_KEY = "hacktrail-registered-teams";
export const HACKTRAIL_SETTINGS_KEY = "hacktrail-registration-settings";
export const DEFAULT_TEAM_LIMIT = 3;
export const TEAM_LIMIT = DEFAULT_TEAM_LIMIT;
export const TEAM_SIZE = 5;
export const REQUIRED_BATCH = 10;
export const BATCH_BY_YEAR = {
  2025: 10,
  2024: 9,
  2023: 8,
  2022: 7,
};
const HACKTRAIL_TEAMS_COLLECTION = "hacktrailTeams";
const HACKTRAIL_SETTINGS_COLLECTION = "hacktrailSettings";
const HACKTRAIL_SETTINGS_DOC = "main";

export function deriveBatch(registrationNumber) {
  const match = registrationNumber.trim().match(/^TG\/(\d{4})\/\d+$/i);
  return match ? BATCH_BY_YEAR[match[1]] || null : null;
}

export function normalizeGender(gender) {
  const value = gender.trim().toLowerCase();

  if (["female", "f", "girl"].includes(value)) return "Female";
  if (["male", "m", "boy"].includes(value)) return "Male";

  return "";
}

function createEmptyMember(index) {
  return {
    id: `member-${index + 1}`,
    name: "",
    registrationNumber: "",
    gender: "",
    batch: null,
  };
}

export function createEmptyTeamForm() {
  return {
    id: "",
    name: "",
    leaderId: "",
    members: Array.from({ length: TEAM_SIZE }, (_, index) => createEmptyMember(index)),
  };
}

export function normalizeRegistrationNumber(registrationNumber) {
  return registrationNumber.trim().toUpperCase();
}

export function buildMember(member, index) {
  const registrationNumber = normalizeRegistrationNumber(member.registrationNumber);

  return {
    id: member.id || `member-${index + 1}`,
    name: member.name.trim(),
    registrationNumber,
    gender: normalizeGender(member.gender),
    batch: deriveBatch(registrationNumber),
  };
}

export function getRuleStatus(team) {
  const members = team.members.filter((member) => member.name || member.registrationNumber || member.gender);
  const completeMembers = team.members.filter(
    (member) => member.name && member.registrationNumber && member.gender
  );
  const batchCounts = completeMembers.reduce((counts, member) => {
    counts[member.batch] = (counts[member.batch] || 0) + 1;
    return counts;
  }, {});
  const femaleCount = completeMembers.filter((member) => member.gender === "Female").length;

  return {
    size: completeMembers.length === TEAM_SIZE && members.length === TEAM_SIZE,
    batchCount: new Set(completeMembers.map((member) => member.batch)).size === 3,
    maxBatch: Object.values(batchCounts).every((count) => count <= 2),
    female: femaleCount >= 2,
    batch10: completeMembers.some((member) => member.batch === REQUIRED_BATCH),
  };
}

export function getTeamChecklist(team) {
  const rules = getRuleStatus(team);
  const completeMembers = team.members.filter(
    (member) => member.name && member.registrationNumber && member.gender
  );

  return [
    { key: "size", passed: rules.size, label: `Exactly 5 candidates (${completeMembers.length}/${TEAM_SIZE})` },
    { key: "batchCount", passed: rules.batchCount, label: "Exactly 3 different batches" },
    { key: "maxBatch", passed: rules.maxBatch, label: "No more than 2 from one batch" },
    { key: "female", passed: rules.female, label: "At least 2 female candidates" },
    { key: "batch10", passed: rules.batch10, label: "At least 1 Batch 10 candidate" },
  ];
}

export function isTeamReady(team) {
  return getTeamChecklist(team).every((rule) => rule.passed);
}

export function validateTeam(team, existingTeams = [], editingTeamId = "") {
  const errors = [];
  const seenRegistrations = new Set();
  const usedRegistrations = new Set(
    existingTeams
      .filter((existingTeam) => existingTeam.id !== editingTeamId)
      .flatMap((existingTeam) => existingTeam.members.map((member) => member.registrationNumber.toUpperCase()))
  );
  const members = team.members.map(buildMember);

  if (!team.name.trim()) {
    errors.push("Team name is required.");
  }

  members.forEach((member, index) => {
    const label = `Candidate ${index + 1}`;

    if (!member.name) {
      errors.push(`${label}: name is required.`);
    }

    if (!/^TG\/\d{4}\/\d+$/i.test(member.registrationNumber)) {
      errors.push(`${label}: registration number must use TG/2025/0001 format.`);
    }

    if (!member.gender) {
      errors.push(`${label}: gender must be Male or Female.`);
    }

    if (member.registrationNumber) {
      const normalized = member.registrationNumber.toUpperCase();

      if (seenRegistrations.has(normalized)) {
        errors.push(`${label}: duplicate registration number inside this team.`);
      }

      if (usedRegistrations.has(normalized)) {
        errors.push(`${label}: registration number is already used by another team.`);
      }

      seenRegistrations.add(normalized);
    }
  });

  const normalizedTeam = {
    ...team,
    members,
  };

  getTeamChecklist(normalizedTeam).forEach((rule) => {
    if (!rule.passed) {
      errors.push(rule.label);
    }
  });

  return {
    errors,
    team: normalizedTeam,
  };
}

export async function loadRegisteredTeams() {
  const teamsQuery = query(
    collection(db, HACKTRAIL_TEAMS_COLLECTION),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(teamsQuery);

  return snapshot.docs.map((teamDoc) => ({
    id: teamDoc.id,
    ...teamDoc.data(),
  }));
}

export async function saveRegisteredTeams(teams) {
  const batch = writeBatch(db);

  teams.forEach((team) => {
    const teamId = team.id || `team-${Date.now()}`;
    batch.set(doc(db, HACKTRAIL_TEAMS_COLLECTION, teamId), {
      ...team,
      id: teamId,
    });
  });

  await batch.commit();
}

export async function saveRegisteredTeam(team) {
  const teamId = team.id || `team-${Date.now()}`;
  await setDoc(doc(db, HACKTRAIL_TEAMS_COLLECTION, teamId), {
    ...team,
    id: teamId,
  });

  return {
    ...team,
    id: teamId,
  };
}

export async function deleteRegisteredTeam(teamId) {
  await deleteDoc(doc(db, HACKTRAIL_TEAMS_COLLECTION, teamId));
}

export async function loadHackTrailSettings() {
  const settingsSnapshot = await getDoc(
    doc(db, HACKTRAIL_SETTINGS_COLLECTION, HACKTRAIL_SETTINGS_DOC)
  );
  const savedSettings = settingsSnapshot.exists() ? settingsSnapshot.data() : null;

  return {
    teamLimit: Math.max(1, Number(savedSettings?.teamLimit) || DEFAULT_TEAM_LIMIT),
  };
}

export async function saveHackTrailSettings(settings) {
  await setDoc(doc(db, HACKTRAIL_SETTINGS_COLLECTION, HACKTRAIL_SETTINGS_DOC), {
    teamLimit: Math.max(1, Number(settings.teamLimit) || DEFAULT_TEAM_LIMIT),
  });
}
