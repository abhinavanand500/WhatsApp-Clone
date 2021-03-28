import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIxzRFJ-B7yMWZdKIkK_vSUQBjMmdDPug",
    authDomain: "whatsapp-77d84.firebaseapp.com",
    projectId: "whatsapp-77d84",
    storageBucket: "whatsapp-77d84.appspot.com",
    messagingSenderId: "984513487227",
    appId: "1:984513487227:web:5bcf0f3b24c3ef27409dde",
    measurementId: "G-KK6EQVKLS8",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
 