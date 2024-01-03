

const express = require('express')
const cors = require('cors')
const userRouter = require('./api/routers/users.route')

const app = express()

// MIDDLEWARE
app.use(express.json({ limit: '100kb' }))

app.use(cors())
app.options('*', cors())

// ROUTERS
app.use('/api/v1', userRouter)


module.exports = app
