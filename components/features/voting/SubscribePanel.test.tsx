import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscribePanel } from "./SubscribePanel";
import type { Dessert } from "@/types/dessert";

const subscribed = [
  { id: "1", name: "Pudim", subscribed: true },
];

const available: Dessert[] = [
  { id: "1", name: "Pudim", description: "Tasty" },
  { id: "2", name: "Bolo", description: "Chocolate" },
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
    expect(container.innerHTML).toBe("");
  });

  it("renders subscribed desserts", () => {
    render(
      <SubscribePanel
        subscribed={subscribed}
        available={available}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(screen.getByText("Pudim")).toBeInTheDocument();
  });

  it("renders empty message when no subscribed desserts", () => {
    render(
      <SubscribePanel
        subscribed={[]}
        available={available}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(
      screen.getByText(/no desserts subscribed yet/i)
    ).toBeInTheDocument();
  });

  it("renders available desserts to subscribe", () => {
    render(
      <SubscribePanel
        subscribed={subscribed}
        available={available}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(screen.getByText("Bolo")).toBeInTheDocument();
  });

  it("only shows unsubscribed desserts as available", () => {
    render(
      <SubscribePanel
        subscribed={subscribed}
        available={available}
        loading={false}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    expect(screen.getAllByText("Subscribe")).toHaveLength(1);
  });

  it("calls onSubscribe with dessert id and name", async () => {
    const onSubscribe = vi.fn();
    render(
      <SubscribePanel
        subscribed={subscribed}
        available={available}
        loading={false}
        sessionOpen={true}
        onSubscribe={onSubscribe}
      />
    );

    await userEvent.click(screen.getByText("Subscribe"));
    expect(onSubscribe).toHaveBeenCalledWith("2", "Bolo");
  });

  it("renders loading skeletons when loading", () => {
    render(
      <SubscribePanel
        subscribed={[]}
        available={[]}
        loading={true}
        sessionOpen={true}
        onSubscribe={vi.fn()}
      />
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
