export interface User {
  name: string;
  favorite_sweets: string[];
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  plainPassword: string;
  favorite_sweets: string[];
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
