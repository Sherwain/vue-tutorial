import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBK8gEh34wg8xaC_-nIxgXfEptEOs3ljeI',
  authDomain: 'vue-http-demo-234e6.firebaseapp.com',
  databaseURL: 'https://vue-http-demo-234e6-default-rtdb.firebaseio.com',
  projectId: 'vue-http-demo-234e6',
  storageBucket: 'vue-http-demo-234e6.appspot.com',
  messagingSenderId: '600829407834',
  appId: '1:600829407834:web:84276925fde33e90dc5e63',
});

const firebaseAuth = getAuth(firebaseApp);

export default {
  firebaseAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
