import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import RegisterPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockRegister = vi.fn();
const mockPush = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
    register: mockRegister,
    isAuthenticated: false,
    user: null,
  });
  (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
    push: mockPush,
  });
});

describe("RegisterPage", () => {
  it("renders the form", () => {
    render(<RegisterPage />);
    expect(screen.getByRole("heading", { name: /cadastrar/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/doces favoritos/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/cpf é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John");
    await user.type(screen.getByLabelText(/email/i), "invalid");
    await user.type(screen.getByLabelText(/cpf/i), "52998224725");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText(/digite um email válido/i)).toBeInTheDocument();
  });

  it("validates CPF format", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/cpf/i), "12345678901");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText(/digite um cpf válido/i)).toBeInTheDocument();
  });

  it("validates password minimum length", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/cpf/i), "52998224725");
    await user.type(screen.getByLabelText(/senha/i), "12345");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText(/pelo menos 6 caracteres/i)).toBeInTheDocument();
  });

  it("calls register and redirects on success", async () => {
    mockRegister.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/cpf/i), "52998224725");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        "John Doe",
        "john@test.com",
        "52998224725",
        "password123",
        undefined
      );
    });
    expect(mockPush).toHaveBeenCalledWith("/desserts");
  });

  it("shows field-level errors from API", async () => {
    mockRegister.mockRejectedValueOnce({
      response: {
        data: {
          message: "Validation failed",
          errors: { email: ["Email already taken"] },
        },
      },
    });
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/cpf/i), "52998224725");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/email already taken/i)).toBeInTheDocument();
    });
  });

  it("shows loading state while submitting", async () => {
    mockRegister.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nome/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/cpf/i), "52998224725");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByRole("button", { name: /cadastrando/i })).toBeDisabled();
  });

  it("has a link to login page", () => {
    render(<RegisterPage />);
    expect(screen.getByRole("link", { name: /entrar/i })).toHaveAttribute(
      "href",
      "/login"
    );
  });
});
