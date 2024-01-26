import type { NextApiRequest, NextApiResponse } from 'next'
import { getClient } from '@/utils/connect-db'
import { encryptPassword } from '@/utils/encrypt-password'

type ResponseType = { ok: boolean, message: string, id?: string, name?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400).json({ ok: false, message: 'User data is incomplete.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const existingUser = await usersCollection?.findOne({ email: email })

    if (existingUser) {
      res.status(406).json({ ok: false, message: 'User already exists.' })
      return
    }

    const encryptedPassword = await encryptPassword(password)

    const newUserDocument = { name, email, password: encryptedPassword }

    const result = await usersCollection?.insertOne(newUserDocument)

    if (result?.acknowledged) {
      res.status(200).json({ ok: true, message: 'New user created.', id: result.insertedId.toString(), name: name })
    } else {
      res.status(400).json({ ok: false, message: 'Some error occured.' })
    }
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in signing up.' })
    }
  }

  return
}