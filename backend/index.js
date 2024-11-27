require('dotenv').config();
const config = require('./config.json');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');


const jwt = require('jsonwebtoken');
mongoose.connect(config.ConnectionString);
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/hello", async( req, res) => {
    res.status(200)
    .json('hello')
})

app.listen((8000), () => {
    console.log('app running on port 8000')
});

module.exports = app;