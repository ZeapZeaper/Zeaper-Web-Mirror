// Must be in public/ folder
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB040yGEcwK4e8YDwsJSlm_DtMO0wd2xLI",
  authDomain: "zeap-7de3d.firebaseapp.com",
  projectId: "zeap-7de3d",
  messagingSenderId: "241723989064",
  appId: "1:241723989064:web:96e8f0a4599343aac50c7d",
  measurementId: "G-V9G6DS0BS0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/favicon.ico",
    image: payload.notification.image || "/favicon.ico",
  };
  const isAdminNotification = payload?.data?.roleType === "admin";
  if (isAdminNotification) {
    // do not show toast for admin notifications
    return;
  }
  self.registration.showNotification(notificationTitle, notificationOptions);
});
