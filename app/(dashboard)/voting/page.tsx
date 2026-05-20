"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Card } from "@/components/ui";

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
  const [activeSession, setActiveSession] = useState<VotingSession | null>(
    null
  );
  const [subscribed, setSubscribed] = useState<Dessert[]>([]);
  const [available, setAvailable] = useState<Dessert[]>([]);

  async function fetchSessions() {
    const response = await api.get("/voting");
    const open = response.data.find(
      (s: VotingSession) => s.isOpenToVote
    );
    if (open) setActiveSession(open);
  }

  async function fetchSubscribed(sessionId: number) {
    const response = await api.get(`/voting/${sessionId}/subscribed`);
    setSubscribed(response.data);
  }

  async function fetchAvailableDesserts() {
    const response = await api.get("/desserts");
    setAvailable(response.data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSessions();
    fetchAvailableDesserts();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeSession) fetchSubscribed(activeSession.id);
  }, [activeSession]);

  async function handleSubscribe(dessertId: number) {
    if (!activeSession) return;
    await api.patch(`/voting/${activeSession.id}/subscribe`, {
      dessertId,
    });
    fetchSubscribed(activeSession.id);
  }

  async function handleVote(dessertId: number) {
    if (!activeSession) return;
    await api.post(`/voting/${activeSession.id}/vote`, {
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
        <Card className="text-center">
          <p className="text-zinc-500">No active voting session</p>
        </Card>
      ) : (
        <>
          <Card>
            <p className="text-sm text-zinc-600">
              Voting session:{" "}
              <span className="font-semibold">{activeSession.year}</span>
            </p>
          </Card>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-800">
              Subscribed Desserts
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subscribed.map((dessert) => (
                <Card key={dessert.id}>
                  <h3 className="font-semibold text-zinc-900">
                    {dessert.name}
                  </h3>
                  {dessert.description && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {dessert.description}
                    </p>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleVote(dessert.id)}
                  >
                    Vote
                  </Button>
                </Card>
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
                  <Card key={dessert.id}>
                    <h3 className="font-semibold text-zinc-900">
                      {dessert.name}
                    </h3>
                    {dessert.description && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {dessert.description}
                      </p>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSubscribe(dessert.id)}
                    >
                      Subscribe
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
