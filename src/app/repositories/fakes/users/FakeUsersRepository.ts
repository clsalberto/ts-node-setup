import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '~/app/contracts/repositories'
import { User } from '~/app/entities'

import { add } from '~/libs/queue'

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async load(): Promise<User[]> {
    const log = {
      type: 'info',
      message: 'Fake: Loading registered users',
      data: {}
    }
    await add('CreateSystemLog', { log })

    return this.users.sort(function (a, b) {
      if (a.created_at < b.created_at) {
        return 1
      }
      if (a.created_at > b.created_at) {
        return -1
      }
      return 0
    })
  }

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

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  async findByToken(token: string): Promise<User> {
    const user = this.users.find(user => user.token === token)
    return user
  }

  async activeByToken(token: string): Promise<User> {
    const user = this.users.find(user => user.token === token)
    user.activated = true

    const log = {
      type: 'info',
      message: 'Fake: Activate new user',
      data: user
    }
    await add('CreateSystemLog', { log })

    return user
  }
}
