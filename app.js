const express = require('express');
const app = express();
require('dotenv/config');

const bodyParser = require('body-parser');
const errorMiddlewares = require('./middlewares/errors.js');
const authJWT = require('./middlewares/jwt')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authJWT());


//Importing all the routes

const users = require('./routes/userAuth');
const categories = require('./routes/categories')

//doing routing

app.use('/api/v1', users);


//Implementing the middleware to handle errors
app.use(errorMiddlewares);

module.exports = app;