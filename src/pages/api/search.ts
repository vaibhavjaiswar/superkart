import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/utils/connect-db";

type ResponseType = {
  ok: boolean
  message: string
  data?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const queryArray = (req.query.q as string).split(' ')

    if (queryArray.length === 0) {
      res.status(400).json({ ok: false, message: 'Given data is incomplete.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const productsCollection = db?.collection('products')

    const result = productsCollection.find({
      $and: queryArray.map(query => ({
        $or: [
          { 'name': { $regex: query, $options: 'i' }, },
          { 'category': { $regex: query, $options: 'i' }, },
          { 'subcategory': { $regex: query, $options: 'i' }, },
        ]
      }))
    })
    const data = await result.toArray()

    if (data) {
      if (data.length !== 0) {
        res.status(200).json({ ok: true, message: 'Search results fetched successfully.', data })
      } else {
        res.status(200).json({ ok: true, message: `No Products found for "${queryArray.join(' ')}" search.`, data: null })
      }
    } else {
      res.status(400).json({ ok: false, message: 'Some issue occured while searching.' })
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