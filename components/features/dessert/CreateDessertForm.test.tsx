import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateDessertForm } from "./CreateDessertForm";

describe("CreateDessertForm", () => {
  it("renders form fields", () => {
    render(<CreateDessertForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit with name and description", async () => {
    const onSubmit = vi.fn();
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Pudim");
    await userEvent.type(
      screen.getByLabelText("Description"),
      "Very tasty"
    );
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith("Pudim", "Very tasty");
  });

  it("calls onSubmit with empty description", async () => {
    const onSubmit = vi.fn();
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Bolo");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith("Bolo", "");
  });

  it("does not call onSubmit if name is empty", async () => {
    const onSubmit = vi.fn();
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears fields after successful submission", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Pudim");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(screen.getByLabelText<HTMLInputElement>("Name").value).toBe("");
  });

  it("disables button while submitting", async () => {
    const onSubmit = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<CreateDessertForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "Pudim");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(screen.getByRole("button", { name: /creating/i })).toBeDisabled();
  });
});
