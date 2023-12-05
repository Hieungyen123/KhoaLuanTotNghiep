const express = require('express')
const app = express();
const port = 3000;


// import AccountModel
// const CustomerSchema = require('./models/module.js')
// const path = require('path')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));


// app.use('/public', express.static(path.join( '/public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.get('/home', (req, res) => {
    data = ['hehe', 'heheh']
    res.json(data)
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/home`);
});