// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY } from 'react-native-dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "studyspace2-d4a9f.firebaseapp.com",
  projectId: "studyspace2-d4a9f",
  storageBucket: "studyspace2-d4a9f.appspot.com",
  messagingSenderId: "544462737138",
  appId: "1:544462737138:web:2a05640db7db986892ca6b",
  measurementId: "G-SQ82D3KENY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);