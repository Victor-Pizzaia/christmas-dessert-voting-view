import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DessertCard } from "./DessertCard";
import type { Dessert } from "@/types/dessert";

const mockDessert: Dessert = {
  id: "1",
  name: "Chocolate Cake",
  description: "Rich and moist",
};

describe("DessertCard", () => {
  it("renders dessert info", () => {
    render(<DessertCard dessert={mockDessert} onDelete={vi.fn()} />);
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
    expect(screen.getByText("Rich and moist")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DessertCard dessert={mockDessert} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /excluir/i }));
    expect(onDelete).toHaveBeenCalledWith(mockDessert);
  });
});
