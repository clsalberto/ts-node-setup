import { Router } from 'express'

import { createUserFactory } from '~/presentation/factories'

const routes = Router()

routes.post('/', (request, response) =>
  createUserFactory().handle(request, response)
)

export { routes }
