import { readFileSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import marketplace from "./data/marketplace.json" with { type: "json" };
import people from "./data/people.json" with { type: "json" };
import { stateSchema, transition, type State } from "./model";
import { findScopeQuestion } from "./scope-questions";
import { parseState, serializeState } from "./storage";

/**
 * EXP2 session state (fictional data): import it in Settings before each participant. It has no
 * applications, and the Northstar Health Build offer asks the two scope questions from the EXP2
 * form. Regenerate with: UPDATE_EXP2=1 npx vitest run src/features/prototype/exp2-state.test.ts
 * then run prettier on the written file; the comparison below ignores formatting.
 */
const file = new URL("../../../docs/tasks/exp2-stan.json", import.meta.url);
const questionIds = ["build-own-part", "build-users"];

function build(): State {
  const jobs = marketplace.jobs.map((job) =>
    job.id === marketplace.jobs[1].id ? { ...job, screeningQuestionIds: questionIds } : job,
  );
  return stateSchema.parse({
    version: 1,
    activePersonId: null,
    ...marketplace,
    jobs,
    people,
    applications: [],
    saved: [],
    drafts: [],
  });
}

describe("EXP2 session state", () => {
  it("is current, importable and enforces the scope questions end to end", () => {
    const expected = serializeState(build());
    if (process.env.UPDATE_EXP2) writeFileSync(file, expected);
    const raw = readFileSync(file, "utf8");
    expect(JSON.parse(raw)).toEqual(JSON.parse(expected));
    const state = parseState(raw);
    expect(state.applications).toHaveLength(0);
    const asked = state.jobs.filter((job) => job.screeningQuestionIds?.length);
    expect(asked).toHaveLength(1);
    expect(asked[0].category).toBe("build");
    expect(asked[0].screeningQuestionIds?.every((id) => findScopeQuestion(id))).toBe(true);

    const candidate = transition(state, { type: "select_person", id: "candidate-jan" });
    const input = {
      type: "submit" as const,
      jobId: asked[0].id,
      notes: "",
      generated: "",
      answer: "Pasuję do tej roli, bo prowadzę produkty od discovery do wdrożenia.",
      consent: true,
    };
    expect(() => transition(candidate, input)).toThrow("Odpowiedz");
    const done = transition(candidate, {
      ...input,
      scopeAnswers: asked[0].screeningQuestionIds!.map((questionId) => ({
        questionId,
        answer: "Odpowiedź uczestnika testu z wystarczającą ilością szczegółów.",
      })),
    });
    expect(done.applications.at(-1)?.scopeAnswers).toHaveLength(2);
  });
});
