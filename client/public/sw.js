self.addEventListener('push', function(event) {
    console.log("event in SW", event.data.text());
      event.waitUntil(
    
        self.registration.showNotification('Paw Print', {
          lang: 'en',
          body: event.data.text().toLowerCase(),
        })
      );
    });


    // self.addEventListener("push", (event) => {
    //     let title = "PawPrint";
    //     let body = "We have received a push message";
    //     let tag = "push-simple-demo-notification-tag";
    //     let icon = '/assets/my-logo-120x120.png';
      
    //     event.waitUntil(
    //       self.registration.showNotification(title, { body, icon, tag })
    //     )
    //   });



    // self.addEventListener("push", (event) => {
    //     let title = (event.data && event.data.text()) || "Yay a message";
    //     let body = "We have received a push message";
    //     let tag = "push-simple-demo-notification-tag";
    //     let icon = '/assets/my-logo-120x120.png';
      
    //     event.waitUntil(
    //       self.registration.showNotification(title, { body, icon, tag })
    //     )
    //   });