import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResultsPanel } from "./ResultsPanel";
import type { VoteResult } from "@/types/voting";

const results: VoteResult[] = [
  { dessertId: 1, dessertName: "Pudim", votes: 5 },
  { dessertId: 2, dessertName: "Bolo", votes: 3 },
  { dessertId: 3, dessertName: "Mousse", votes: 1 },
];

describe("ResultsPanel", () => {
  it("renders loading skeletons when loading", () => {
    render(
      <ResultsPanel
        results={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error state with retry", async () => {
    const onRetry = vi.fn();
    render(
      <ResultsPanel
        results={[]}
        loading={false}
        error="Failed to load"
        isEmpty={false}
        onRetry={onRetry}
      />
    );
    expect(screen.getByText("Failed to load")).toBeInTheDocument();

    await userEvent.click(screen.getByText(/try again/i));
    expect(onRetry).toHaveBeenCalled();
  });

  it("renders empty state", () => {
    render(
      <ResultsPanel
        results={[]}
        loading={false}
        error={null}
        isEmpty={true}
        onRetry={vi.fn()}
      />
    );
    expect(
      screen.getByText(/no results available yet/i)
    ).toBeInTheDocument();
  });

  it("renders results sorted by votes descending", () => {
    render(
      <ResultsPanel
        results={results}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("5 votes")).toBeInTheDocument();
    expect(screen.getByText("3 votes")).toBeInTheDocument();
    expect(screen.getByText("1 vote")).toBeInTheDocument();
  });

  it("renders ranking numbers", () => {
    render(
      <ResultsPanel
        results={results}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("#3")).toBeInTheDocument();
  });

  it("renders dessert names", () => {
    render(
      <ResultsPanel
        results={results}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("Pudim")).toBeInTheDocument();
    expect(screen.getByText("Bolo")).toBeInTheDocument();
    expect(screen.getByText("Mousse")).toBeInTheDocument();
  });

  it("handles single result with singular vote text", () => {
    render(
      <ResultsPanel
        results={[{ dessertId: 1, dessertName: "Pudim", votes: 1 }]}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("1 vote")).toBeInTheDocument();
  });
});
