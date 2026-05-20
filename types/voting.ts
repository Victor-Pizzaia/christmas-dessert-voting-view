export interface VotingSession {
  id: number;
  year: number;
  isOpenToVote: boolean;
  isOpenToSubscribe: boolean;
}

export interface CreateVotingSessionRequest {
  year: number;
}

export interface SessionDetails {
  id: number;
  year: number;
  isOpenToVote: boolean;
  isOpenToSubscribe: boolean;
  desserts: DessertInSession[];
}

export interface DessertInSession {
  id: number;
  name: string;
  description?: string;
  owner?: { id: number; name: string };
  votes?: number;
  subscribed?: boolean;
}

export interface VoteResult {
  dessertId: number;
  dessertName: string;
  votes: number;
}

export interface CastVoteRequest {
  dessertId: number;
}

export interface SubscribeRequest {
  dessertId: number;
}
