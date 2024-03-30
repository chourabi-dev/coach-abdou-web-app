importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

firebase.initializeApp({
  // Your Firebase configuration
  apiKey: "AIzaSyDVX-ZfxhaaMB7uYJZdLW2NrRk63xBEQic",
  authDomain: "coachabdou-818ad.firebaseapp.com",
  databaseURL: "https://coachabdou-818ad.firebaseio.com",
  projectId: "coachabdou-818ad",
  storageBucket: "coachabdou-818ad.appspot.com",
  messagingSenderId: "671727476299",
  appId: "1:671727476299:web:d85eae5faa1adeeab2b7ce",
  measurementId: "G-0M7CC8KF88"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  // Customize the handling of the received push notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  ServiceWorkerRegistration.showNotification(notificationTitle, notificationOptions);
});
