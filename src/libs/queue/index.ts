import Queue from 'bull'

import * as jobs from '~/app/jobs'

import { configRedis } from '~/config/redis'

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, { redis: configRedis }),
  name: job.key,
  handle: job.handle
}))

const add = (name: string, data: Object) => {
  const queue = queues.find(queue => queue.name === name)
  return queue.bull.add(data)
}

const process = () => {
  return queues.forEach(queue => {
    queue.bull.process(queue.handle)

    queue.bull.on('failed', (job, err) => {
      console.log('Job failed', queue.name, job.data)
      console.error(err)
    })
  })
}

export { add, process }
