import { app } from '~/main/app'
import { logger } from '~/main/utils/logger'

app.listen(3333, () => logger.info('Sever is running'))
