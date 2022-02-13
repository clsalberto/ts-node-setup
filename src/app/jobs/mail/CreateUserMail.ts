import { mail } from '~/libs/mail'

export default {
  key: 'CreateUserMail',
  async handle({ data }) {
    const { user } = data

    mail.sendMail({
      to: `${user.name} <${user.email}>`,
      from: 'Equipe Project <equipe@project.com>',
      subject: 'Bem-vimdo a nossa plataforma',
      html: `<h3>Olá, ${user.name}!</h3>`
    })
  }
}
