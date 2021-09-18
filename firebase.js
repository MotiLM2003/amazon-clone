// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
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

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app;

const db = app.firestore();
export default db;
