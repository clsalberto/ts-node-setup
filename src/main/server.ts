import { app } from '~/main/app'
import { Log } from '~/main/utils/logger'

app.listen(3333, () =>
  Log.info({
    meta: 'start-server',
    message: 'Server is running'
  })
)
