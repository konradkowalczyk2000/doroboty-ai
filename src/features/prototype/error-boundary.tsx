import { Component, type ErrorInfo, type ReactNode } from "react";
import posthog from "posthog-js";
import { ErrorScreen } from "./error-screen";
import { downloadText } from "./settings";
import { STORAGE_KEY } from "./storage";

function readSavedScenario(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

type State = { failed: boolean };

/** Top-level boundary: a render failure shows a recovery screen instead of a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      import.meta.env.VITE_PUBLIC_POSTHOG_HOST
    )
      posthog.captureException(error, {
        error_boundary: "prototype",
        component_stack: errorInfo.componentStack,
      });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const saved = readSavedScenario();
    return (
      <ErrorScreen
        hasSave={saved !== null}
        onReload={() => window.location.reload()}
        onDownload={() => {
          if (saved !== null) downloadText("doroboty-zapis.json", saved);
        }}
      />
    );
  }
}
