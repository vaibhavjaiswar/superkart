import { CategoryMap, SubCategoryMap } from "@/constants";
import { getClient } from "@/utils/connect-db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { category, subcategory } = req.query as { category: string, subcategory: string }

    if (!(CategoryMap.has(category) && SubCategoryMap.has(subcategory))) {
      res.status(400).json({ ok: false, message: 'Given category or subcategory does not exists.' })
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const productsCollection = db?.collection('products')

    const result = await productsCollection.find({ category, subcategory }).toArray()

    res.status(200).json({ ok: true, data: result, message: `Fetched '${subcategory}' in '${category}' category data successfully.` })

  } catch (error: any | { code: string }) {
    console.log(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(400).json({ ok: false, message: 'Some issue occured.' })
    }
  }
}