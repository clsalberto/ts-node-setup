import { CreateUserController } from '~/app/controllers'
import { PrismaUsersRepository } from '~/app/repositories'
import { CreateUserService } from '~/app/services'

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(usersRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController
}
