const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) =>{
    res.send('Used Products Resale Server is Running')
})


app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})