import { User } from '~/app/entities'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>
  findByToken(token: string): Promise<User>
  activeByToken(token: string): Promise<User>
  create(user: User): Promise<User>
  load(): Promise<User[]>
}
