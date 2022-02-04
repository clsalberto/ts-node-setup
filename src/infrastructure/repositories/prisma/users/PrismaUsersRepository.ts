import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

import { User } from '~/domain/entities'

import { IUsersRepository } from '~/data/contracts/repositories'

import { prisma } from '~/infrastructure/database/prisma'

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
