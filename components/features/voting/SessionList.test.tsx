import { render, screen } from "@testing-library/react";
import { SessionList } from "./SessionList";
import type { VotingSession } from "@/types/voting";

const mockSessions: VotingSession[] = [
  {
    id: "1",
    name: "Christmas Contest",
    numberOfParticipants: 5,
    isOpenToVote: false,
    subscribedDesserts: [],
    closingDate: "2026-01-01",
  },
  {
    id: "2",
    name: "Easter Contest",
    numberOfParticipants: 3,
    isOpenToVote: true,
    subscribedDesserts: [],
    closingDate: "2026-04-01",
  },
];

describe("SessionList", () => {
  it("renders loading state with skeleton elements", () => {
    const { container } = render(
      <SessionList
        sessions={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders error state", () => {
    render(
      <SessionList
        sessions={[]}
        loading={false}
        error="Something went wrong"
        isEmpty={false}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <SessionList
        sessions={[]}
        loading={false}
        error={null}
        isEmpty={true}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText(/nenhuma votação encontrada/i)).toBeInTheDocument();
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
    expect(screen.getByText("Christmas Contest")).toBeInTheDocument();
    expect(screen.getByText("Easter Contest")).toBeInTheDocument();
    expect(screen.getByText("5 participantes")).toBeInTheDocument();
    expect(screen.getByText("3 participantes")).toBeInTheDocument();
  });
});
