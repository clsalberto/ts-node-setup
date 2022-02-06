interface IAddress {
  name: string
  email: string
}

interface Attachment {
  filename: string
  content: string
  path: string
}

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  html: string
  attachments?: Attachment[]
}

export interface IMailProvider {
  send(message: IMessage): Promise<void>
}
