import { Request, Response } from 'express'

import { CreateUserService } from '~/data/services'

import { IControllerBase } from '~/infrastructure/contracts/controllers'

export class CreateUserController implements IControllerBase {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, activated } = request.body

    const user = await this.createUserService.execute({
      name,
      email,
      password,
      activated
    })

    return response.status(201).json(user)
  }
}
