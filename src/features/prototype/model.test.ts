import { describe, expect, it } from "vitest";
import { initialState, transition, stateSchema, type State } from "./model";
import { scopeQuestions, scopeQuestionsFor } from "./scope-questions";
const time = "2026-11-03T10:00:00.000Z";
function as(state: State, id: string) {
  return transition(state, { type: "select_person", id });
}
function submitted() {
  const s = as(initialState(), "candidate-anna");
  return transition(
    s,
    {
      type: "submit",
      jobId: s.jobs[0].id,
      notes: "Original notes",
      generated: "Generated copy",
      answer: "Approved application with sufficient context.",
      consent: true,
    },
    time,
    "application-anna",
  );
}
describe("coherent browser scenario", () => {
  it("requires approval and prevents duplicate applications", () => {
    const s = as(initialState(), "candidate-anna");
    const input = {
      type: "submit" as const,
      jobId: s.jobs[0].id,
      notes: "",
      generated: "",
      answer: "Approved application with sufficient context.",
      consent: false,
    };
    expect(() => transition(s, input, time)).toThrow("Zatwierdź");
    expect(() => transition(submitted(), { ...input, consent: true }, time)).toThrow("już wysłana");
    expect(s.applications).toHaveLength(1);
  });
  it("preserves approved sources while profile and notes evolve", () => {
    const s = submitted();
    const app = s.applications.at(-1)!;
    const changed = transition(s, {
      type: "profile",
      value: {
        name: "Updated Name",
        headline: "Updated Headline",
        bio: "Changed",
        location: "Wrocław",
      },
    });
    expect(changed.applications.at(-1)).toEqual(app);
    expect(app.candidateName).toBe("Anna Kowalska");
    expect(app.sourceNotes).toBe("Original notes");
    expect(app.generatedAnswer).toBe("Generated copy");
  });
  it("supports employer review through conversation and continuation without skipping stages", () => {
    let s = as(submitted(), "employer-brightlabs");
    expect(() =>
      transition(
        s,
        { type: "stage", applicationId: "application-anna", stage: "continued", note: "" },
        time,
      ),
    ).toThrow();
    for (const stage of [
      "reviewed",
      "interview_invited",
      "first_conversation_held",
      "continued",
      "hired",
    ] as const)
      s = transition(
        s,
        { type: "stage", applicationId: "application-anna", stage, note: "Employer note" },
        time,
      );
    expect(s.applications.at(-1)?.stage).toBe("hired");
    expect(s.applications.at(-1)?.events).toHaveLength(6);
  });
  it("rejects another employer’s stage writes and another candidate’s withdrawal", () => {
    expect(() =>
      transition(
        as(submitted(), "employer-northstar"),
        { type: "stage", applicationId: "application-anna", stage: "reviewed", note: "" },
        time,
      ),
    ).toThrow();
    expect(() =>
      transition(
        as(submitted(), "candidate-marek"),
        { type: "withdraw", applicationId: "application-anna" },
        time,
      ),
    ).toThrow();
  });
  it("makes withdrawal terminal and keeps drafts and saved jobs person-specific", () => {
    let s = submitted();
    s = transition(s, { type: "withdraw", applicationId: "application-anna" }, time);
    expect(() =>
      transition(
        as(s, "employer-brightlabs"),
        { type: "stage", applicationId: "application-anna", stage: "reviewed", note: "" },
        time,
      ),
    ).toThrow();
    s = transition(s, {
      type: "draft",
      jobId: s.jobs[1].id,
      notes: "Notes",
      generated: "Output",
      answer: "Edited",
    });
    s = transition(s, { type: "toggle_saved", jobId: s.jobs[1].id });
    expect(s.drafts[0].candidateId).toBe("candidate-anna");
    expect(s.saved[0].candidateId).toBe("candidate-anna");
  });
  it("validates broken references, duplicate submissions and invalid histories on import", () => {
    const s = submitted();
    s.applications.push({ ...s.applications.at(-1)!, id: "another-id" });
    expect(stateSchema.safeParse(s).success).toBe(false);
    const broken = submitted();
    broken.applications.at(-1)!.events.push({ stage: "hired", at: time, note: "" });
    broken.applications.at(-1)!.stage = "hired";
    expect(stateSchema.safeParse(broken).success).toBe(false);
    const unknown = initialState();
    unknown.jobs[0].companyId = "missing";
    expect(stateSchema.safeParse(unknown).success).toBe(false);
  });
  it("only publishes own-company jobs and keeps submitted job snapshots unchanged", () => {
    const state = as(submitted(), "employer-brightlabs");
    const updated = { ...state.jobs[0], title: "Updated public role" };
    const result = transition(state, { type: "publish", job: updated });
    expect(result.jobs[0].title).toBe("Updated public role");
    expect(result.applications.at(-1)?.jobTitle).toBe("AI Product Manager");
    expect(() =>
      transition(as(state, "employer-northstar"), { type: "publish", job: updated }),
    ).toThrow();
    expect(() =>
      transition(state, { type: "publish", job: { ...updated, salaryMin: 500, salaryMax: 1 } }),
    ).toThrow();
  });
});
describe("own-work card", () => {
  const raw = "Sam zbudowałem prototyp w jeden weekend. Używał go tylko jeden dział.";
  function withCard(quote: string | null) {
    const s = initialState();
    s.applications[0] = {
      ...s.applications[0],
      rawAnswer: raw,
      ownWorkCard: {
        contribution: { quote, note: "Granica wkładu" },
        project: { quote: null },
        outcome: { quote: "Używał go tylko jeden dział" },
        question: "Co robił prototyp?",
      },
    };
    return s;
  }
  it("accepts quotes that appear verbatim in the original answer, or an explicit gap", () => {
    expect(() =>
      stateSchema.parse(withCard("Sam zbudowałem prototyp w jeden weekend")),
    ).not.toThrow();
    expect(() => stateSchema.parse(withCard(null))).not.toThrow();
  });
  it("rejects quotes that are not in the original answer or have no original", () => {
    expect(() => stateSchema.parse(withCard("Zbudowałem prototyp razem z zespołem"))).toThrow();
    const noOriginal = withCard("Sam zbudowałem prototyp");
    delete noOriginal.applications[0].rawAnswer;
    expect(() => stateSchema.parse(noOriginal)).toThrow();
  });
  it("keeps older saves without a card valid", () => {
    expect(() => stateSchema.parse(initialState())).not.toThrow();
  });
});
describe("recruiter scope questions", () => {
  function withQuestions(ids: string[]) {
    const s = initialState();
    s.jobs[0].screeningQuestionIds = ids;
    return s;
  }
  const first = (s: State) => scopeQuestionsFor(s.jobs[0].category).map((q) => q.id);
  const long = "Odpowiedź z wystarczającą ilością szczegółów.";
  it("accepts up to three questions of the job category and rejects others", () => {
    const s = initialState();
    const ids = first(s);
    expect(() => stateSchema.parse(withQuestions(ids.slice(0, 2)))).not.toThrow();
    expect(() => stateSchema.parse(withQuestions(["build-users", "apply-users"]))).toThrow();
    expect(() => stateSchema.parse(withQuestions([ids[0], ids[0]]))).toThrow();
    expect(() => stateSchema.parse(withQuestions(["nie-ma-takiego"]))).toThrow();
    expect(scopeQuestions.some((q) => q.category !== s.jobs[0].category)).toBe(true);
    expect(() => stateSchema.parse(withQuestions([...ids, ...ids]))).toThrow();
  });
  it("requires an answer to every selected question and snapshots the question text", () => {
    const base = withQuestions(first(initialState()).slice(0, 2));
    const [a, b] = base.jobs[0].screeningQuestionIds!;
    const s = as(base, "candidate-anna");
    const submit = (scopeAnswers?: { questionId: string; answer: string }[]) =>
      transition(
        s,
        {
          type: "submit",
          jobId: s.jobs[0].id,
          notes: "",
          generated: "",
          answer: "Approved application with sufficient context.",
          scopeAnswers,
          consent: true,
        },
        time,
        "application-scope",
      );
    expect(() => submit()).toThrow("Odpowiedz");
    expect(() => submit([{ questionId: a, answer: long }])).toThrow("Odpowiedz");
    expect(() =>
      submit([
        { questionId: a, answer: long },
        { questionId: b, answer: "za krótko" },
      ]),
    ).toThrow("Odpowiedz");
    const done = submit([
      { questionId: b, answer: ` ${long} ` },
      { questionId: a, answer: long },
    ]);
    const saved = done.applications.at(-1)!;
    expect(saved.scopeAnswers?.map((x) => x.questionId)).toEqual([a, b]);
    expect(saved.scopeAnswers?.[0].question).toBe(scopeQuestions.find((q) => q.id === a)!.text);
    expect(saved.scopeAnswers?.[1].answer).toBe(long);
  });
  it("keeps jobs without questions unchanged and stores drafts with answers", () => {
    const s = as(initialState(), "candidate-anna");
    const done = transition(
      s,
      {
        type: "submit",
        jobId: s.jobs[0].id,
        notes: "",
        generated: "",
        answer: "Approved application with sufficient context.",
        consent: true,
      },
      time,
      "application-plain",
    );
    expect(done.applications.at(-1)!.scopeAnswers).toBeUndefined();
    const ids = first(s).slice(0, 1);
    const drafted = transition(as(withQuestions(ids), "candidate-anna"), {
      type: "draft",
      jobId: s.jobs[0].id,
      notes: "",
      generated: "",
      answer: "",
      scopeAnswers: [{ questionId: ids[0], answer: "szkic" }],
    });
    expect(drafted.drafts[0].scopeAnswers).toEqual([{ questionId: ids[0], answer: "szkic" }]);
  });
  it("lets only the employer publish a job with matching questions", () => {
    const s = as(initialState(), "employer-brightlabs");
    const job = { ...s.jobs[0] };
    const ids = scopeQuestionsFor(job.category).map((q) => q.id);
    const published = transition(s, {
      type: "publish",
      job: { ...job, screeningQuestionIds: ids },
    });
    expect(published.jobs.find((x) => x.id === job.id)?.screeningQuestionIds).toEqual(ids);
    expect(() =>
      transition(s, { type: "publish", job: { ...job, screeningQuestionIds: ["nie-ma"] } }),
    ).toThrow();
  });
});
