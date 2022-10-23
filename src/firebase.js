// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import firebase from 'firebase'
import { initializeApp } from "firebase/app";
//import firebase from "firebase/app";
//import 'firebase/auth'
import { getAuth } from 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBs9UnLZa_M_pGQ0RmeEtNBux8hfoajWo",
  //apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bugs-api.firebaseapp.com",
  databaseURL: "https://bugs-api-default-rtdb.firebaseio.com/bugs.json",
  projectId: "bugs-api",
  storageBucket: "bugs-api.appspot.com",
  messagingSenderId: "209086481505",
  appId: "1:209086481505:web:9a0b5ac97c27bb898a9620",
  measurementId: "G-DHEEM9TW00"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.getAuth()
export const auth = getAuth()
// const analytics = getAnalytics(app);

//const firebaseApp = firebase.initializeApp(firebaseConfig)
//firebase.initializeApp(firebaseConfig)

//const auth = firebase.getAuth()
//const provider = new firebase.getAuth.GoogleAuthProvider()

//export default { auth, provider };
// export default firebase;