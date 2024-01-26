import { getClient } from "@/utils/connect-db"
import { NextApiRequest, NextApiResponse } from "next"

type ResponseType = { ok: boolean, message: string, data?: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const { productID } = JSON.parse(req.body) as { productID: string }

    if (!productID) {
      res.status(400).json({ ok: false, message: 'Product ID not given.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const commonCollection = db?.collection('common')

    const result = await commonCollection.findOne({ 'label': 'bestseller' })

    const { items } = result as unknown as { items: string[] }

    if (items.includes(productID)) {

      const result = await commonCollection.updateOne(
        { 'label': 'bestseller' },
        {
          $pull: { 'items': productID }
        }
      )

      const { acknowledged, modifiedCount, matchedCount } = result

      if (acknowledged && modifiedCount === 1 && matchedCount === 1) {
        res.status(200).json({ ok: true, message: 'Product deleted from best seller items.' })
      } else {
        res.status(400).json({ ok: true, message: 'Error while removing item.' })
      }
    } else {
      res.status(400).json({ ok: false, message: 'Product ID is not in best seller items.' })
    }
  } catch (error: any | { code: string }) {
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