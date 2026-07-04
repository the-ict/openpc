export const BASE_URL = process.env.NODE_ENV === "production" ? "https://openpc.uz" : "http://localhost:3001";

export const AUTH_URLS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  GOOGLE: "/api/auth/google",
  GOOGLE_CALLBACK: "/api/auth/google/callback",
} as const;

export const MODEL_URLS = {
  CREATE: "/api/models",
  UPDATE: "/api/models/:id",
} as const;

export const SESSION_URLS = {
  CREATE: "/api/sessions",
  UPDATE: "/api/sessions/:id",
  ADD_MODEL: "/api/sessions/:id/models",
  DELETE: "/api/sessions/:id",
} as const;

export const UPLOAD_URLS = {
  UPLOAD: "/api/upload",
} as const;