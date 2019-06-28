import urlsafeBase64 from 'urlsafe-base64';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';


const decodedVapidPublicKey = urlsafeBase64.decode(process.env.REACT_APP_VAPID_PUBLIC_KEY);
const convertedVapidKey = new Uint8Array(decodedVapidPublicKey);

const setupNotifications = () => {
navigator.serviceWorker.ready
.then(function(registration) {
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
    if (subscription) {
      return subscription;
    }
 
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {
  console.log('subscription', subscription);
  axios.post('/api/subscribe', {subscription});

});

//check if the browser supports notifications
if (!("Notification" in window)) {
  console.error("This browser does not support desktop notification");
}

//check whether notification permissions have already been granted
else if (Notification.permission === "granted") {
  console.log("Permission to receive notifications has been granted");
}

// Otherwise, we need to ask the user for permission
else if (Notification.permission !== 'denied') {
  Notification.requestPermission(function (permission) {
  // If the user accepts, let's create a notification
    if (permission === "granted") {
      console.log("Permission to receive notifications has been granted");
    }
  });
}

serviceWorker.register();
}

export default setupNotifications;