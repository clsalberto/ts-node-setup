import { createLogger, format, Logger, transports } from 'winston'

interface ILogger {
  meta: string
  message: string
}

export class Log {
  private logger: Logger
  private constructor(meta: string) {
    this.logger = createLogger({
      defaultMeta: { meta },
      transports: [
        new transports.Console({
          format: format.combine(format.timestamp(), format.json())
        })
      ]
    })
  }

  static info(log: ILogger) {
    const console = new Log(log.meta)
    return console.logger.info(log.message)
  }

  static error(log: ILogger) {
    const console = new Log(log.meta)
    return console.logger.error(log.message)
  }
}
