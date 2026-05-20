import { renderHook, act, waitFor } from "@testing-library/react";
import { api } from "@/lib/api";
import { useVoting } from "./useVoting";
import type { VotingSession } from "@/types/voting";

vi.mock("@/lib/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockSessions: VotingSession[] = [
  { id: 1, year: 2024, isOpenToVote: true, isOpenToSubscribe: false },
  { id: 2, year: 2025, isOpenToVote: false, isOpenToSubscribe: true },
];

describe("useVoting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts with empty state", () => {
    const { result } = renderHook(() => useVoting());
    expect(result.current.sessions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches sessions successfully", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockSessions });

    const { result } = renderHook(() => useVoting());

    act(() => {
      result.current.fetchSessions();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sessions).toEqual(mockSessions);
    expect(result.current.error).toBeNull();
    expect(result.current.isEmpty).toBe(false);
  });

  it("handles fetch error", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useVoting());

    act(() => {
      result.current.fetchSessions();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sessions).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("creates a session and returns it", async () => {
    const newSession: VotingSession = {
      id: 3,
      year: 2026,
      isOpenToVote: false,
      isOpenToSubscribe: true,
    };
    vi.mocked(api.post).mockResolvedValue({ data: newSession });

    const { result } = renderHook(() => useVoting());

    let created: VotingSession | undefined;
    await act(async () => {
      created = await result.current.createSession({ year: 2026 });
    });

    expect(created).toEqual(newSession);
    expect(api.post).toHaveBeenCalledWith("/voting", { year: 2026 });
  });

  it("subscribes a dessert", async () => {
    vi.mocked(api.patch).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useVoting());

    await act(async () => {
      await result.current.subscribeDessert(1, 42);
    });

    expect(api.patch).toHaveBeenCalledWith("/voting/1/subscribe", {
      dessertId: 42,
    });
  });

  it("casts a vote", async () => {
    vi.mocked(api.post).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useVoting());

    await act(async () => {
      await result.current.castVote(1, 42);
    });

    expect(api.post).toHaveBeenCalledWith("/voting/1/vote", {
      dessertId: 42,
    });
  });

  it("fetches session details", async () => {
    const details = {
      id: 1,
      year: 2024,
      isOpenToVote: true,
      isOpenToSubscribe: false,
      desserts: [],
    };
    vi.mocked(api.get).mockResolvedValue({ data: details });

    const { result } = renderHook(() => useVoting());

    let sessionDetails;
    await act(async () => {
      sessionDetails = await result.current.fetchSessionDetails(1);
    });

    expect(sessionDetails).toEqual(details);
    expect(api.get).toHaveBeenCalledWith("/voting/1");
  });

  it("fetches results", async () => {
    const results = [
      { dessertId: 1, dessertName: "Pudim", votes: 5 },
      { dessertId: 2, dessertName: "Bolo", votes: 3 },
    ];
    vi.mocked(api.get).mockResolvedValue({ data: results });

    const { result } = renderHook(() => useVoting());

    let voteResults;
    await act(async () => {
      voteResults = await result.current.fetchResults(1);
    });

    expect(voteResults).toEqual(results);
    expect(api.get).toHaveBeenCalledWith("/voting/1/results");
  });

  it("detects empty state after fetch", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useVoting());

    act(() => {
      result.current.fetchSessions();
    });

    await waitFor(() => expect(result.current.isEmpty).toBe(true));
  });
});
