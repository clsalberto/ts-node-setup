import { User } from '~/domain/entities'

export interface IUserRequest {
  name: string
  email: string
  password: string
  activated: boolean
}

export interface ICreateUserUseCase {
  execute({ name, email, password, activated }: IUserRequest): Promise<User>
}
