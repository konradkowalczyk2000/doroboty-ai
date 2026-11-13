import { Badge } from "@/components/ui/badge";
import type { OwnWorkCard as Card } from "./model";

const points = [
  { key: "contribution", label: "Własny wkład" },
  { key: "project", label: "Projekt" },
  { key: "outcome", label: "Efekt" },
] as const;

/** Employer-only summary of what the candidate wrote about their own work, quoted from the original text. */
export function OwnWorkCard({ card }: { card: Card }) {
  return (
    <section className="own-work-card" aria-labelledby="own-work-heading">
      <h3 id="own-work-heading">Co kandydat zrobił sam</h3>
      <p className="record-caption">
        Cytaty pochodzą z oryginalnego tekstu kandydata, sprzed asystenta. Cały tekst jest w
        zakładce „Oryginał”.
      </p>
      <dl className="own-work-points">
        {points.map(({ key, label }) => {
          const point = card[key];
          return (
            <div key={key} className="own-work-point">
              <dt>{label}</dt>
              <dd>
                {point.quote ? (
                  <blockquote>{point.quote}</blockquote>
                ) : (
                  <Badge variant="secondary">Brak w tekście</Badge>
                )}
                {point.note ? <span className="own-work-note">{point.note}</span> : null}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="own-work-question">
        <strong>Warto zapytać:</strong> {card.question}
      </p>
    </section>
  );
}

/** Compact list variant: the same three quotes without the question or notes. */
export function OwnWorkCardCompact({ card }: { card: Card }) {
  return (
    <dl className="own-work-compact" aria-label="Co kandydat zrobił sam">
      {points.map(({ key, label }) => {
        const quote = card[key].quote;
        return (
          <div key={key}>
            <dt>{label}</dt>
            <dd>
              {quote ? (
                <span className="own-work-quote">{quote}</span>
              ) : (
                <span className="own-work-missing">brak w tekście</span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
