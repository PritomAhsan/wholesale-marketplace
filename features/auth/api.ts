const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface AuthUser {
  uuid: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  roles: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

export class AuthApiError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

async function post(
  path: string,
  body: Record<string, unknown>
): Promise<{ user: AuthUser; token: string }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new AuthApiError(
      json.message ?? "Request failed",
      json.errors ?? {}
    );
  }

  return json.data;
}

export function login(payload: LoginPayload) {
  return post("/auth/login", payload);
}

export function register(payload: RegisterPayload) {
  return post("/auth/register", payload);
}

export async function logout(token: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchMe(token: string): Promise<AuthUser | null> {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const json = await res.json();

  return json.data.user;
}
