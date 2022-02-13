import { Log } from '~/database/mongoose'

const currentUser = {
  name: 'Carlos Alberto',
  email: 'clsalberto@outlook.com'
}

export default {
  key: 'CreateSystemLog',
  async handle({ data }) {
    const { log } = data

    await Log.create({
      type: log.type,
      message: log.message,
      author: currentUser,
      data: log.data
    })
  }
}
