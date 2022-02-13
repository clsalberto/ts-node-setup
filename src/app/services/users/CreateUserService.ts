import { hash } from 'bcryptjs'

import { IUsersRepository } from '~/app/contracts/repositories'
import { User } from '~/app/entities'

import { add } from '~/libs/queue'

interface IUserRequest {
  name: string
  email: string
  password: string
  activated: boolean
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    activated
  }: IUserRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.exists(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const password_hash = await hash(password, 8)

    const createUser = User.create({ name, email, password_hash, activated })

    const user = await this.usersRepository.create(createUser)

    await add('CreateUserMail', { user })

    return user
  }
}
