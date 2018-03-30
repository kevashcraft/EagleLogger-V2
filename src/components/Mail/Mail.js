import sgMail from '@sendgrid/mail'

exports.create = async(req) => {
  console.log('process.env.SENDGRID_API_KEY', process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: req.to,
    from: process.env.EMAIL_FROM,
    subject: req.subject,
    text: req.message
  }
  console.log('msg', msg)
  if (req.html) msg.html = req.html

  try {
    await sgMail.send(msg)
  } catch (err) {
    console.dir(err, {depth: null})
  }

  return true
}
