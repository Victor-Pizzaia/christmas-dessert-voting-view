"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface VotingSession {
  id: number;
  year: number;
  isOpenToVote: boolean;
}

interface Dessert {
  id: number;
  name: string;
  description?: string;
}

export default function VotingPage() {
  const [sessions, setSessions] = useState<VotingSession[]>([]);
  const [activeSession, setActiveSession] = useState<VotingSession | null>(
    null
  );
  const [subscribed, setSubscribed] = useState<Dessert[]>([]);
  const [available, setAvailable] = useState<Dessert[]>([]);

  async function fetchSessions() {
    const response = await api.get("/votings");
    setSessions(response.data);
    const open = response.data.find(
      (s: VotingSession) => s.isOpenToVote
    );
    if (open) setActiveSession(open);
  }

  async function fetchSubscribed(sessionId: number) {
    const response = await api.get(`/votings/${sessionId}/subscribed`);
    setSubscribed(response.data);
  }

  async function fetchAvailableDesserts() {
    const response = await api.get("/desserts");
    setAvailable(response.data);
  }

  useEffect(() => {
    fetchSessions();
    fetchAvailableDesserts();
  }, []);

  useEffect(() => {
    if (activeSession) fetchSubscribed(activeSession.id);
  }, [activeSession]);

  async function handleSubscribe(dessertId: number) {
    if (!activeSession) return;
    await api.post(`/votings/${activeSession.id}/subscribe`, {
      dessertId,
    });
    fetchSubscribed(activeSession.id);
  }

  async function handleVote(dessertId: number) {
    if (!activeSession) return;
    await api.post(`/votings/${activeSession.id}/vote`, {
      dessertId,
    });
  }

  const unsubscribed = available.filter(
    (d) => !subscribed.find((s) => s.id === d.id)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-zinc-900">Voting</h1>

      {!activeSession ? (
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="text-zinc-500">No active voting session</p>
        </div>
      ) : (
        <>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-600">
              Voting session:{" "}
              <span className="font-semibold">{activeSession.year}</span>
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-800">
              Subscribed Desserts
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subscribed.map((dessert) => (
                <div
                  key={dessert.id}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-zinc-900">
                    {dessert.name}
                  </h3>
                  {dessert.description && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {dessert.description}
                    </p>
                  )}
                  <button
                    onClick={() => handleVote(dessert.id)}
                    className="mt-3 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
          </section>

          {unsubscribed.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-800">
                Available Desserts to Subscribe
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unsubscribed.map((dessert) => (
                  <div
                    key={dessert.id}
                    className="rounded-lg bg-white p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-zinc-900">
                      {dessert.name}
                    </h3>
                    {dessert.description && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {dessert.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleSubscribe(dessert.id)}
                      className="mt-3 rounded bg-zinc-100 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-200"
                    >
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
