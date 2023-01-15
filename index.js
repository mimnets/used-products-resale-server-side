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
        const phonesCollection = client.db('usedHandResale').collection('phoneListings');

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

        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = {category_id: id};
            const categoryItems = await categoriesCollection.findOne(query);
            res.send(categoryItems);
        })

        app.get('/phone-listings', async (req, res) => {
             const query = {};
            const phones = await phonesCollection.find(query).toArray();
            res.send(phones);
        });

        app.get('/phone-listings/:id', async (req, res) => {
            const id = req.params.id;
            const query = {category_id: id};
            const phones = await phonesCollection.find(query).toArray();
            res.send(phones);
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