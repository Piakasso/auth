"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxY-dDZTJDWqfTdALUKbbhCrWCD4Mh_-8",
  authDomain: "auth-app-e88b8.firebaseapp.com",
  projectId: "auth-app-e88b8",
  storageBucket: "auth-app-e88b8.appspot.com",
  messagingSenderId: "350225510939",
  appId: "1:350225510939:web:6648f84f6704f7c8d73ebe",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();
const exit = document.querySelector(".button__logout");
const newpageTitle = document.querySelector(".newpage__title");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    newpageTitle.innerHTML = `Hello, ${user.email}.You was login successfully`;
    // ...
  } else {
    window.location.replace("./index.html");
  }
});

//log out

exit.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {});
});

//
