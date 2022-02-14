import { LoadUsersController } from '~/app/controllers'
import { PrismaUsersRepository } from '~/app/repositories'
import { LoadUsersService } from '~/app/services'

export const loadUsersFactory = () => {
  const usersRepository = new PrismaUsersRepository()
  const loadUsersService = new LoadUsersService(usersRepository)
  const loadUsersController = new LoadUsersController(loadUsersService)

  return loadUsersController
}
