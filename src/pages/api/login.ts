import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/utils/connect-db";
import { generateToken } from '@/utils/jwt';

type ResponseType = { ok: boolean, message: string, accessToken?: string, user?: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ ok: false, message: 'Given data is incomplete.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const existingUser = await usersCollection?.findOne({ email: email })

    const isValid = await new Promise((resolve, reject) => {
      bcrypt.compare(password, existingUser?.password, (error, isValid) => isValid ? resolve(true) : resolve(false))
    })

    if (isValid) {
      const token = generateToken({ name: existingUser?.name, email, password })
      res.status(200).json({
        ok: true,
        message: 'Login is valid.',
        accessToken: token,
        user: { _id: existingUser?._id, name: existingUser?.name, email: existingUser?.email },
      })
    } else {
      res.status(401).json({ ok: false, message: 'Login credentials are invalid.' })
    }

  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in authentication.' })
    }
  }
}