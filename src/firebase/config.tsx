import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoVIFUZ5HV35shTGviAVH5XYAH33-bRvo",
  authDomain: "cooking-ninja-site-555.firebaseapp.com",
  projectId: "cooking-ninja-site-555",
  storageBucket: "cooking-ninja-site-555.appspot.com",
  messagingSenderId: "686783526785",
  appId: "1:686783526785:web:29c1c8f51a91c21fa29a80",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
