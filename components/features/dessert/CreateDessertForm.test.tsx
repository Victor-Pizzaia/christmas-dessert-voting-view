import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateDessertForm } from "./CreateDessertForm";

describe("CreateDessertForm", () => {
  it("renders the form", () => {
    render(<CreateDessertForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("heading", { name: /adicionar novo doce/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const onSubmit = vi.fn().mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/nome/i), "Chocolate Cake");
    await user.type(screen.getByLabelText(/descrição/i), "Delicious");
    await user.click(screen.getByRole("button", { name: /criar doce/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("Chocolate Cake", "Delicious");
    });
  });

  it("does not call onSubmit when name is empty", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /criar doce/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
