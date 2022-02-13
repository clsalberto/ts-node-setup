interface IAddress {
  name: string
  email: string
}

interface IAttachment {
  filename: string
  content: string
  path: string
}

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  html: string
  attachment?: IAttachment[]
}

export interface IMailProvider {
  send(message: IMessage): Promise<void>
}
