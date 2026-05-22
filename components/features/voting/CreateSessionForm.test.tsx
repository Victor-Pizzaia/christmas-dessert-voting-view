import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateSessionForm } from "./CreateSessionForm";

describe("CreateSessionForm", () => {
  it("renders form fields", () => {
    render(<CreateSessionForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Closing Date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create session/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit with name, description, and closingDate", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Christmas 2026");
    await userEvent.type(screen.getByLabelText("Description"), "Best of the best");
    await userEvent.type(screen.getByLabelText("Closing Date"), "25/12/2026 23:59:59");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).toHaveBeenCalledWith("Christmas 2026", "Best of the best", "25/12/2026 23:59:59");
  });

  it("does not call onSubmit if name is empty", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Closing Date"), "25/12/2026 23:59:59");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not call onSubmit if closingDate is empty", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Christmas 2026");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears fields after successful submission", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Christmas 2026");
    await userEvent.type(screen.getByLabelText("Closing Date"), "25/12/2026 23:59:59");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(screen.getByLabelText<HTMLInputElement>("Name").value).toBe("");
  });

  it("disables button while submitting", async () => {
    const onSubmit = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<CreateSessionForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Christmas 2026");
    await userEvent.type(screen.getByLabelText("Closing Date"), "25/12/2026 23:59:59");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(
      screen.getByRole("button", { name: /creating/i })
    ).toBeDisabled();
  });
});
