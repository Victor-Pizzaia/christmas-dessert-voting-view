import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VotePanel } from "./VotePanel";

const subscribed = [
  { id: "1", name: "Pudim" },
  { id: "2", name: "Bolo" },
];

describe("VotePanel", () => {
  it("renders vote closed message when session is closed", () => {
    render(
      <VotePanel
        subscribed={[]}
        loading={false}
        sessionOpen={false}
        onVote={vi.fn()}
      />
    );
    expect(
      screen.getByText(/voting is closed/i)
    ).toBeInTheDocument();
  });

  it("renders subscribed desserts with vote buttons", () => {
    render(
      <VotePanel
        subscribed={subscribed}
        loading={false}
        sessionOpen={true}
        onVote={vi.fn()}
      />
    );
    expect(screen.getByText("Pudim")).toBeInTheDocument();
    expect(screen.getByText("Bolo")).toBeInTheDocument();
    expect(screen.getAllByText("Vote")).toHaveLength(2);
  });

  it("calls onVote with dessert id", async () => {
    const onVote = vi.fn();
    render(
      <VotePanel
        subscribed={subscribed}
        loading={false}
        sessionOpen={true}
        onVote={onVote}
      />
    );

    const voteButtons = screen.getAllByText("Vote");
    await userEvent.click(voteButtons[0]);
    expect(onVote).toHaveBeenCalledWith("1");
  });

  it("renders empty message when no subscribed desserts", () => {
    render(
      <VotePanel
        subscribed={[]}
        loading={false}
        sessionOpen={true}
        onVote={vi.fn()}
      />
    );
    expect(
      screen.getByText(/no desserts subscribed yet/i)
    ).toBeInTheDocument();
  });

  it("renders loading skeletons when loading", () => {
    render(
      <VotePanel
        subscribed={[]}
        loading={true}
        sessionOpen={true}
        onVote={vi.fn()}
      />
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
