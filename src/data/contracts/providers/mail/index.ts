interface IAddress {
  name: string
  email: string
}

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  text?: string
  html: string
}

export interface IMailProvider {
  send(message: IMessage): Promise<void>
}
