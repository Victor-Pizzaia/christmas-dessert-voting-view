import { render, screen } from "@testing-library/react";
import { ResultsPanel } from "./ResultsPanel";
import type { VoteResult } from "@/types/voting";

const mockResults: VoteResult[] = [
  { dessertId: "1", dessertName: "Chocolate Cake", votes: 10 },
  { dessertId: "2", dessertName: "Panettone", votes: 7 },
  { dessertId: "3", dessertName: "Cheesecake", votes: 3 },
];

describe("ResultsPanel", () => {
  it("renders loading state with skeleton elements", () => {
    const { container } = render(
      <ResultsPanel
        results={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders results sorted by votes", () => {
    render(
      <ResultsPanel
        results={mockResults}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const items = screen.getAllByText(/votos/);
    expect(items[0]).toHaveTextContent("10 votos");
    expect(items[1]).toHaveTextContent("7 votos");
    expect(items[2]).toHaveTextContent("3 votos");
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
    expect(screen.getByText(/nenhum resultado disponível/i)).toBeInTheDocument();
  });
});
