import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/utils/jwt";
import { getClient } from "@/utils/connect-db";

type UserType = {
  _id: string
  name: string
  email: string
  cart: { productID: string, quantity: number }[]
}

type ResponseType = {
  ok: boolean
  message: string
  error?: any
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
    const quantity = parseInt(req.headers['quantity'] as string) as number

    if (!token) {
      res.status(400).json({ ok: false, message: 'Log In first to add item in cart!' })
      return
    }

    if (!productID || !quantity || isNaN(quantity)) {
      res.status(400).json({ ok: false, message: 'Given data is incomplete. \nTry logging in again.' })
      return
    }

    const { data, isTokenValid, message } = validateToken(token)

    if (!isTokenValid) {
      res.status(401).json({ ok: false, message: message + ' Please login again.' })
      return
    }

    const { email } = data as { name: string, email: string }

    const client = await getClient()

    const db = client?.db('superkart')
    const usersCollection = db?.collection('users')

    const existingUser = await usersCollection?.findOne({ email })

    if (!existingUser) {
      res.status(401).json({ ok: false, message: 'Error in fetching user.' })
      return
    }

    const { _id, cart } = existingUser as unknown as UserType

    if (cart.map(item => item.productID).includes(productID)) {
      // If product is already in cart, then increment its quantity
      const result = await usersCollection.updateOne(
        { 'email': email, 'cart.productID': productID },
        {
          $inc: { 'cart.$.quantity': quantity },
        },
      )
      const { acknowledged, matchedCount, modifiedCount } = result as MongoUpdateResultType

      if (acknowledged && matchedCount === 1 && modifiedCount === 1) {
        res.status(200).json({ ok: true, message: 'Product added to cart.' })
        return
      }
    } else {
      // If product is not in cart, then add
      const result = await usersCollection.updateOne(
        { 'email': email },
        {
          $push: {
            'cart': { 'productID': productID, 'quantity': quantity },
          },
        },
      )
      const { acknowledged, matchedCount, modifiedCount } = result as MongoUpdateResultType

      if (acknowledged && matchedCount === 1 && modifiedCount === 1) {
        res.status(200).json({ ok: true, message: 'Product added to cart.' })
        return
      }
    }
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in authentication.', error })
    }
  }
}