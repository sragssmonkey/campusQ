importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/static/icon.png", // optional
    }
  );
});
