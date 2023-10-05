import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUFruj_j1hORyPW0eNQgboqs7jZk8OAZc",
  authDomain: "cs5513-week07-2023-jmike8385.firebaseapp.com",
  projectId: "cs5513-week07-2023-jmike8385",
  storageBucket: "cs5513-week07-2023-jmike8385.appspot.com",
  messagingSenderId: "238807161811",
  appId: "1:238807161811:web:9ebb576bb688239a0ced26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };