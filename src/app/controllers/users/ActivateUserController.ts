import { Request, Response } from 'express'

import { IControllerBase } from '~/app/contracts/controllers'
import { ActivateUserService } from '~/app/services'

export class ActivateUserController implements IControllerBase {
  constructor(private activateUserService: ActivateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params

    const user = await this.activateUserService.execute(token)

    return response.status(200).json(user)
  }
}
