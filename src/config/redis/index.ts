const configRedis = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT)
}

export { configRedis }
