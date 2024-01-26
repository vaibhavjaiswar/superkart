import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/utils/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers['access-token'] as string

    const { isTokenValid, data, message } = validateToken(token)

    const userData = data as { name: string, email: string }

    if (isTokenValid) {
      res.status(200).json({ ok: true, message, user: { name: userData.name, email: userData.email } })
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