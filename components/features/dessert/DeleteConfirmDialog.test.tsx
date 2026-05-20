import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

describe("DeleteConfirmDialog", () => {
  it("renders with dessert name", () => {
    render(
      <DeleteConfirmDialog
        dessertName="Pudim"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByText(/pudim/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete/i })
    ).toBeInTheDocument();
  });

  it("calls onConfirm when delete is clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <DeleteConfirmDialog
        dessertName="Pudim"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onCancel when cancel is clicked", async () => {
    const onCancel = vi.fn();
    render(
      <DeleteConfirmDialog
        dessertName="Pudim"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("disables buttons while loading", () => {
    render(
      <DeleteConfirmDialog
        dessertName="Pudim"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
        loading={true}
      />
    );
    expect(
      screen.getByRole("button", { name: /deleting/i })
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  });
});
