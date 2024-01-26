import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/utils/jwt";
import { getClient } from "@/utils/connect-db";

type ResponseType = {
  ok: boolean
  message: string
  user?: {
    name: string
    email: string
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const token = req.headers['access-token'] as string

    if (!token) {
      res.status(400).json({ ok: false, message: 'Given data is incomplete.' })
      return
    }

    const { isTokenValid, data, message } = validateToken(token)

    if (isTokenValid) {
      const { name, email } = data as { name: string, email: string }

      const client = await getClient()

      const db = client?.db('superkart')
      const usersCollection = db?.collection('users')

      const existingUser = await usersCollection?.findOne({ email })

      if (!existingUser) {
        res.status(401).json({ ok: false, message: 'User not identified.' })
        return
      }

      res.status(200).json({ ok: true, message: 'User is authenticated.', user: { name, email } })
    } else {
      res.status(401).json({ ok: false, message })
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