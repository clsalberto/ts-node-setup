import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '~/app/contracts/repositories'
import { User } from '~/app/entities'

import { add } from '~/libs/queue'

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    const now = new Date()
    Object.assign(user, {
      id: uuid(),
      token: crypto.randomBytes(30).toString('hex'),
      expired_at: new Date(now.setHours(now.getHours() + 6))
    })

    this.users.push(user)

    const log = {
      type: 'info',
      message: 'Fake: Create new user',
      data: user
    }
    await add('CreateSystemLog', { log })

    return user
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some(user => user.email === email)
    return user
  }
}
