importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
