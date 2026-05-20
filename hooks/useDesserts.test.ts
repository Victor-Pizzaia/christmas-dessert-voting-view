import { renderHook, act, waitFor } from "@testing-library/react";
import { api } from "@/lib/api";
import { useDesserts } from "./useDesserts";
import type { Dessert } from "@/types/dessert";

vi.mock("@/lib/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockDesserts: Dessert[] = [
  { id: 1, name: "Pudim", description: "Delicious", subscribed: true },
  { id: 2, name: "Bolo", description: "Chocolate" },
];

describe("useDesserts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts with empty state", () => {
    const { result } = renderHook(() => useDesserts());
    expect(result.current.desserts).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches desserts successfully", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockDesserts });

    const { result } = renderHook(() => useDesserts());

    act(() => {
      result.current.fetchDesserts();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.desserts).toEqual(mockDesserts);
    expect(result.current.error).toBeNull();
    expect(result.current.isEmpty).toBe(false);
  });

  it("handles fetch error", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useDesserts());

    act(() => {
      result.current.fetchDesserts();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.desserts).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("creates a dessert and returns it", async () => {
    const newDessert: Dessert = { id: 3, name: "Mousse" };
    vi.mocked(api.post).mockResolvedValue({ data: newDessert });

    const { result } = renderHook(() => useDesserts());

    let created: Dessert | undefined;
    await act(async () => {
      created = await result.current.createDessert({
        name: "Mousse",
        description: "",
      });
    });

    expect(created).toEqual(newDessert);
    expect(api.post).toHaveBeenCalledWith("/desserts", {
      name: "Mousse",
      description: "",
    });
  });

  it("deletes a dessert and removes it from state on success", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockDesserts });
    vi.mocked(api.delete).mockResolvedValue({});

    const { result } = renderHook(() => useDesserts());

    act(() => {
      result.current.fetchDesserts();
    });

    await waitFor(() => expect(result.current.desserts).toHaveLength(2));

    await act(async () => {
      await result.current.deleteDessert(1);
    });

    expect(result.current.desserts).toHaveLength(1);
    expect(result.current.desserts[0].id).toBe(2);
  });

  it("removes dessert from state even if delete API fails", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockDesserts });
    vi.mocked(api.delete).mockRejectedValue(new Error("Server error"));

    const { result } = renderHook(() => useDesserts());

    act(() => {
      result.current.fetchDesserts();
    });

    await waitFor(() => expect(result.current.desserts).toHaveLength(2));

    await act(async () => {
      await result.current.deleteDessert(1);
    });

    expect(result.current.desserts).toHaveLength(1);
  });

  it("detects empty state after fetch", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useDesserts());

    act(() => {
      result.current.fetchDesserts();
    });

    await waitFor(() => expect(result.current.isEmpty).toBe(true));
  });
});
