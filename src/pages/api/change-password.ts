import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/utils/connect-db";
import { encryptPassword } from "@/utils/encrypt-password";

type ResponseType = { ok: boolean, message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const { name, email, password } = req.body as { name: string, email: string, password: string }

    if (!name || !email || !password) {
      res.status(400).json({ ok: false, message: 'User data is incomplete.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const encryptedPassword = await encryptPassword(password)

    const result = await usersCollection.findOneAndUpdate({ email }, { $set: { password: encryptedPassword } })

    if (result) {
      res.status(200).json({ ok: true, message: 'Password is updated.' })
    } else {
      res.status(400).json({ ok: false, message: 'Some error occured.' })
    }
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in updating your password.' })
    }
  }
}