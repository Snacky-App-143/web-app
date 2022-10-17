import { AuthError } from '@firebase/auth';
import { FirestoreError } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { Notify, QNotifyCreateOptions } from 'quasar';
import { dialog, notify, showError } from 'src/modules/helpers';
import { useI18n } from 'vue-i18n';
import prettyBytes from 'pretty-bytes';
import { scroll } from 'quasar';
import useEventBus from './useEventBus';

type ConfirmDialogOptions = {
  title: string;
  message: string;
  ok: string;
  cancel: string;
  color: string;
};

export default function () {
  const { t } = useI18n();
  const { bus } = useEventBus();
  const { getScrollTarget, setVerticalScrollPosition } = scroll;

  function scrollToElement(
    scrollTarget: Element,
    offset: number,
    duration = 100
  ) {
    const target = getScrollTarget(scrollTarget);
    setVerticalScrollPosition(target, offset, duration);
  }

  function successNotify(opts: QNotifyCreateOptions) {
    Notify.create({
      ...opts,
      color: 'positive',
    });
  }

  function showErrorNotify(
    error: unknown | FirebaseError | AuthError | FirestoreError
  ) {
    if (error instanceof FirestoreError) {
      showError(error, t(`firestore-error.${error.code}`));

      return;
    }

    if (error instanceof FirebaseError) {
      showError(error, t(`firebase-error.${error.code}`));

      return;
    }

    showError(error, t('runtime-error'));
  }

  function confirm(data?: Partial<ConfirmDialogOptions>) {
    const defaultOptions: ConfirmDialogOptions = {
      title: t('confirmation-dialog.title'),
      message: t('confirmation-dialog.message'),
      ok: t('confirmation-dialog.ok'),
      cancel: t('confirmation-dialog.cancel'),
      color: 'primary',
    };

    const { title, message, ok, cancel, color } = {
      ...defaultOptions,
      ...data,
    };
    return dialog({
      title,
      message,
      ok,
      cancel,
      color,
    });
  }

  return {
    showError: showErrorNotify,
    notify,
    successNotify,
    t,
    confirm,
    prettyBytes,
    scrollToElement,
    bus,
  };
}
