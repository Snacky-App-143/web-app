import { boot } from 'quasar/wrappers';
import { dateFomatter } from 'src/modules/helpers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dateFomatter: typeof dateFomatter;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$dateFomatter = dateFomatter;
});
