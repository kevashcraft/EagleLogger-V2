import Shepherd from 'tether-shepherd'

let tour = (app) => {
  app.tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
    }
  })

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

let ncsTour = (app) => {
  app.ncsTour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
    }
  })

  app.ncsTour.addStep('Welcome', {
    title: 'EagleLogger NCS Walkthrough',
    text: "Welcome to EagleLogger!<br>Let's walk through the basics for running a net.",
    attachTo: '.shepherd-welcome top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.hide()
          app.$router.push('/net-types')
          setTimeout(() => {
            app.ncsTour.next()
          }, 500)
        }
      }
    ]
  })
  app.ncsTour.addStep('Net Types', {
    title: 'Net Types',
    text: 'These are the net types, basically templates for the individual nets,<br> with the start time and frequency.',
    attachTo: '.shepherd-net-types top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.hide()
          app.$router.push('/nets')
          setTimeout(() => {
            app.ncsTour.next()
          }, 500)
        }
      }
    ]
  })
  app.ncsTour.addStep('Nets List', {
    title: 'Nets List',
    text: 'The nets are listed here.<br>You can start a new one by clicking the plus (+) button.',
    attachTo: '.shepherd-nets-list top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.hide()
          app.$root.page.$refs.NetStartDialog.open({action: 'create'})
          setTimeout(() => {
            app.ncsTour.next()
          }, 500)
        }
      }
    ]
  })
  app.ncsTour.addStep('Net Start', {
    title: 'Start a Net',
    text: 'To start a net, select the type and the start time.',
    attachTo: '.shepherd-net-start top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.hide()
          app.$root.page.$refs.NetStartDialog.close()
          app.$router.push('/nets/1')
          setTimeout(() => {
            app.$root.page.walkingthrough = true
            setTimeout(() => {
              app.ncsTour.next()
            }, 500)
          }, 500)
        }
      }
    ]
  })
  app.ncsTour.addStep('Net Checkin', {
    title: 'Checkin a Station',
    text: 'To checkin a station to the net,<br>click here and then search for the callsign.',
    attachTo: '.shepherd-net-checkin-btn left',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.hide()
          app.$router.push('/')
          setTimeout(() => {
            app.ncsTour.next()
          }, 500)
        }
      }
    ]
  })
  app.ncsTour.addStep('NCS Finish', {
    title: "That's All",
    text: 'Thanks for taking a look and feel free to send some feedback!',
    attachTo: '.shepherd-welcome top',
    scrollTo: true,
    buttons: [
      {
        text: 'Next',
        action: () => {
          app.closeNavDrawer()
          app.ncsTour.next()
        }
      }
    ]
  })
}

export default function (app) {
  tour(app)
  ncsTour(app)
}
