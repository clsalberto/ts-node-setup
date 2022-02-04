import { User } from '~/domain/entities'

export interface IUsersRepository {
  exists(email: string): Promise<boolean>
  create(user: User): Promise<User>
}
