export interface SubscribedDessert {
  dessertId: string;
  name: string;
  numberOfVotes: number;
  votePosition: number;
}

export interface VotingSession {
  id: string;
  name: string;
  description?: string;
  numberOfParticipants: number;
  isOpenToVote: boolean;
  subscribedDesserts: SubscribedDessert[];
  closingDate: string;
}

export interface CreateVotingSessionRequest {
  name: string;
  description?: string;
  closingDate: string;
}

export interface SessionDetails {
  id: string;
  name: string;
  description?: string;
  numberOfParticipants: number;
  isOpenToVote: boolean;
  subscribedDesserts: SubscribedDessert[];
  closingDate: string;
}

export interface DessertInSession {
  id: string;
  name: string;
  description?: string;
  numberOfVotes?: number;
  votePosition?: number;
  subscribed?: boolean;
}

export interface VoteResult {
  dessertId: string;
  dessertName: string;
  votes: number;
  votePosition?: number;
}

export interface CastVoteRequest {
  dessertId: { id: string };
}

export interface SubscribeRequest {
  dessertId: { id: string };
  name: string;
}
