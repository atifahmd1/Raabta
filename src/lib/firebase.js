// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {initializeApp} from "firebase/app";
import {getMessaging} from "firebase/messaging";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvgtDa4bq0mEHNXpbKWJQTDIBVaFWuDS4",
  authDomain: "raabta-786.firebaseapp.com",
  projectId: "raabta-786",
  storageBucket: "raabta-786.appspot.com",
  messagingSenderId: "528751578812",
  appId: "1:528751578812:web:cdd7a773b24c2b9069cab9",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebase);

export default firebase;
