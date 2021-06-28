import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCwz8W2YuOXqEiKRM3N-hJANM5p_ztks9I",
  authDomain: "whatsapp-42348.firebaseapp.com",
  projectId: "whatsapp-42348",
  storageBucket: "whatsapp-42348.appspot.com",
  messagingSenderId: "689080788391",
  appId: "1:689080788391:web:b2ccd9074a7b9eae300282",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
