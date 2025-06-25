// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV9vWNyu7ByarseCkw-zQQdAh8yFvcwaA",
  authDomain: "moviebuddy-e0bdf.firebaseapp.com",
  projectId: "moviebuddy-e0bdf",
  storageBucket: "moviebuddy-e0bdf.appspot.com",
  messagingSenderId: "92019221908",
  appId: "1:92019221908:web:bb455f572768ad59f61b81"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
