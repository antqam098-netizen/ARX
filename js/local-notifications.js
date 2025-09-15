
// local-notifications.js
// This schedules notifications while the web app is open (or in foreground).
// It cannot reliably wake the device when completely offline in background on most browsers.
// For offline scheduled notifications you need a native wrapper (Capacitor/Cordova) or TWA.

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  let perm = Notification.permission;
  if (perm === 'default') perm = await Notification.requestPermission();
  return perm === 'granted';
}

// show immediate notification
export function showNotification(title, body) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'show-notification',
      title,
      options: { body }
    });
    return;
  }
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}

// schedule notification after seconds (works only while app JS is running)
export function scheduleNotificationIn(seconds, title, body) {
  if (seconds <= 0) { showNotification(title, body); return; }
  setTimeout(() => showNotification(title, body), seconds * 1000);
}
