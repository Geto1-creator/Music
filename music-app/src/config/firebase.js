// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ9dATvNcorfNp14Gn92jamfp3DS_tcgc",
  authDomain: "playlist-mock.firebaseapp.com",
  projectId: "playlist-mock",
  storageBucket: "playlist-mock.appspot.com",
  messagingSenderId: "973503100848",
  appId: "1:973503100848:web:e30071738a6707c63dc875",
  measurementId: "G-N0Q2067J4Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
