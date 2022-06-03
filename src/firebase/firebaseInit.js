import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZx9uY7xKM9P8vzLmShQToMPa3KQGFV7E",
  authDomain: "ommek-sannefa-81927.firebaseapp.com",
  databaseURL: "https://ommek-sannefa-81927-default-rtdb.firebaseio.com",
  projectId: "ommek-sannefa-81927",
  storageBucket: "ommek-sannefa-81927.appspot.com",
  messagingSenderId: "1012956467079",
  appId: "1:1012956467079:web:c58cd88e4a0e2d485d0d22"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {timestamp}
export default firebaseApp.firestore();