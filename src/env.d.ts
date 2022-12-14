/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID: string;
    API_ENDPOINT: string;
    FIRESTORE_EMULATOR_HOST: string;
    FIRESTORE_EMULATOR_PORT: number;
    FIREBASE_AUTH_ENDPOINT: string;
    IS_EMULATOR_ENABLE: string;
    STORAGE_EMULATOR_HOST: string;
    STORAGE_EMULATOR_PORT: number;
  }
}
