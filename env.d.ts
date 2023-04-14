/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_CACHED_ROUTE: string;
  readonly VITE_API_LABELS_ROUTE: string;
  readonly VITE_API_VLAN_ROUTE: string;
  readonly VITE_API_ORDERS_ROUTE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
