import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDpoUa897Fsa2TdRmQW1ZXVbSFmYjhnE8",
    authDomain: "ommek-sannefa.firebaseapp.com",
    projectId: "ommek-sannefa",
    storageBucket: "ommek-sannefa.appspot.com",
    messagingSenderId: "402999544540",
    appId: "1:402999544540:web:9e84db560f955ea3b10219"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {timestamp}
export default firebaseApp.firestore();