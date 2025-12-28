import Constants from "expo-constants";
import { ApiErrorBody } from "./types";

const DEFAULT_BASE_URL = "https://6463711e-6d80-462d-b8f5-630be77a4bfd.mock.pstmn.io/v1";
const extra = (Constants.expoConfig?.extra ?? {}) as { API_BASE_URL?: string };
const envBaseUrl =
  typeof process !== "undefined" && (process as any)?.env?.EXPO_PUBLIC_API_BASE_URL
    ? ((process as any).env.EXPO_PUBLIC_API_BASE_URL as string)
    : undefined;

export const apiBaseUrl = (envBaseUrl ?? extra.API_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
export const isMockServer = apiBaseUrl.includes("mock.pstmn.io");

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
  signal?: AbortSignal;
  mockResponseCode?: number;
  mockResponseName?: string;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    token,
    signal,
    mockResponseCode,
    mockResponseName,
  } = options;
  const url = `${apiBaseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  const hasBody = body !== undefined && body !== null && method !== "GET";
  if (hasBody && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }
  if (isMockServer) {
    if (mockResponseCode !== undefined && !finalHeaders["x-mock-response-code"]) {
      finalHeaders["x-mock-response-code"] = `${mockResponseCode}`;
    }
    if (mockResponseName && !finalHeaders["x-mock-response-name"]) {
      finalHeaders["x-mock-response-name"] = mockResponseName;
    }
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    const errorBody = (payload ?? {}) as ApiErrorBody;
    const message =
      errorBody.message ||
      (typeof payload === "string" && payload) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, errorBody.code, errorBody.details ?? payload);
  }

  // For 204/empty responses return undefined as T
  return (payload as T) ?? (undefined as T);
}
