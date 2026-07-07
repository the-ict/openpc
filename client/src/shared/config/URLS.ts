export const BASE_URL = process.env.NODE_ENV === "production" ? "https://openpc.uz" : "http://localhost:3001";
export const UPLOAD_URL = process.env.NODE_ENV === "production"? "https://openpc.uz/uploads/" : "http://localhost:3001/uploads/";

export const AUTH_URLS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  GOOGLE: "/api/auth/google",
  GOOGLE_CALLBACK: "/api/auth/google/callback",
  ME: "/api/auth/me",
  REFRESH: "/api/auth/refresh",
} as const;

export const MODEL_URLS = {
    CREATE: "/api/models",
    UPDATE: "/api/models",
    GET_ALL: "/api/models",
} as const;

export const SESSION_URLS = {
    CREATE: "/api/sessions",
    UPDATE: "/api/sessions",
    ADD_MODEL: (session_id: string) => `/api/sessions/${session_id}/models`,
    DELETE: "/api/sessions",
    GET: "/api/sessions",
    GET_ALL: "/api/sessions",
} as const;

export const UPLOAD_URLS = {
  UPLOAD: "/api/upload",
} as const;