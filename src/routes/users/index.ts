import { Router } from 'express'

import {
  activateUserFactory,
  createUserFactory,
  loadUsersFactory
} from '~/app/factories'

const routes = Router()

routes.get('/', (request, response) =>
  loadUsersFactory().handle(request, response)
)

routes.post('/', (request, response) =>
  createUserFactory().handle(request, response)
)

routes.get('/activate/:token', (request, response) =>
  activateUserFactory().handle(request, response)
)

export { routes }
