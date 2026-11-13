import { buttonVariants } from "@/components/ui/button";

/**
 * Recovery screen shown when rendering fails. It receives no error details on purpose:
 * technical messages are not shown and private free text is never rendered or logged.
 */
export function ErrorScreen({
  hasSave,
  onReload,
  onDownload,
}: {
  hasSave: boolean;
  onReload: () => void;
  onDownload: () => void;
}) {
  return (
    <main className="prototype-section mx-auto px-[18px] md:px-6">
      <div role="alert">
        <h1>Coś poszło nie tak</h1>
        <p className="my-5">
          Wystąpił nieoczekiwany błąd i nie możemy pokazać tej strony. Twoje dane są zapisane tylko
          w tej przeglądarce i nie zostały usunięte. Odśwież stronę. Jeśli błąd wraca, pobierz zapis
          danych i zgłoś problem prowadzącemu.
        </p>
      </div>
      <div className="flex flex-wrap gap-[10px]">
        <button type="button" className={buttonVariants()} onClick={onReload}>
          Odśwież stronę
        </button>
        {hasSave ? (
          <button
            type="button"
            className={buttonVariants({ variant: "outline" })}
            onClick={onDownload}
          >
            Pobierz zapis danych
          </button>
        ) : null}
        <a className={buttonVariants({ variant: "ghost" })} href="#/oferty">
          Wróć do ofert
        </a>
      </div>
    </main>
  );
}
