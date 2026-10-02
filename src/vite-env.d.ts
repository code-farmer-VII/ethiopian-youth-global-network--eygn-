/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the eygn-api backend, including its `/api/v1` path, e.g. `http://localhost:8080/api/v1`. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
