const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabse = require('./config/connectDatabase');
const cors = require('cors');
dotenv.config({path: path.join(__dirname, 'config' , 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabse(); 
app.use(express.json());
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

app.listen(process.env.PORT , () => {
    console.log(`serever ${process.env.PORT} listening ${process.env.NODE_ENV}`)
});
