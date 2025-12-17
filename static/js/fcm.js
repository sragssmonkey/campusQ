// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Register service worker
navigator.serviceWorker.register("/static/firebase-messaging-sw.js")
  .then((registration) => {
    messaging.useServiceWorker(registration);
  });

// Request permission + get token
async function initFCM() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Notifications blocked");
    return;
  }

  const token = await messaging.getToken({
    vapidKey: "YOUR_VAPID_PUBLIC_KEY",
  });

  console.log("FCM Token:", token);

  // Send token to Django
  await fetch("/api/save-fcm-token/", {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("firebaseToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fcm_token: token }),
  });
}

// Call this after login
initFCM();

// Foreground messages
messaging.onMessage((payload) => {
  alert(payload.notification.title + ": " + payload.notification.body);
});
