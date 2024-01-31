// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD72630ixq0nEW4INPvxf9-BjGiYP4Xz6I",
  authDomain: "fir-reactv2.firebaseapp.com",
  projectId: "fir-reactv2",
  storageBucket: "fir-reactv2.appspot.com",
  messagingSenderId: "245061460940",
  appId: "1:245061460940:web:c47f216fdf0b661c703369",
  measurementId: "G-NCEW6BMXKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}
