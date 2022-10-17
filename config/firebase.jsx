import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_FIREBASE_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()