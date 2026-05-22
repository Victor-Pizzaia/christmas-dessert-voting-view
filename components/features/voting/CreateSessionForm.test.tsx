import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateSessionForm } from "./CreateSessionForm";

describe("CreateSessionForm", () => {
  it("renders the form", () => {
    render(<CreateSessionForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("heading", { name: /nova votação/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de encerramento/i)).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const onSubmit = vi.fn().mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/nome/i), "Test Session");
    await user.type(screen.getByLabelText(/descrição/i), "A test");
    await user.type(screen.getByLabelText(/data de encerramento/i), "25/12/2026 23:59:59");
    await user.click(screen.getByRole("button", { name: /criar votação/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("Test Session", "A test", "25/12/2026 23:59:59");
    });
  });

  it("does not call onSubmit when name is empty", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /criar votação/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
