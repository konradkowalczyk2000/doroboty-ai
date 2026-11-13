import { readFileSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import marketplace from "./data/marketplace.json" with { type: "json" };
import people from "./data/people.json" with { type: "json" };
import fixtures from "../../../docs/tasks/exp1-przykladowe-cytaty.json" with { type: "json" };
import { stateSchema, type State } from "./model";
import { parseState, serializeState } from "./storage";

/**
 * EXP1 session states (fictional data): import them in Settings. Each file shows the
 * own-work card for one set of six applications and the current view for the other.
 * Regenerate with: UPDATE_EXP1=1 npx vitest run src/features/prototype/exp1-state.test.ts
 * then run prettier on the written files; the comparison below ignores formatting.
 */
const names: Record<string, string> = {
  "1.1": "Piotr Lis",
  "1.2": "Ewa Mazur",
  "1.3": "Jan Dąbrowski",
  "1.4": "Agnieszka Krawczyk",
  "1.5": "Tomasz Wrona",
  "1.6": "Natalia Sobczak",
  "2.1": "Michał Pawlak",
  "2.2": "Joanna Baran",
  "2.3": "Krzysztof Zając",
  "2.4": "Barbara Michalska",
  "2.5": "Adam Kubiak",
  "2.6": "Magdalena Rutkowska",
};
const files = { "exp1-stan-1.json": 2, "exp1-stan-2.json": 1 } as const;
const folder = new URL("../../../docs/tasks/", import.meta.url);

function build(cardSet: 1 | 2): State {
  const jobs = marketplace.jobs;
  const jobBySet = { 1: jobs[0], 2: jobs[1] };
  const candidates = fixtures.map((f) => {
    const key = f.id.replace("EXP1-", "");
    return {
      id: `exp1-${key.replace(".", "-")}`,
      role: "candidate" as const,
      name: names[key],
      headline: "Kandydat do testu EXP1 (dane fikcyjne)",
      bio: "",
      location: "Warszawa",
      cv: `${names[key]}: CV na potrzeby testu EXP1 (dane fikcyjne). Doświadczenie opisano w aplikacji.`,
      exampleScore: f.matchScore,
      exampleSummary: "Przykładowe podsumowanie scenariusza (dane fikcyjne).",
    };
  });
  const applications = fixtures.map((f, index) => {
    const candidate = candidates[index];
    const job = jobBySet[f.zestaw as 1 | 2];
    const withCard = f.zestaw === cardSet;
    const point = (p: { quote: string | null; note: string }) => ({
      quote: p.quote,
      ...(p.note ? { note: p.note } : {}),
    });
    return {
      id: `exp1-app-${candidate.id.slice(5)}`,
      candidateId: candidate.id,
      jobId: job.id,
      companyId: job.companyId,
      jobTitle: job.title,
      candidateName: candidate.name,
      cv: candidate.cv,
      answer: f.assistantAnswer,
      sourceNotes: "",
      generatedAnswer: "",
      ...(withCard
        ? {
            rawAnswer: f.rawAnswer,
            ownWorkCard: {
              contribution: point(f.card.wklad),
              project: point(f.card.projekt),
              outcome: point(f.card.efekt),
              question: f.card.question,
            },
          }
        : {}),
      score: f.matchScore,
      summary: candidate.exampleSummary,
      stage: "submitted" as const,
      events: [{ stage: "submitted" as const, at: "2026-11-09T09:00:00.000Z", note: "" }],
    };
  });
  return stateSchema.parse({
    version: 1,
    activePersonId: null,
    ...marketplace,
    people: [...people, ...candidates],
    applications,
    saved: [],
    drafts: [],
  });
}

describe("EXP1 session states", () => {
  for (const [name, cardSet] of Object.entries(files)) {
    it(`${name} is current, importable and counterbalanced`, () => {
      const expected = serializeState(build(cardSet));
      if (process.env.UPDATE_EXP1) writeFileSync(new URL(name, folder), expected);
      const raw = readFileSync(new URL(name, folder), "utf8");
      expect(JSON.parse(raw)).toEqual(JSON.parse(expected));
      const state = parseState(raw);
      expect(state.applications).toHaveLength(12);
      const withCard = state.applications.filter((a) => a.ownWorkCard);
      expect(withCard).toHaveLength(6);
      expect(new Set(withCard.map((a) => a.jobId)).size).toBe(1);
      expect(state.applications.filter((a) => !a.ownWorkCard && a.rawAnswer)).toHaveLength(0);
    });
  }
});
