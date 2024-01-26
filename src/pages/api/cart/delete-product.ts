import { NextApiRequest, NextApiResponse } from "next"
import { validateToken } from "@/utils/jwt"
import { getClient } from "@/utils/connect-db"

type ResponseType = {
  ok: boolean
  message: string
  error?: any
}

type UserType = {
  _id: string
  name: string
  email: string
  cart: { productID: string, quantity: number }[]
}

type MongoUpdateResultType = {
  acknowledged: boolean
  modifiedCount: number
  upsertedId: null
  upsertedCount: number
  matchedCount: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const token = req.headers['access-token'] as string
    const productID = req.headers['product-id'] as string

    if (!token || !productID) {
      res.status(400).json({ ok: false, message: 'Given data is incomplete.' })
      return
    }

    const { data, isTokenValid, message } = validateToken(token)

    if (!isTokenValid) {
      res.status(401).json({ ok: false, message })
      return
    }

    const { email } = data as { email: string }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const result = await usersCollection.updateOne(
      { 'email': email },
      {
        $pull: { 'cart': { 'productID': productID } },
      },
    )

    const { acknowledged, matchedCount, modifiedCount } = result as MongoUpdateResultType

    if (acknowledged && matchedCount === 1 && modifiedCount === 1) {
      res.status(200).json({ ok: true, message: 'Product deleted from cart.' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue occured.' })
    }
    return
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in authentication.', error })
    }
  }
}