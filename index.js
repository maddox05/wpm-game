// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDg4IiqDslVsWmX9P0o4-HVsffkzs_xASY",
    authDomain: "wpm-typer.firebaseapp.com",
    projectId: "wpm-typer",
    storageBucket: "wpm-typer.appspot.com",
    messagingSenderId: "886165190106",
    appId: "1:886165190106:web:c56a6299a5819b8d44bce3",
    measurementId: "G-RJ5PWE297S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);