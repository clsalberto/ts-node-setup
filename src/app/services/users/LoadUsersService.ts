import { IUsersRepository } from '~/app/contracts/repositories'
import { IServiceBase } from '~/app/contracts/services'
import { User } from '~/app/entities'

export class LoadUsersService implements IServiceBase {
  constructor(private usersRepository: IUsersRepository) {}

  execute(): Promise<User[]> {
    const users = this.usersRepository.load()

    return users
  }
}
