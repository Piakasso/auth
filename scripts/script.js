"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
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
const provider = new GoogleAuthProvider();

const form = document.querySelector(".form");
const buttonSignIn = document.querySelector(".button_signin");
const buttonSignUp = document.querySelector(".button_signup");
const googleButtons = document.querySelectorAll(".google__auth");
const close = document.querySelector(".form__close");
const notice = document.querySelector(".form__notice");
const noticeSignUp = document.querySelector(".form__notice-signup");

const signUpLink = document.querySelector(".form__signup a");
const signUp = document.querySelector("._signup");
const signIn = document.querySelector("._signin");
const eyeHide = document.querySelectorAll(".eye__hide");
const eyeShow = document.querySelectorAll(".eye__show");

//Sign In

function signInUseEmailPassword(loginEmail, loginPassword) {
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "./login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      notice.style.display = "block";
    });
}

buttonSignIn.addEventListener("click", (e) => {
  e.preventDefault();

  const loginEmail = document.querySelector("#email").value;
  const loginPassword = document.querySelector("#password").value;
  signInUseEmailPassword(loginEmail, loginPassword);
});

//Sign Up

signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  signUp.style.display = "block";
  signIn.style.display = "none";
});

buttonSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  let registerEmail = document.querySelector("#email__signup").value;
  let registerPassword = document.querySelector("#password__signup").value;
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      signInUseEmailPassword(registerEmail, registerPassword);
      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        // ...
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        noticeSignUp.style.display = "block";
        noticeSignUp.innerHTML = "This account already exist";
        setTimeout(function () {
          window.location.replace("./index.html");
        }, 3000);
      } else if (errorCode === "auth/weak-password") {
        noticeSignUp.style.display = "block";
        noticeSignUp.innerHTML = "Weak password.Need more 6 characters";
      }
    });
});

// Hide/Show password

document.querySelectorAll(".password__title").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault;
    eyeHide.forEach((item) => {
      item.classList.toggle("_active");
      let registerPassword = document.querySelector("#password__signup");
      if (item.classList.contains("_active")) {
        registerPassword.type = "text";
      } else {
        registerPassword.type = "password";
      }
    });
    eyeShow.forEach((item) => {
      item.classList.toggle("_active");
      let loginPassword = document.querySelector("#password");
      if (item.classList.contains("_active")) {
        loginPassword.type = "text";
      } else {
        loginPassword.type = "password";
      }
    });
  });
});

//Close modal

close.addEventListener("click", (e) => {
  form.style.display = "none";
});

//Google auth

googleButtons.forEach((google) =>
  google.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });
        window.location.href = "./login.html";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  })
);
