import { boot } from 'quasar/wrappers';
import {
  getStorage,
  FirebaseStorage,
  connectStorageEmulator,
} from '@firebase/storage';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebaseStorage: FirebaseStorage;
  }
}

export const firebaseStorage = getStorage();

export default boot(({ app }) => {
  // Connect to emulator on local
  if (process.env.IS_EMULATOR_ENABLE) {
    connectStorageEmulator(
      firebaseStorage,
      process.env.STORAGE_EMULATOR_HOST,
      process.env.STORAGE_EMULATOR_PORT
    );
  }
  app.config.globalProperties.$firebaseStorage = firebaseStorage;
});
