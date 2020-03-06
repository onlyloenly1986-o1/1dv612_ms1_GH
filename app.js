const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()


// routes
const rootRoutes = require('./api/routes/rootRouter')
const orgRoutes = require('./api/routes/orgRouter')
const repoRoutes = require('./api/routes/repoRouter')

// logger middleware
app.use(morgan('dev'))

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json({
        status: '200: OK',
        message: 'Hello World this is the startpage for github organisations api. Go to /api/v1 to se what the api offers'
    })
})

// create a jwt for testing this api
app.get('/api/v1/jwt', (req, res) => {
    let privateKey= fs.readFileSync('./private.pem', 'utf-8')
    let token = jwt.sign({body: 'stuff'}, privateKey, {algorithm: 'HS256'})

    res.status(200).json({
        status: '200: OK',
        message: 'this is your test-token',
        token: token
    })
})


// TODO place in i a middleware-folder
function isAuthorized(req, res, next) {
    
    if(typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(' ')[1]
        
        //TODO how to make this from other login-accounts??
        let privateKey= fs.readFileSync('./private.pem', 'utf-8')
        jwt.verify(token, privateKey, { algorithm: "HS256"}, (err, decoded) => {
            if (err) {
                // TODO check status later
                res.status(500).json({error: err})
            }
            console.log(decoded)
            next()
        })
    } else {
        res.status(403).json({
            status: '403: Forbidden',
            message: 'You have to be authorized for this, pass through a jwt for the user',
            error: "Not authorized"})
    }
}

app.use('/api/v1/', rootRoutes)
app.use('/api/v1/orgs', isAuthorized, orgRoutes)
app.use('/api/v1/repos', isAuthorized, repoRoutes)

// catch 404
app.use((req, res, next) => {
    const error = new Error('Not found')
    res.status(404).json({
        status: '404: Not Found',
        message: 'Sorry the path was not able to reach.',
        error: error
    })
})

// catch other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app
