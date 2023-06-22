// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuO0KY-yfiqgakTDfZ60sYUVdaLBnWNys",
  authDomain: "influenx-6aae8.firebaseapp.com",
  projectId: "influenx-6aae8",
  storageBucket: "influenx-6aae8.appspot.com",
  messagingSenderId: "118688294299",
  appId: "1:118688294299:web:8c4cf2627abf86dc75ed3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth();
export const storage = getStorage(app);