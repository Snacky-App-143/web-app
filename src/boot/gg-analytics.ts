import { getAnalytics } from 'firebase/analytics';
import { firebaseApp } from './firebase';

const ggAnalytics = getAnalytics(firebaseApp);

export { ggAnalytics };
