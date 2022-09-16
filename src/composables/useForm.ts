import {
  createI18nMessage,
  required,
  email,
  sameAs,
  requiredIf,
} from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';

export default function () {
  const { t } = useI18n();
  const messagePath = (data: { $validator: string; $propertyPath: string }) =>
    `validation-messages.${data.$propertyPath}.${data.$validator}`;
  const withI18nMessage = createI18nMessage({ t, messagePath });

  return {
    rules: {
      required: withI18nMessage(required),
      email: withI18nMessage(email),
      sameAs: withI18nMessage(sameAs, {
        withArguments: true,
      }),
      requiredIf: withI18nMessage(requiredIf, {
        withArguments: true,
      }),
    },
  };
}
