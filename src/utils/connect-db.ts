import { MongoClient, ServerApiVersion } from 'mongodb'

const URI = process.env.DB_USER_PASSWORD || ''

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export async function getClient() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 })
    // console.log("Pinged your deployment. You successfully connected to MongoDB!")
    return client
}
