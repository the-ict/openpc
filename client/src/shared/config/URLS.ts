export const BASE_URL = "https://api.coreform.uz" 
export const UPLOAD_URL = `${BASE_URL}/uploads/`;

const MODEL_CACHE_BUST = Date.now();

export function modelFileUrl(file: string): string {
    if (!file) return file;
    return `${UPLOAD_URL}${file}?v=${MODEL_CACHE_BUST}`;
};

export function getLocalModelUrl(type: string): string {
    return `/models/${type}.glb`;
};

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
    UPLOAD_FILE: "/api/upload"
} as const;

export const SESSION_URLS = {
    CREATE: "/api/sessions",
    UPDATE: "/api/sessions",
    ADD_MODEL: (session_id: string) => `/api/sessions/${session_id}/models`,
    DELETE: "/api/sessions",
    GET: "/api/sessions",
    GET_ALL: "/api/sessions",
} as const;

export const EXCEPT_URLS = {
  HERO_COMPONENTS: "/api/excepts/hero-components",
} as const;

export const UPLOAD_URLS = {
  UPLOAD: "/api/upload",
} as const;