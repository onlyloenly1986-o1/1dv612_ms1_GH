const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.status(200).json({
        status: '200: OK',
        message: 'hello world'
    })
})


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
