// var admin = require("firebase-admin");

// var serviceAccount = require("./staycation-da099-firebase-adminsdk-fbsvc-d969415d86.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Check if Firebase Admin is already initialized
const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const auth = getAuth();
const firestore = getFirestore();

export { auth, firestore };
