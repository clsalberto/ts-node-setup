import { createTransport } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import { IMailProvider, IMessage } from '~/data/contracts/providers/mail'

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })
  }

  async send(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.html
    })
  }
}
