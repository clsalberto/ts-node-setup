import { Router } from 'express'

import { activateUserFactory, createUserFactory } from '~/app/factories'

const routes = Router()

routes.post('/', (request, response) =>
  createUserFactory().handle(request, response)
)

routes.get('/activate/:token', (request, response) =>
  activateUserFactory().handle(request, response)
)

export { routes }
