import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ErrorBoundary } from "./error-boundary";
import { ErrorScreen } from "./error-screen";

const noop = () => undefined;

describe("render failure recovery", () => {
  it("explains the failure and offers reload and a way back", () => {
    const html = renderToStaticMarkup(
      createElement(ErrorScreen, { hasSave: false, onReload: noop, onDownload: noop }),
    );
    expect(html).toContain("Coś poszło nie tak");
    expect(html).toContain("Odśwież stronę");
    expect(html).toContain('href="#/oferty"');
    expect(html).toContain('role="alert"');
    expect(html).not.toContain("Pobierz zapis danych");
  });

  it("offers a download of the saved scenario only when a save exists", () => {
    const html = renderToStaticMarkup(
      createElement(ErrorScreen, { hasSave: true, onReload: noop, onDownload: noop }),
    );
    expect(html).toContain("Pobierz zapis danych");
  });

  it("switches the boundary into the failed state without carrying error details", () => {
    expect(ErrorBoundary.getDerivedStateFromError()).toEqual({ failed: true });
  });
});
