import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyCwz8W2YuOXqEiKRM3N-hJANM5p_ztks9I",
//   authDomain: "whatsapp-42348.firebaseapp.com",
//   projectId: "whatsapp-42348",
//   storageBucket: "whatsapp-42348.appspot.com",
//   messagingSenderId: "689080788391",
//   appId: "1:689080788391:web:b2ccd9074a7b9eae300282",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCoszFP_TBfbQAcYYXz3AM2GeDYVQ43aCI",
  authDomain: "chit-chat-dc73c.firebaseapp.com",
  projectId: "chit-chat-dc73c",
  storageBucket: "chit-chat-dc73c.appspot.com",
  messagingSenderId: "916206946667",
  appId: "1:916206946667:web:a7f6aa693f0c0101daa42e",
  measurementId: "G-JHMN7WBH5F",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
