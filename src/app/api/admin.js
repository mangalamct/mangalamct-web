import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: cert({
        projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PK.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

const db = admin?.firestore();
const FieldValue = admin.firestore.FieldValue;
export { admin,db ,FieldValue};
