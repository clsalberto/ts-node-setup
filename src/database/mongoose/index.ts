import mongoose from 'mongoose'

mongoose.connect(process.env.CACHE_DB_URL)

mongoose.Promise = global.Promise

export { mongoose }

export * from './schemas/log'
