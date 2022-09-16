import { AuthError } from '@firebase/auth';
import { FirestoreError } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { date, Dialog, Notify, QDialogOptions } from 'quasar';
import { QNotifyCreateOptions } from 'quasar';

export const notify = (opts: QNotifyCreateOptions) => {
  Notify.create({
    ...opts,
  });
};

export const showError = (
  error: unknown | FirebaseError | AuthError | FirestoreError,
  message?: string
) => {
  if (import.meta.env.DEV) {
    console.error(`Error: %c${error}.`, 'color: salmon;');
  }

  notify({
    icon: 'mdi-information',
    color: 'negative',
    message: message ?? 'Error',
  });
};

export const dateFomatter = ({
  value,
  format,
}: {
  value: string;
  format?: string;
}) => {
  const dateFormat = format ?? 'DD/MM/YYYY';

  return date.formatDate(value, dateFormat);
};

export const dialog = (opts: QDialogOptions) => {
  return Dialog.create(opts);
};
