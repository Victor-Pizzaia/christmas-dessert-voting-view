"use client";

import { useRouter } from "next/navigation";
import { useVoting } from "@/hooks/useVoting";
import { CreateSessionForm } from "@/components/features/voting/CreateSessionForm";

export default function CreateVotingSessionPage() {
  const router = useRouter();
  const { createSession } = useVoting();

  async function handleCreate(year: number) {
    await createSession({ year });
    router.push("/voting");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-zinc-900">
        Create Voting Session
      </h1>
      <div className="max-w-md">
        <CreateSessionForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
