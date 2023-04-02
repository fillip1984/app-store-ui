/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ROOT_API_URL: string;
  readonly VITE_API_TIMEOUT: number;
  readonly VITE_TEST_API_USERNAME: string;
  readonly VITE_TEST_API_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
