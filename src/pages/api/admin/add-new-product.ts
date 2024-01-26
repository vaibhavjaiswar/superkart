import formidable from 'formidable'
import { existsSync, mkdirSync } from 'fs'
import { NextApiRequest, NextApiResponse } from "next"
import { join } from 'path'
import { getClient } from "@/utils/connect-db"

type ResponseType = { ok: boolean, message: string, productID?: string }

export const config = {
  api: { bodyParser: false }
}

const imagesFolderName = 'product-images'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).json({ ok: false, message: 'Only POST method is allowed.' })
    return
  }

  try {
    const { fields, files } = await parseForm(req)

    const name = fields?.name ? fields.name[0] : ''
    const category = fields?.category ? fields.category[0] : ''
    const subcategory = fields?.subcategory ? fields.subcategory[0] : ''
    const price = fields?.price ? parseInt(fields.price[0]) : -1
    const discountprice = fields?.discountprice ? parseInt(fields.discountprice[0]) : -1

    const file = files?.image ?? []

    let imageURL = file.map(f => f.toJSON().filepath)[0].split('public')[1].replaceAll('\\', '/')

    if (!name || !category || !subcategory || price == -1 || discountprice == -1 || !imageURL) {
      res.status(400).json({ ok: false, message: 'Product data is incomplete.' })
      return
    }

    const client = await getClient()

    const db = client?.db('superkart')
    const productsCollection = db?.collection('products')

    const newProduct = { name, category, subcategory, price, discountprice, imageURL }

    const result = await productsCollection.insertOne(newProduct)

    if (result?.acknowledged) {
      res.status(200).json({ ok: true, message: 'New product added.', productID: result.insertedId.toString() })
    } else {
      res.status(400).json({ ok: false, message: 'Some error occured.' })
    }
  } catch (error: any | { code: string }) {
    console.error(error)
    if (error.code === 'ETIMEOUT') {
      res.status(400).json({ ok: false, message: 'Request timed out!' })
    } else {
      res.status(500).json({ ok: false, message: "Internal server error." })
    }
  }

  return
}

type FormidableDataType = {
  fields: formidable.Fields
  files: formidable.Files
}

async function parseForm(req: NextApiRequest): Promise<FormidableDataType> {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.cwd(), `/public/${imagesFolderName}`)

    try {
      if (!existsSync(uploadDir)) {
        console.log('Upload destination folder doesnot exists')
        mkdirSync(uploadDir, {})
        console.log('Folder created!')
      }
    } catch (error) {
      console.log(error)
    }

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024,
      uploadDir,
      filename: (name, ext, part, form) => {
        return `${name}-${Date.now()}.png`
      },
      filter: (part) => true,
    })

    form.parse(req, (error, fields, files) => {
      // console.log('\n', error, '\n')
      // console.log('\n', fields, '\n')
      // console.log('\n', files, '\n')
      if (error) reject(error)
      else resolve({ fields, files })
    })
  })
}