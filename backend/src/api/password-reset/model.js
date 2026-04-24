import { uid } from 'rand-token'
import prisma from '../../services/db'

const TTL_HOURS = 1

function attachMethods (reset) {
  if (!reset) return null

  return {
    ...reset,

    view (full) {
      return {
        token: this.token,
        user: this.user ? { id: this.user.id, name: this.user.name, email: this.user.email } : null
      }
    }
  }
}

const PasswordReset = {
  async create ({ user }) {
    const token = uid(32)
    const reset = await prisma.passwordReset.create({
      data: { token, userId: user.id },
      include: { user: true }
    })
    return attachMethods(reset)
  },

  async findOne (where) {
    const expiryThreshold = new Date(Date.now() - TTL_HOURS * 60 * 60 * 1000)
    const reset = await prisma.passwordReset.findFirst({
      where: { ...where, createdAt: { gte: expiryThreshold } },
      include: { user: true }
    })
    return attachMethods(reset)
  },

  async deleteMany (where) {
    const prismaWhere = {}
    if (where.user && where.user.id) prismaWhere.userId = where.user.id
    return prisma.passwordReset.deleteMany({ where: prismaWhere })
  }
}

export default PasswordReset
export const schema = {}
