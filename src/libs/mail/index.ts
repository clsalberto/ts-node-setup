import nodemailer from 'nodemailer'

import { configMail } from '~/config/mail'

const mail = nodemailer.createTransport(configMail)

export { mail }
