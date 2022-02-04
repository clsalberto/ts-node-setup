import { CreateUserService } from '~/data/services'

import { MailtrapMailProvider } from '~/infrastructure/providers'
import { PrismaUsersRepository } from '~/infrastructure/repositories/prisma'

import { CreateUserController } from '~/presentation/controllers'

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository()
  const mailProvider = new MailtrapMailProvider()
  const createUserService = new CreateUserService(usersRepository, mailProvider)
  const createUserController = new CreateUserController(createUserService)

  return createUserController
}
