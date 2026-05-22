"use client";

import { useRouter } from "next/navigation";
import { useVoting } from "@/hooks/useVoting";
import { CreateSessionForm } from "@/components/features/voting/CreateSessionForm";

export default function CreateVotingSessionPage() {
  const router = useRouter();
  const { createSession } = useVoting();

  async function handleCreate(name: string, description: string, closingDate: string) {
    await createSession({ name, description: description || undefined, closingDate });
    router.push("/voting");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-choc">
        Criar Nova Votação
      </h1>
      <div className="max-w-md">
        <CreateSessionForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
