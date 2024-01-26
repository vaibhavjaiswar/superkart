import bcrypt from 'bcrypt'

export async function encryptPassword(password: string) {
  try {
    const saltRounds = 10

    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    return hash
  } catch (error) {
    console.error(error)
  }
}
