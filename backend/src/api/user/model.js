import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { uid } from 'rand-token'
import prisma from '../../services/db'
import { env } from '../../config'

const roles = ['user', 'admin']

function gravatar (email) {
  const hash = crypto.createHash('md5').update(email).digest('hex')
  return `https://gravatar.com/avatar/${hash}?d=identicon`
}

function attachMethods (user) {
  if (!user) return null

  return {
    ...user,

    view (full) {
      const base = { id: this.id, name: this.name, picture: this.picture }
      if (full) {
        base.email = this.email
        base.createdAt = this.createdAt
      }
      return base
    },

    authenticate (password) {
      return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    },

    set (data) {
      Object.assign(this, data)
      return this
    },

    async save () {
      const { id, createdAt, updatedAt, passwordResets, ...data } = this
      const updated = await prisma.user.update({ where: { id }, data })
      return attachMethods(updated)
    },

    async remove () {
      return prisma.user.delete({ where: { id: this.id } })
    }
  }
}

async function hashPassword (password) {
  const rounds = env === 'test' ? 1 : 9
  return bcrypt.hash(password, rounds)
}

const User = {
  roles,
  schema: { tree: { email: { type: String }, password: { type: String } } },

  async find (where = {}, select = null, cursor = {}) {
    const { limit = 30, skip = 0 } = cursor
    const users = await prisma.user.findMany({ where, skip, take: limit })
    return users.map(attachMethods)
  },

  async count (where = {}) {
    return prisma.user.count({ where })
  },

  async findById (id) {
    if (!id) return null
    const user = await prisma.user.findUnique({ where: { id: String(id) } })
    return attachMethods(user)
  },

  async findOne (where) {
    const user = await prisma.user.findFirst({ where })
    return attachMethods(user)
  },

  async create (data) {
    const email = data.email.toLowerCase().trim()
    const password = await hashPassword(data.password)
    const name = data.name || email.replace(/^(.+)@.+$/, '$1')
    const picture = data.picture || gravatar(email)

    const user = await prisma.user.create({
      data: { ...data, email, password, name, picture }
    })
    return attachMethods(user)
  },

  async createFromService ({ service, id, email, name, picture }) {
    const serviceField = `${service}Id`
    const existing = await prisma.user.findFirst({
      where: { OR: [{ [serviceField]: id }, { email }] }
    })

    if (existing) {
      const updated = await prisma.user.update({
        where: { id: existing.id },
        data: { [serviceField]: id, name, picture }
      })
      return attachMethods(updated)
    }

    const password = await hashPassword(uid(16))
    const user = await prisma.user.create({
      data: { email, password, name, picture, [serviceField]: id }
    })
    return attachMethods(user)
  }
}

export const schema = User.schema
export default User
