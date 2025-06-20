// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.AUTH_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  // ... other details from Firebase console
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
