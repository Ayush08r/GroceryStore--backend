const path = require('path')  // core module
const express = require("express") // third party
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express(); // third party
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


const db = require("./database/GroceryStore")


const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(customerRoutes)
app.use(productRoutes)



app.listen(90);