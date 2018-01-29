import FeedbackModel from './FeedbackModel'
import Mail from '../Mail/Mail'
import UsersModel from '../Users/UsersModel'

exports.create = async (req) => {
  let user = await UsersModel.retrieve(req.token.userId)
  await FeedbackModel.create(user.id, req.page, req.message)

  let email = user.email || user.callsign + '@arrl.net'
  let to = 'feedback@eaglelogger.com'
  let subject = 'EagleLogger Feedback'
  let message = `
    Hello! There's been some feedback from the app.

    FROM: ${user.callsign} (${user.name})
    EMAIL: ${email}
    PAGE: ${req.page}

    --- MESSAGE START ---
      ${req.message}
    --- MESSAGE END ---

    73 de EagleLogger
  `
  Mail.create({to, subject, message})

  return true
}
