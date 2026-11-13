import type { JobCategory } from "@/features/jobs/types";

/**
 * Ready-made questions about a candidate's own scope of work (IDEA3). An employer picks up to
 * MAX_SCOPE_QUESTIONS for a job; the candidate answers them in the application form. Questions are
 * keyed by the job category (Build / Apply / Lead). A submitted application stores the question
 * text it was asked, so later edits to this list do not rewrite submitted records.
 */
export type ScopeQuestion = { id: string; category: JobCategory; text: string };

export const MAX_SCOPE_QUESTIONS = 3;

const USERS = "Kto korzystał z tego rozwiązania i skąd wiesz, że działało?";

export const scopeQuestions: readonly ScopeQuestion[] = [
  {
    id: "build-own-part",
    category: "build",
    text: "Opisz swoją część projektu, który najbardziej przypomina tę pracę: co zrobiłeś sam, co robili inni i czego nie robiłeś.",
  },
  { id: "build-users", category: "build", text: USERS },
  {
    id: "build-tradeoff",
    category: "build",
    text: "Z czego w tym projekcie musiałeś zrezygnować albo co uprościć i dlaczego?",
  },
  {
    id: "apply-own-part",
    category: "apply",
    text: "Opisz jedno wdrożenie narzędzia z AI w pracy zespołu: jaka była Twoja rola i czego w nim nie robiłeś.",
  },
  { id: "apply-users", category: "apply", text: USERS },
  {
    id: "apply-change",
    category: "apply",
    text: "Co zmieniło się w pracy zespołu po wdrożeniu i jak to sprawdziłeś?",
  },
  {
    id: "lead-decision",
    category: "lead",
    text: "Opisz decyzję, którą podjąłeś w projekcie z AI: co wybrałeś, z czego zrezygnowałeś i dlaczego.",
  },
  {
    id: "lead-own-part",
    category: "lead",
    text: "Za co w tym projekcie odpowiadałeś osobiście, a za co inne osoby?",
  },
  { id: "lead-users", category: "lead", text: USERS },
];

export function scopeQuestionsFor(category: JobCategory) {
  return scopeQuestions.filter((question) => question.category === category);
}

export function findScopeQuestion(id: string) {
  return scopeQuestions.find((question) => question.id === id);
}
