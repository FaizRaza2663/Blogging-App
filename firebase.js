
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, getFirestore, Timestamp, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAj0SLjYuyASTu9REpbhoEjbxSSYPd0d-I",
    authDomain: "blogging-app-314a1.firebaseapp.com",
    projectId: "blogging-app-314a1",
    storageBucket: "blogging-app-314a1.appspot.com",
    messagingSenderId: "762403474806",
    appId: "1:762403474806:web:d8677689d3be8498dbfe57",
    measurementId: "G-XY0FC14KH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);


export {
    app,
    analytics,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    addDoc,
    collection,
    db,
    Timestamp, query, onSnapshot,
    signOut
}