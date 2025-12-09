import React from "react";
import { login as loginApi, logout as logoutApi, MOCK_SUCCESS_EMAIL } from "../api/auth";
import { ApiError, isMockServer } from "../api/client";
import { UserProfile } from "../api/types";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: number;
};

type LoginResult =
  | { ok: true }
  | { ok: false; error?: string };

type AuthContextValue = {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [tokens, setTokens] = React.useState<AuthTokens | null>(null);

  const login = React.useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim();
    if (isMockServer && trimmedEmail.toLowerCase() !== MOCK_SUCCESS_EMAIL.toLowerCase()) {
      return { ok: false, error: "Dit e-mailadres is niet bekend" } as const;
    }
    try {
      const response = await loginApi({ email: trimmedEmail, password });
      const expiresAt = response.expiresIn ? Date.now() + response.expiresIn * 1000 : Date.now();

      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        tokenType: response.tokenType ?? "Bearer",
        expiresAt,
      });
      setUser(
        response.user ?? {
          email: trimmedEmail,
        }
      );

      return { ok: true } as const;
    } catch (error) {
      console.warn("Login failed", error);
      let message = "Inloggen mislukt. Probeer het opnieuw.";
      if (error instanceof ApiError) {
        if (error.status === 401) {
          message = "Verkeerd wachtwoord";
        } else if (error.message) {
          message = error.message;
        }
      }
      return { ok: false, error: message } as const;
    }
  }, []);

  const logout = React.useCallback(async () => {
    const token = tokens?.accessToken;
    setUser(null);
    setTokens(null);
    if (!token) return;

    try {
      await logoutApi(token);
    } catch {
      // Silently ignore logout failures for now.
    }
  }, [tokens]);

  const value = React.useMemo(
    () => ({
      user,
      tokens,
      isAuthenticated: !!tokens?.accessToken,
      login,
      logout,
    }),
    [user, tokens, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
