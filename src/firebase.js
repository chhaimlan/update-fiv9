import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOI3NQ0624UQgL2LKb6UHHik2oi5aic54",
  authDomain: "todo-fire-f229d.firebaseapp.com",
  projectId: "todo-fire-f229d",
  storageBucket: "todo-fire-f229d.appspot.com",
  messagingSenderId: "3828342682",
  appId: "1:3828342682:web:4c1b9fab7d64c977e56423",
  measurementId: "G-GSQP26YJFX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
