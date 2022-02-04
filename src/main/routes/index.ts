import { Router } from 'express'

import { routes as userRoutes } from './users'

const routes = Router()

routes.get('/', (request, response) => {
  return response.status(200).json({
    type: 'success',
    message: 'Welcome to project'
  })
})

routes.use('/users', userRoutes)

export { routes }
