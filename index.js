const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Required for dot env
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
// Middleware

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
async function run() {
    try {
        const advertisementsCollection = client.db('usedHandResale').collection('advertisedItems');
        const categoriesCollection = client.db('usedHandResale').collection('categories');

        // Use Aggregate to query multiple collection and then merge data

        app.get('/advertiseditems', async (req, res) => {
            const query = {};
            const options = await advertisementsCollection.find(query).toArray();
            res.send(options);
        });
        app.get('/categories', async (req, res) => {
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        });



    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', async (req, res) => {
    res.send('Used mobile phone resale server is running..')
})

app.listen(port, () => console.log(`Used mobile phone resale server running on port ${port}`));