export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
};

export type UserProfile = {
  id?: string;
  externalId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string | null;
  profileImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType?: string;
  user?: UserProfile;
};

export type ApiErrorBody = {
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
};
