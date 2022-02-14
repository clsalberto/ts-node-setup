import { IUsersRepository } from '~/app/contracts/repositories'
import { IServiceBase } from '~/app/contracts/services'
import { User } from '~/app/entities'

export class ActivateUserService implements IServiceBase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(token: string): Promise<User> {
    try {
      const userToken = await this.usersRepository.findByToken(token)

      if (!userToken) {
        throw new Error('Missing or invalid token')
      }

      const now = new Date()

      if (now > userToken.expired_at) {
        throw new Error('Activation time expired')
      }

      if (userToken.activated) {
        throw new Error('User already activated')
      }

      const user = await this.usersRepository.activeByToken(token)

      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
