importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");



firebase.initializeApp({
  apiKey: "AIzaSyBifR19eES7DbW3y42x-WMgzZlGK7uHFro",
  authDomain: "evenlyo-marketplace.firebaseapp.com",
  projectId: "evenlyo-marketplace",
  storageBucket: "evenlyo-marketplace.appspot.com",
  messagingSenderId: "40357333457",
  appId: "1:40357333457:web:cf08098fb62eb77b3bb8f0"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title, {
    body,
    data: { url: payload?.fcmOptions?.link },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.notification?.data?.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});