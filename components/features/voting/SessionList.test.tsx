import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionList } from "./SessionList";
import type { VotingSession } from "@/types/voting";

const mockSessions: VotingSession[] = [
  { id: "1", name: "Christmas 2024", isOpenToVote: true, numberOfParticipants: 0, subscribedDesserts: [], closingDate: "2024-12-25T23:59:59" },
  { id: "2", name: "Christmas 2025", isOpenToVote: false, numberOfParticipants: 0, subscribedDesserts: [], closingDate: "2025-12-25T23:59:59" },
];

describe("SessionList", () => {
  it("renders loading skeletons when loading", () => {
    render(
      <SessionList
        sessions={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders session cards", () => {
    render(
      <SessionList
        sessions={mockSessions}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("Christmas 2024")).toBeInTheDocument();
    expect(screen.getByText("Christmas 2025")).toBeInTheDocument();
    expect(screen.getByText("Voting open")).toBeInTheDocument();
    expect(screen.getByText("Subscriptions open")).toBeInTheDocument();
  });

  it("renders empty state when isEmpty", () => {
    render(
      <SessionList
        sessions={[]}
        loading={false}
        error={null}
        isEmpty={true}
        onRetry={vi.fn()}
      />
    );
    expect(
      screen.getByText(/no voting sessions yet/i)
    ).toBeInTheDocument();
  });

  it("renders error state with retry", async () => {
    const onRetry = vi.fn();
    render(
      <SessionList
        sessions={[]}
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

  it("renders View and Results links", () => {
    render(
      <SessionList
        sessions={mockSessions}
        loading={false}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const viewLinks = screen.getAllByText("View");
    const resultsLinks = screen.getAllByText("Results");
    expect(viewLinks).toHaveLength(2);
    expect(resultsLinks).toHaveLength(2);
  });
});
