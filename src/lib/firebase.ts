import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  credential: cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  }),
};

if (getApps().length <= 0) {
  initializeApp(firebaseAdminConfig);
}

export const firestoreApp = getFirestore();
