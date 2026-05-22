import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscribePanel } from "./SubscribePanel";
import type { Dessert } from "@/types/dessert";

const mockSubscribed = [{ id: "1", name: "Chocolate Cake", subscribed: true }];
const mockAvailable: Dessert[] = [
  { id: "2", name: "Panettone", description: "Italian" },
];

describe("SubscribePanel", () => {
  it("renders nothing when session is closed", () => {
    const { container } = render(
      <SubscribePanel
        subscribed={[]}
        available={[]}
        loading={false}
        sessionOpen={false}
        onSubscribe={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders subscribed desserts", () => {
    render(
      <SubscribePanel
        subscribed={mockSubscribed}
        available={mockAvailable}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
  });

  it("shows available desserts and subscribe button", async () => {
    const onSubscribe = vi.fn().mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(
      <SubscribePanel
        subscribed={mockSubscribed}
        available={mockAvailable}
        loading={false}
        sessionOpen={true}
        onSubscribe={onSubscribe}
      />
    );
    expect(screen.getByText("Panettone")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /inscrever/i }));
    await waitFor(() => {
      expect(onSubscribe).toHaveBeenCalledWith("2", "Panettone");
    });
  });

  it("shows empty state when no desserts subscribed", () => {
    render(
      <SubscribePanel
        subscribed={[]}
        available={[]}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(screen.getByText(/nenhum doce inscrito/i)).toBeInTheDocument();
  });
});
