import { mail } from '~/libs/mail'

export default {
  key: 'CreateUserMail',
  async handle({ data }) {
    const { user } = data

    mail.sendMail({
      to: `${user.name} <${user.email}>`,
      from: 'Equipe Project <equipe@project.com>',
      subject: 'Bem-vimdo a nossa plataforma',
      html: `<h2 style="font-family: 'Lucida Sans', sans-serif;">${process.env.APP_NAME}</h2>
            <h3 style="font-family: 'Lucida Sans', sans-serif;">Olá, ${user.name}!</h3>
            <p style="font-family: 'Lucida Sans', sans-serif;">
              Obrigado por se cadastrar em nossa plataforma, para ativar seu login de acesso
              clique no link abaixo.
            </p>
            <p style="font-family: 'Lucida Sans', sans-serif;">
              <a
                style="font-family: 'Lucida Sans', sans-serif;"
                href="${process.env.APP_URL}/api/users/activate/${user.token}"
                target="_blank"
              >
                ${process.env.APP_URL}/api/users/activate/${user.token}
              </a>
            </p>
            <p style="font-family: 'Lucida Sans', sans-serif;">
              Caro(a) ${user.name}, se você não reconhece esse mail favor desconsiderar.
            </p>
            <p style="font-family: 'Lucida Sans', sans-serif;">
              Atenciosamente, <br />
              <strong>Equipe ${process.env.APP_NAME}</strong>
            </p>`
    })
  }
}
