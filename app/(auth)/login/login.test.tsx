import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockLogin = vi.fn();
const mockPush = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
  });
  (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
    push: mockPush,
  });
});

describe("LoginPage", () => {
  it("renders the form", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email ou cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(screen.getByText(/email ou cpf é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login and redirects on success", async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email ou cpf/i), "user@test.com");
    await user.type(screen.getByLabelText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("user@test.com", "password123");
    });
    expect(mockPush).toHaveBeenCalledWith("/desserts");
  });

  it("shows API error on failed login", async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email ou cpf/i), "user@test.com");
    await user.type(screen.getByLabelText(/senha/i), "wrong");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("has a link to register page", () => {
    render(<LoginPage />);
    expect(screen.getByRole("link", { name: /cadastre-se/i })).toHaveAttribute(
      "href",
      "/register"
    );
  });
});
