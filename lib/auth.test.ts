import { setToken, getToken, removeToken, setStoredUser, getStoredUser, isAuthenticated } from "./auth";

beforeEach(() => {
  localStorage.clear();
});

describe("auth lib", () => {
  it("stores and retrieves token", () => {
    setToken("my-token");
    expect(getToken()).toBe("my-token");
  });

  it("removes token on logout", () => {
    setToken("my-token");
    removeToken();
    expect(getToken()).toBeNull();
  });

  it("returns null for token in SSR (no window)", () => {
    const originalWindow = globalThis.window;
    (globalThis as Record<string, unknown>).window = undefined;
    expect(getToken()).toBeNull();
    (globalThis as Record<string, unknown>).window = originalWindow;
  });

  it("checks authentication status", () => {
    expect(isAuthenticated()).toBe(false);
    setToken("valid-token");
    expect(isAuthenticated()).toBe(true);
  });

  it("stores and retrieves user", () => {
    const user = { id: 1, name: "John", email: "john@test.com", cpf: "123" };
    setStoredUser(user);
    expect(getStoredUser()).toEqual(user);
  });

  it("returns null for user when not stored", () => {
    expect(getStoredUser()).toBeNull();
  });
});
