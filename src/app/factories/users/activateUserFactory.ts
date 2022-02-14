import { ActivateUserController } from '~/app/controllers'
import { PrismaUsersRepository } from '~/app/repositories/prisma'
import { ActivateUserService } from '~/app/services'

export const activateUserFactory = () => {
  const usersRepository = new PrismaUsersRepository()
  const activateUserService = new ActivateUserService(usersRepository)
  const activateUserController = new ActivateUserController(activateUserService)

  return activateUserController
}
