import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders label and input", () => {
    render(<Input id="test" label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });
});
