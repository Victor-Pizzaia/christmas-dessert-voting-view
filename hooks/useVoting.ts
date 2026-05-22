"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import type {
  VotingSession,
  CreateVotingSessionRequest,
  SessionDetails,
  VoteResult,
} from "@/types/voting";

export function useVoting() {
  const [sessions, setSessions] = useState<VotingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<VotingSession[]>("/voting");
      setSessions(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch voting sessions";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async (data: CreateVotingSessionRequest) => {
    const response = await api.post<VotingSession>("/voting", data);
    return response.data;
  }, []);

  const fetchSessionDetails = useCallback(async (sessionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<SessionDetails>(`/voting/${sessionId}`);
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch session";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const subscribeDessert = useCallback(
    async (sessionId: string, dessertId: string, name: string) => {
      const response = await api.patch(`/voting/${sessionId}/subscribe`, {
        dessertId: { id: dessertId },
        name,
      });
      return response.data;
    },
    []
  );

  const castVote = useCallback(
    async (sessionId: string, dessertId: string) => {
      const response = await api.post(`/voting/${sessionId}/vote`, {
        dessertId: { id: dessertId },
      });
      return response.data;
    },
    []
  );

  const fetchResults = useCallback(async (sessionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<VoteResult[]>(
        `/voting/${sessionId}/results`
      );
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch results";
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sessions,
    loading,
    error,
    isEmpty: !loading && !error && sessions.length === 0,
    fetchSessions,
    createSession,
    fetchSessionDetails,
    subscribeDessert,
    castVote,
    fetchResults,
  };
}
