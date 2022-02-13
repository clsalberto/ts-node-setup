import { Router } from 'express'

import { createUserFactory } from '~/app/factories'

const routes = Router()

routes.post('/', (request, response) =>
  createUserFactory().handle(request, response)
)

export { routes }
