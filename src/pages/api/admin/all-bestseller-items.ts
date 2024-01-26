import { getClient } from "@/utils/connect-db";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseType = { ok: boolean, message: string, data?: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const client = await getClient()

    const db = client?.db('superkart')
    const commonCollection = db?.collection('common')

    const results = await commonCollection.findOne({ 'label': 'bestseller' })

    if (results) {
      res.status(200).json({ ok: true, message: 'Best Seller items fetched.', data: results?.items || [] })
    } else {
      res.status(200).json({ ok: false, message: 'Some issue occured while fetching best seller items.' })
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