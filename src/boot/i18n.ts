import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import enUs from 'src/i18n/en-US/index.json'


export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    messages: {
      'en-US': enUs
    },
  });

  // Set i18n instance on app
  app.use(i18n);
});
