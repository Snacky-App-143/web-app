import { initializeApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { boot } from 'quasar/wrappers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $db: Firestore;
  }
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default boot(({ app }) => {
  // Connect to emulator on local
  if (process.env.IS_EMULATOR_ENABLE) {
    connectFirestoreEmulator(
      db,
      process.env.FIRESTORE_EMULATOR_HOST,
      process.env.FIRESTORE_EMULATOR_PORT
    );
  }

  app.config.globalProperties.$db = db;
});

export { db, firebaseApp };
