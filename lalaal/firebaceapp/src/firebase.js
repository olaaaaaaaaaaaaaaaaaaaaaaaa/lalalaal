import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA6ncXv2HYfRQniZCR3dbo3ADhCjKwZQYE",
  authDomain: "todolist-6b229.firebaseapp.com",
  projectId: "todolist-6b229",
  storageBucket: "todolist-6b229.appspot.com",
  messagingSenderId: "93178323536",
  appId: "1:93178323536:web:f48c4a3d2e2f5d1f43e755",
  databaseURL:
    "https://todolist-6b229-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
