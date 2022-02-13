import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '~/app/contracts/repositories'
import { User } from '~/app/entities'

import { prisma } from '~/database/prisma'

import { add } from '~/libs/queue'

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    const now = new Date()

    Object.assign(user, {
      id: uuid(),
      token: crypto.randomBytes(30).toString('hex'),
      expired_at: new Date(now.setHours(now.getHours() + 6))
    })

    const { id, name, email, password_hash, token, expired_at, activated } =
      user

    const userData = await prisma.user.create({
      data: { id, name, email, password_hash, token, expired_at, activated }
    })

    const log = {
      type: 'info',
      message: 'Prisma: Create new user',
      data: userData
    }
    await add('CreateSystemLog', { log })

    return userData
  }

  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return !!user
  }
}
