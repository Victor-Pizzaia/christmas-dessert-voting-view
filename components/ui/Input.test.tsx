import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders label and input", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("forwards value and onChange", async () => {
    const handleChange = vi.fn();
    render(<Input id="name" label="Name" value="" onChange={handleChange} />);
    const input = screen.getByLabelText("Name");
    await userEvent.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with placeholder", () => {
    render(<Input id="cpf" label="CPF" placeholder="000.000.000-00" />);
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();
  });

  it("applies required attribute", () => {
    render(<Input id="email" label="Email" required />);
    expect(screen.getByLabelText("Email")).toBeRequired();
  });
});
