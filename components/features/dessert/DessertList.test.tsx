import { render, screen } from "@testing-library/react";
import { DessertList } from "./DessertList";
import type { Dessert } from "@/types/dessert";

const mockDesserts: Dessert[] = [
  { id: "1", name: "Chocolate Cake", description: "Rich" },
  { id: "2", name: "Panettone" },
];

describe("DessertList", () => {
  it("renders loading state with skeleton elements", () => {
    const { container } = render(
      <DessertList
        desserts={[]}
        loading={true}
        error={null}
        isEmpty={false}
        onDelete={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders error state", () => {
    render(
      <DessertList
        desserts={[]}
        loading={false}
        error="Failed to load"
        isEmpty={false}
        onDelete={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("renders empty state", () => {
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
    expect(screen.getByText(/nenhum doce cadastrado/i)).toBeInTheDocument();
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
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
    expect(screen.getByText("Panettone")).toBeInTheDocument();
  });
});
