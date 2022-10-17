import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus;
  }
}

export const bus = new EventBus();
export default boot(({ app }) => {
  // for Options API
  app.config.globalProperties.$bus = bus;
});
