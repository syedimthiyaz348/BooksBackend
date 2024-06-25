const express = require('express');
const app = express()
require('dotenv').config();
const {MongoClient} = require('mongodb')
const url = process.env.MONGO_URL;
const client = new MongoClient(url)
const dbname = 'book_store'
app.use(express.json())


// const security = (req, res, next) => {
//     if (!req.query.age) {
//         res.send("Please Provide Age")
//     }
//     else if (req.query.age < 18 ) {
//         res.send("Only 18+ has Access")
//     }
//     else {
//         next()
//     }
// }

app.listen(4000)

app.get('/', (req,res) => {
    res.send("<h1>Welcome</h1>")

})

app.get('/books', async (req, res) => {
    let result = await client.connect()
    const db = result.db(dbname);
    const collection = db.collection('books')
    const response = await collection.find({}).toArray()
    res.send(response)
    //console.log(response)
})

app.get('/books/:country', async (req, res) => {
    let result = await client.connect()
    const db = result.db(dbname);
    const collection = db.collection('books')
    const response = await collection.find(req.params).toArray()
    res.send(response)
    //console.log(response)
})