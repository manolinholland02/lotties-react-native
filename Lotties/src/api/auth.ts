import { isMockServer, request } from "./client";
import { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export const MOCK_SUCCESS_EMAIL = "user@example.com";
export const MOCK_SUCCESS_PASSWORD = "SecureP@ssw0rd";

export async function login(body: LoginRequest) {
  const mockConfig = isMockServer
    ? body.email === MOCK_SUCCESS_EMAIL && body.password === MOCK_SUCCESS_PASSWORD
      ? { mockResponseCode: 200, mockResponseName: "Successfully authenticated" }
      : { mockResponseCode: 401, mockResponseName: "Invalid credentials" }
    : {};

  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body,
    ...mockConfig,
  });
}

export async function register(body: RegisterRequest) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body,
    mockResponseCode: 201,
    mockResponseName: "User successfully registered",
  });
}

export async function refresh(refreshToken: string) {
  return request<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
    mockResponseCode: 200,
    mockResponseName: "New access token generated",
  });
}

export async function logout(token?: string) {
  return request<void>("/auth/logout", {
    method: "POST",
    token,
    mockResponseCode: 204,
    mockResponseName: "Successfully logged out",
  });
}
