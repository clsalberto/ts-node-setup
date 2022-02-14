import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '~/app/contracts/repositories'
import { User } from '~/app/entities'

import { prisma } from '~/database/prisma'

import { add } from '~/libs/queue'

export class PrismaUsersRepository implements IUsersRepository {
  async load(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    const log = {
      type: 'info',
      message: 'Prisma: Loading registered users',
      data: {}
    }
    await add('CreateSystemLog', { log })

    return users
  }

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

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findByToken(token: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        token
      }
    })

    return user
  }

  async activeByToken(token: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        token
      },
      data: {
        activated: true
      }
    })

    const log = {
      type: 'info',
      message: 'Prisma: Activate new user',
      data: user
    }
    await add('CreateSystemLog', { log })

    return user
  }
}
