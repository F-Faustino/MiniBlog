// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCV2e91KBUF9Oq6r_HR-g3p0_YedM2kq4",
  authDomain: "miniblog-2df64.firebaseapp.com",
  projectId: "miniblog-2df64",
  storageBucket: "miniblog-2df64.appspot.com",
  messagingSenderId: "832704238972",
  appId: "1:832704238972:web:fb73fef116fdf6540e40f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}