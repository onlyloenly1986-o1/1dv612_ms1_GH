const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
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
        message: 'hello world this is the startpage for github organisations api'
    })
})

app.use('/api/v1/', rootRoutes)
app.use('/api/v1/orgs', orgRoutes)
app.use('/api/v1/repos', repoRoutes)

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
