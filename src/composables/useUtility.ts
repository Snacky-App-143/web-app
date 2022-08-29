import { AuthError } from '@firebase/auth';
import { FirestoreError } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { Notify, QNotifyCreateOptions } from 'quasar';
import { useI18n } from 'vue-i18n';

export default function () {
  const { t } = useI18n();

  function notify(opts: QNotifyCreateOptions) {
    Notify.create({
      ...opts,
    });
  }

  function successNotify(opts: QNotifyCreateOptions) {
    Notify.create({
      ...opts,
      color: 'positive',
    });
  }

  function showError(
    error: unknown | FirebaseError | AuthError | FirestoreError
  ) {
    if (error instanceof FirestoreError) {
      notify({
        icon: 'mdi-information',
        color: 'negative',
        message: t(`firestore-error.${error.code}`),
      });
      return;
    }

    if (error instanceof FirebaseError) {
      notify({
        icon: 'mdi-information',
        color: 'negative',
        message: t(`firebase-error.${error.code}`),
      });
      return;
    }
  }

  return {
    showError,
    notify,
    successNotify,
    t,
  };
}
