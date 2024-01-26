import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/utils/connect-db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as { id: string }

    if (!id) {
      res.status(400).json({ ok: false, message: 'Product ID is not provided.' })
    }

    const client = await getClient()

    const db = client.db('superkart')
    const productCollection = db.collection('products')

    const result = await productCollection.findOne({ _id: new ObjectId(id) })

    if (result) {
      res.status(200).json({ ok: true, message: 'Product fetched successfully.', data: result })
    } else {
      res.status(400).json({ ok: true, message: 'Some error occured while product fetching.' })
    }
  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue in signing up.' })
    }
  }
}