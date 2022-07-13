import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAIPxifQm8Bx06pRk_YBuLW1FXs0h5amtw',
  authDomain: 'expense-tracker-3fa3a.firebaseapp.com',
  projectId: 'expense-tracker-3fa3a',
  storageBucket: 'expense-tracker-3fa3a.appspot.com',
  messagingSenderId: '637187493513',
  appId: '1:637187493513:web:1240170eb7c09d1fe0c058',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

// init services
// used to login in and out, and signup
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
