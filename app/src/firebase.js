import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyABtY8wrpBT2VP2SYIHxRPUXEofSJ2Pbiw",
  authDomain: "art-pizza-23b30.firebaseapp.com",
  projectId: "art-pizza-23b30",
  storageBucket: "art-pizza-23b30.appspot.com",
  messagingSenderId: "1001622115949",
  appId: "1:1001622115949:web:729bf3c2b96102b1dc5164",
  measurementId: "G-8F05YKM9NF"
};


firebase.initializeApp(firebaseConfig);

const functions = firebase.app().functions();

// firebase utils
const db = firebase.firestore();
const { firestore } = firebase;
const auth = firebase.auth();
const authProviders = firebase.auth;
const storage = firebase.storage();
// const functions = firebase.functions();
const storageRef = storage.ref();

export default {
  db,
  firestore, // for FieldValue in subsscriptions
  auth,
  authProviders,
  storage,
  storageRef,
  functions,
};
