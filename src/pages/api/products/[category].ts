import { CategoryMap } from "@/constants";
import { getClient } from "@/utils/connect-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { category } = req.query as { category: string }

    if (!CategoryMap.has(category)) {
      res.status(400).json({ ok: false, message: 'Given category does not exists.' })
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const productsCollection = db?.collection('products')

    const result = await productsCollection.find({ category }).toArray()

    res.status(200).json({ ok: true, data: result, message: `Fetched '${category}' category data successfully.` })

  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue occured.' })
    }
  }
}