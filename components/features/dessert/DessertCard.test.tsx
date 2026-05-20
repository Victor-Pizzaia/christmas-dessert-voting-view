import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DessertCard } from "./DessertCard";
import type { Dessert } from "@/types/dessert";

const baseDessert: Dessert = {
  id: 1,
  name: "Pudim",
  description: "Delicious",
  owner: { id: 1, name: "John" },
};

describe("DessertCard", () => {
  it("renders dessert name and description", () => {
    render(<DessertCard dessert={baseDessert} onDelete={vi.fn()} />);
    expect(screen.getByText("Pudim")).toBeInTheDocument();
    expect(screen.getByText("Delicious")).toBeInTheDocument();
  });

  it("renders owner info", () => {
    render(<DessertCard dessert={baseDessert} onDelete={vi.fn()} />);
    expect(screen.getByText(/owner:/i)).toHaveTextContent("John");
  });

  it("shows subscribed badge when subscribed", () => {
    render(
      <DessertCard
        dessert={{ ...baseDessert, subscribed: true }}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("Subscribed")).toBeInTheDocument();
  });

  it("does not show subscribed badge when not subscribed", () => {
    render(<DessertCard dessert={baseDessert} onDelete={vi.fn()} />);
    expect(screen.queryByText("Subscribed")).not.toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(<DessertCard dessert={baseDessert} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(baseDessert);
  });

  it("does not render description when not provided", () => {
    render(
      <DessertCard
        dessert={{ id: 1, name: "Bolo" }}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("Bolo")).toBeInTheDocument();
  });
});
