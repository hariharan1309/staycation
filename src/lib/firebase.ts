// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbFx08KXy134jJvVNB4TMhyx1z6uTHkrI",
  authDomain: "staycation-da099.firebaseapp.com",
  projectId: "staycation-da099",
  storageBucket: "staycation-da099.firebasestorage.app",
  messagingSenderId: "290571580758",
  appId: "1:290571580758:web:874b12cd08a3fdf250d2f7",
  measurementId: "G-YTX1B9SCWP",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
