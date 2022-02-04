import { hash } from 'bcryptjs'

import { ICreateUserUseCase, IUserRequest } from '~/domain/contracts/usecases'
import { User } from '~/domain/entities'

import { IMailProvider } from '~/data/contracts/providers/mail'
import { IUsersRepository } from '~/data/contracts/repositories'

export class CreateUserService implements ICreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({
    name,
    email,
    password,
    activated
  }: IUserRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.exists(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const password_hash = await hash(password, 8)

    const instanceUser = await User.create({
      name,
      email,
      password_hash,
      activated
    })

    const user = await this.userRepository.create(instanceUser)

    await this.mailProvider.send({
      to: {
        name: user.name,
        email: user.email
      },
      from: {
        name: 'Equipe Project',
        email: 'equipe@project.com'
      },
      subject: 'Bem-vindo a nossa plataforma',
      html: `<h3>Olá, ${user.name}!</h3>
             <p>Clique no link para ativar seu acesso à nossa plataforma.</p>`
    })

    return user
  }
}
