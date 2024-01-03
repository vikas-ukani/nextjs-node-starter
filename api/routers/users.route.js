const express = require('express')

const { signIn, signUp } = require('../controller/auth.controller')

const router = express.Router()

router.post('/signIn', signIn)
router.post('/signup', signUp)

module.exports = router