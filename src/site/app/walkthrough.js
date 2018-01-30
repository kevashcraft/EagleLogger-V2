export default function (app) {
  app.tour.addStep('Welcome', {
    title: 'EagleLogger Walkthrough',
    text: "Welcome to EagleLogger!<br>Let's walk through the basics.",
    attachTo: '.shepherd-welcome top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.tour.next()
        }
      }
    ]
  })
  app.tour.addStep('Active Nets', {
    title: 'Active Nets',
    text: 'Nets currently in progress will be listed here.<br>Click on one to view it.',
    attachTo: '.shepherd-active-nets top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.tour.hide()
          app.$router.push('/nets/1')
          setTimeout(() => {
            app.tour.next()
          }, 500)
        }
      }
    ]
  })
  app.tour.addStep('Net Checkins', {
    title: 'Net Checkins',
    text: 'This is the net page.<br>The top part shows the stations checked into the net.',
    attachTo: '.shepherd-net-checkins top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.tour.next()
        }
      }
    ]
  })
  app.tour.addStep('Net Chat', {
    title: 'Net Chat',
    text: 'The bottom part shows the live chat.<br>Sign up to join!',
    attachTo: '.shepherd-net-chat top',
    scrollTo: true,
    buttons: [
      {
        text: 'Finish',
        action: () => {
          app.closeNavDrawer()
          app.tour.next()
        }
      }
    ]
  })
}
