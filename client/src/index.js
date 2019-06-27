import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import setupNotifications from './setupNotifications';


axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

if(localStorage.getItem('token')) {
  setupNotifications();
}

// const decodedVapidPublicKey = urlsafeBase64.decode(process.env.REACT_APP_VAPID_PUBLIC_KEY);
// const convertedVapidKey = new Uint8Array(decodedVapidPublicKey);


// navigator.serviceWorker.ready
// .then(function(registration) {
//   return registration.pushManager.getSubscription()
//   .then(async function(subscription) {
//     if (subscription) {
//       return subscription;
//     }
    // const response = await fetch('./vapidPublicKey');
    // const vapidPublicKey = await response.text();
    // const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
 
//     return registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: convertedVapidKey
//     });
//   });
// }).then(function(subscription) {
//   console.log('subscription', subscription)
//   axios.post('/api/subscribe', {subscription});

  // document.getElementById('doIt').onclick = function() {
  //   const delay = document.getElementById('notification-delay').value;
  //   const ttl = document.getElementById('notification-ttl').value;

  //   fetch('/api/users', {
  //     method: 'post',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       subscription: subscription,
  //       delay: delay,
  //       ttl: ttl,
  //     }),
  //   });
  // };

// });

// // Let's check if the browser supports notifications
// if (!("Notification" in window)) {
//   console.error("This browser does not support desktop notification");
// }

// // Let's check whether notification permissions have already been granted
// else if (Notification.permission === "granted") {
//   console.log("Permission to receive notifications has been granted");
// }

// // Otherwise, we need to ask the user for permission
// else if (Notification.permission !== 'denied') {
//   Notification.requestPermission(function (permission) {
//   // If the user accepts, let's create a notification
//     if (permission === "granted") {
//       console.log("Permission to receive notifications has been granted");
//     }
//   });
// }

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
