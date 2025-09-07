import { initializeApp } from "firebase/app";
// import { getMessaging } from 'firebase/messaging';

const env = process.env.ENV || "dev";
const bucket =
  env === "dev"
    ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV
    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: "your databaseURL here",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: bucket,
  messagingSenderId: `241723989064`,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebase);

export { firebase };
