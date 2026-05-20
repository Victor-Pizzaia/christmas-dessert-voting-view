import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateSessionForm } from "./CreateSessionForm";

describe("CreateSessionForm", () => {
  it("renders form fields", () => {
    render(<CreateSessionForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create session/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit with year", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Year");
    await userEvent.clear(input);
    await userEvent.type(input, "2025");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).toHaveBeenCalledWith(2025);
  });

  it("does not call onSubmit if year is empty", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Year");
    await userEvent.clear(input);
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not call onSubmit if year is not a number", async () => {
    const onSubmit = vi.fn();
    render(<CreateSessionForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Year");
    await userEvent.clear(input);
    await userEvent.type(input, "abc");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears field after successful submission", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CreateSessionForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Year");
    await userEvent.clear(input);
    await userEvent.type(input, "2025");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByLabelText<HTMLInputElement>("Year").value).toBe(
      currentYear
    );
  });

  it("disables button while submitting", async () => {
    const onSubmit = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<CreateSessionForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Year");
    await userEvent.clear(input);
    await userEvent.type(input, "2025");
    await userEvent.click(
      screen.getByRole("button", { name: /create session/i })
    );

    expect(
      screen.getByRole("button", { name: /creating/i })
    ).toBeDisabled();
  });
});
