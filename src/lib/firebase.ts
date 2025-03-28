// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FB_APPID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};
// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const fstore = getFirestore(app);

export { app, auth, fstore };
