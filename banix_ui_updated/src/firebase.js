import firebase from "firebase/app";
import "firebase/auth";
// firebase config
// Banix firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_yV4j8TY2SpEp4Ijrnrv2wck2i63Zdb0",
  authDomain: "banix-6b11c.firebaseapp.com",
  projectId: "banix-6b11c",
  storageBucket: "banix-6b11c.appspot.com",
  messagingSenderId: "809291043317",
  appId: "1:809291043317:web:57e6e62df56c0d2049d0bc",
  measurementId: "G-MSY97Y341D",
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
