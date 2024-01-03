const mongoose = require('mongoose')
const app = require('./app')

const next = require('next')
const dotenv = require('dotenv')

const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })

dotenv.config({ path: './.env' })


// DB CONNECTION
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB database connected.'))
const handle = server.getRequestHandler()

server.prepare().then(() => {
    const PORT = 3000
    app.get('*', (req, res) => {
        return handle(req, res)
    })

    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`App running on PORT ${PORT}`)
    })
})
