import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/utils/connect-db";
import { validateToken } from "@/utils/jwt";

type CartItemType = { productID: string, quantity: number }

type UserType = {
  _id: string,
  name: string,
  email: string,
  cart: CartItemType[],
}

type ResponseType = { ok: boolean, message: string, cart?: CartItemType[] }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const token = req.headers['access-token'] as string

    if (!token) {
      res.status(400).json({ ok: false, message: 'Token not provided. Please login.' })
      return
    }

    const { data, isTokenValid, message } = validateToken(token)

    if (!isTokenValid) {
      res.status(401).json({ ok: false, message })
      return
    }

    const { email: tokenEmail } = data as { name: string, email: string }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const existingUser = await usersCollection?.findOne({ email: tokenEmail })

    if (existingUser) {
      const { cart } = existingUser as unknown as UserType
      res.status(200).json({ ok: true, message: 'Cart items fetched successfully.', cart })
    } else {
      res.status(401).json({ ok: false, message: 'Some error occured while fetching cart items.' })
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