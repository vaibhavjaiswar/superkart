import { NextApiRequest, NextApiResponse } from "next"
import { getClient } from "@/utils/connect-db"
import { BSON, ObjectId } from "mongodb"

type ResponseType = { ok: boolean, message: string, productID?: any }

// type ProductType = {
//   _id: typeof ObjectId,
//   name: string
//   category: string
//   subcategory: string
//   price: number
//   discountprice: number
//   imageURL: string
// }

type CommonCollectionType = {
  _id: string
  label: string
  items: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const productID = req.headers['product-id'] as string

    if (!productID) {
      res.status(200).json({ ok: false, message: 'Product ID is not given.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const productsCollection = db?.collection('products')

    const result = await productsCollection.findOne({ _id: new ObjectId(productID) })

    if (result) {
      const commonCollection = db?.collection('common')

      const trendingItems = await commonCollection.findOne({ 'label': 'trending' })

      if (trendingItems?.items.includes(productID)) {
        res.status(400).json({ ok: false, message: 'Product is already added to trending.' })
        return
      }

      commonCollection.updateOne(
        { 'label': 'trending' },
        { $push: { 'items': productID } },
      )

      res.status(200).json({ ok: true, message: 'New product added.', productID: result })
    } else {
      res.status(400).json({ ok: false, message: 'Product not found with given ID.' })
    }
    return
  } catch (error: any | { code: string }) {
    if (BSON.BSONError.isBSONError(error)) {
      res.status(400).json({ ok: false, message: 'Given product ID is invalid.' })
    }
    console.error(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(500).json({ ok: false, message: "Internal server error." })
    }
  }
}