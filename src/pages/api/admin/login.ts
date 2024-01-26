import { generateToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseType = {
  ok: boolean
  message: string
  accessToken?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const { email, password } = req.body as { email: string, password: string }

    if (email === 'admin@superkart.com' && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken({ name: 'Administrator', email, password: process.env.ADMIN_PASSWORD })
      res.status(200).json({ ok: true, message: 'Admin authenticated.', accessToken: token })
    } else {
      res.status(401).json({ ok: false, message: 'Entered credentials are incorrect.' })
    }
    return
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in authentication.' })
    }
  }
}