export class User {
  id?: string
  image_id?: String
  name: string
  email: string
  password_hash: string
  token?: string
  expired_at?: Date
  created_at?: Date
  activated: boolean

  private constructor({ name, email, password_hash, activated }: User) {
    return Object.assign(this, {
      name,
      email,
      password_hash,
      activated
    })
  }

  static create({ name, email, password_hash, activated }: User) {
    return new User({ name, email, password_hash, activated })
  }
}
