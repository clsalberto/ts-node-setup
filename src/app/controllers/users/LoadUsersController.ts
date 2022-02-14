import { Request, Response } from 'express'

import { IControllerBase } from '~/app/contracts/controllers'
import { LoadUsersService } from '~/app/services'

export class LoadUsersController implements IControllerBase {
  constructor(private loadUsersService: LoadUsersService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.loadUsersService.execute()

    return response.status(200).json(users)
  }
}
