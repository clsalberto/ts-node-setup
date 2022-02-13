import { mongoose } from '..'

interface IAuthor {
  name: string
  email: string
}

interface ILog {
  type: string
  message: string
  author: IAuthor
  data: Object
}

const LogSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: Object, require: true },
  data: { type: Object },
  created_at: { type: Date, default: Date.now }
})

const Log = mongoose.model<ILog>('Log', LogSchema)

export { Log }
