import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DessertCard } from "./DessertCard";
import type { Dessert } from "@/types/dessert";

const baseDessert: Dessert = {
  id: "1",
  name: "Pudim",
  description: "Delicious",
};

describe("DessertCard", () => {
  it("renders dessert name and description", () => {
    render(<DessertCard dessert={baseDessert} onDelete={vi.fn()} />);
    expect(screen.getByText("Pudim")).toBeInTheDocument();
    expect(screen.getByText("Delicious")).toBeInTheDocument();
  });

  it("renders recipe info", () => {
    render(
      <DessertCard
        dessert={{ ...baseDessert, recipe: "Mix and bake" }}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText(/recipe:/i)).toHaveTextContent("Mix and bake");
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
        dessert={{ id: "2", name: "Bolo" }}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("Bolo")).toBeInTheDocument();
  });
});
