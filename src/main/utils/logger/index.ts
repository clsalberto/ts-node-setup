import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.json())
    })
  ]
})

// logger.add(
//   new winston.transports.Console({
//     format: winston.format.simple()
//   })
// )

export { logger }
