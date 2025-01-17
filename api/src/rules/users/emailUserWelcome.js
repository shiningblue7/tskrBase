import { logger } from 'src/lib/logger'
import { apiProperties } from 'src/lib/apiProperties'
let Mailgun = require('mailgun-js')
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['create'],
  file: __filename,
  table: 'user',
  command: async function ({ record }) {
    try {
      if (
        process.env.MAILGUN_API_KEY &&
        process.env.MAILGUN_DOMAIN &&
        apiProperties.email.active &&
        record.email.indexOf('@example.com') == -1
      ) {
        let mailgun = new Mailgun({
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        })
        let email = record.email
        let name = record.name
        let html = `<h1>Welcome ${name}</h1>
<p>I am thrilled that you're here. You’ll love automating your work with Tskr. </p>
<p>Tskr was designed to get you tracking your stuff quickly in a way where it's your data end to end.</p>
<p>One question before I go: reply to this email and let me know why you signed up? </p>
<p>Thanks,<br/>
Jace</p>


<p>Are you interested in contributing?</p>
<hr />
<p>Shoot me a response and I'll help however I can.  If you'd rather jump into here's some links.</p>
<ul>
  <li><a href="https://github.com/tskrio/tskr/issues/new?body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.">Give us feedback</a></li>
  <li><a href="mailto:jace@tskr.io">Shoot me an email with your thoughts</a></li>
  <li><a href="https://github.com/tskrio/tskr/">Contribute to the codebase</a></li>
  <li><a href="https://github.com/tskrio/docs/">Contribute to the documentation</a></li>
  <li><a href="https://github.com/tskrio/tskr/issues/new?body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.">Contribute to the design</a></li>
</ul>

      If you'd like to poke around the site you can do so at <a href="https://demo.tskr.io">demo.tskr.io</a>
      `
        let mail = {
          from: `Tskr <jace@${process.env.MAILGUN_DOMAIN}>`,
          //'h:Reply-To': 'jace@tskr.io',//not working
          to: email,
          subject: `Welcome to Tskr`,
          html: html,
        }
        mailgun.messages().send(mail, function (error, body) {
          if (error) {
            logger.error(error)
          } else {
            logger.info(body)
            console.log('mailgun.message().send()', body)
          }
        })
      } else {
        logger.error(
          `
          mail not sent
          - apiProperties.email.action=${apiProperties.email.active}
          - record.email.indexOf('@example.com') == -1 ${
            record.email.indexOf('@example.com') == -1
          }
          `
        )
      }
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}
