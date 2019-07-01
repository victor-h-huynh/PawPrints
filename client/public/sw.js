// self.addEventListener('push', function(event) {
//     console.log("event in SW", event.data);
//       event.waitUntil(
    
//         self.registration.showNotification('News from Paw Print:', {
//           lang: 'en',
//           body: event.data.text().toLowerCase(),
//           image: event.data.image,
//           icon: 'favicon.ico',
//           actions: [
//             {
//               action: 'view pet',
//               title: 'click here to view the profile',
//             }
//           ]
//         })
//       );
//     });

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
      axios.post('http://localhost:3001/api/subscribe', {
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });
    })
  );
});



    self.addEventListener("push", (event) => {
      console.log("event in SW", event.data);
        const title = "News from PawPrint";
        const body = event.data.text().toLowerCase();
        const icon = 'favicon.ico';
        const image = './src/assets/catImageCropped.jpg'
        const data = {
          URL: '/pets/10',
        }
        const actions = [{
            action: 'view pet',
            title: 'click here to view the profile',
          }]
      
        event.waitUntil(
          self.registration.showNotification(title, { body, icon, actions, image, data})
        )
      });

      self.addEventListener('notificationclick', function(event) {
        console.log("event notification", event.notification);
        console.log("event notification data", event.notification.data);
        const URL = event.notification.data[URL];
        console.log(URL);
        const clickedNotification = event.notification;
        clickedNotification.close();
      
        // Do something as the result of the notification click
        const promiseChain = clients.openWindow(URL);
        event.waitUntil(promiseChain);
      });



    // self.addEventListener("push", (event) => {
    //     let title = (event.data && event.data.text()) || "Yay a message";
    //     let body = "We have received a push message";
    //     let tag = "push-simple-demo-notification-tag";
    //     let icon = '/assets/my-logo-120x120.png';
      
    //     event.waitUntil(
    //       self.registration.showNotification(title, { body, icon, tag })
    //     )
    //   });