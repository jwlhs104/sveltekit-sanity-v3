import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDy_mdNNVFNevsvUQhtOisd0dn4Wkvp9j4",
  authDomain: "blog-eff28.firebaseapp.com",
  projectId: "blog-eff28",
  storageBucket: "blog-eff28.appspot.com",
  messagingSenderId: "510721411632",
  appId: "1:510721411632:web:a9e21c2d2adb52a93a7bf5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
