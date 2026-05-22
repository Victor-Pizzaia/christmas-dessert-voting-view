import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VotePanel } from "./VotePanel";

describe("VotePanel", () => {
  it("shows closed message when session is not open", () => {
    render(
      <VotePanel
        subscribed={[]}
        loading={false}
        sessionOpen={false}
        onVote={vi.fn()}
      />
    );
    expect(screen.getByText(/votação está fechada/i)).toBeInTheDocument();
  });

  it("renders subscribed desserts with vote buttons", () => {
    const subscribed = [{ id: "1", name: "Chocolate Cake" }];
    render(
      <VotePanel
        subscribed={subscribed}
        loading={false}
        sessionOpen={true}
        onVote={vi.fn()}
      />
    );
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /votar/i })).toBeInTheDocument();
  });

  it("calls onVote when button is clicked", async () => {
    const onVote = vi.fn().mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(
      <VotePanel
        subscribed={[{ id: "1", name: "Chocolate Cake" }]}
        loading={false}
        sessionOpen={true}
        onVote={onVote}
      />
    );
    await user.click(screen.getByRole("button", { name: /votar/i }));
    await waitFor(() => {
      expect(onVote).toHaveBeenCalledWith("1");
    });
  });

  it("shows empty state when no desserts", () => {
    render(
      <VotePanel
        subscribed={[]}
        loading={false}
        sessionOpen={true}
        onVote={vi.fn()}
      />
    );
    expect(screen.getByText(/nenhum doce inscrito/i)).toBeInTheDocument();
  });
});
