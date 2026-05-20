import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DessertList } from "./DessertList";
import type { Dessert } from "@/types/dessert";

const mockDesserts: Dessert[] = [
  { id: 1, name: "Pudim", description: "Tasty" },
  { id: 2, name: "Bolo", subscribed: true },
];

describe("DessertList", () => {
  it("renders loading skeletons when loading", () => {
    render(
      <DessertList
        desserts={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onDelete={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders dessert cards", () => {
    render(
      <DessertList
        desserts={mockDesserts}
        loading={false}
        error={null}
        isEmpty={false}
        onDelete={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("Pudim")).toBeInTheDocument();
    expect(screen.getByText("Bolo")).toBeInTheDocument();
  });

  it("renders empty state when isEmpty", () => {
    render(
      <DessertList
        desserts={[]}
        loading={false}
        error={null}
        isEmpty={true}
        onDelete={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText(/no desserts yet/i)).toBeInTheDocument();
  });

  it("renders error state with retry", async () => {
    const onRetry = vi.fn();
    render(
      <DessertList
        desserts={[]}
        loading={false}
        error="Failed to load"
        isEmpty={false}
        onDelete={vi.fn()}
        onRetry={onRetry}
      />
    );
    expect(screen.getByText("Failed to load")).toBeInTheDocument();

    await userEvent.click(screen.getByText(/try again/i));
    expect(onRetry).toHaveBeenCalled();
  });
});
