// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import fb from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBFrRdZXMVg4K3Yj620r7ZBrzlHoYMMTJo',
  authDomain: 'clone-5db3a.firebaseapp.com',
  projectId: 'clone-5db3a',
  storageBucket: 'clone-5db3a.appspot.com',
  messagingSenderId: '291648682131',
  appId: '1:291648682131:web:37b0afda27c96f3801b566',
  measurementId: 'G-R62MBLQDTC',
};
!fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

const db = fb.firestore();
export default db;
