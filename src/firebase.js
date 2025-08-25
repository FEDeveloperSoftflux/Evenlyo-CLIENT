import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getMessaging, isSupported, getToken, onMessage } from "firebase/messaging";
import store from "./store/index";
import { addNotification } from "./store/slices/notificationSlice";





const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, signInWithPopup, signInWithRedirect, getRedirectResult };

export const initFirebaseMessaging = async (uid) => {
  if (!(await isSupported())) return;

  try {
    const messaging = getMessaging(app);

    // register service worker
    const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("Service worker registration:", swReg);

    let token = null;
    try {
      token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
        serviceWorkerRegistration: swReg,
      });
      console.log("FCM token received:", token);
    } catch (err) {
      console.error("Error getting FCM token", err);
      return null;
    }

    if (token && uid) {
      // send token to backend
      await fetch("http://localhost:5000/api/notify/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, title: "Test", body: "Hello world!", token }),
      });
    }

    // Foreground messages
    onMessage(messaging, (payload) => {
      const text = payload?.notification?.body || "New notification";
      store.dispatch(addNotification({ text }));
    });

    return token;
  } catch (err) {
    console.error("FCM init error", err);
    return null;
  }
};