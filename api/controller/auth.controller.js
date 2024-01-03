
const jwt = require('jsonwebtoken')
const User = require('../model/users.model')
const bcrypt = require('bcryptjs')


const signToken = function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}
const verifyPassword = function (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

const createSendToken = function (user, status, req, res) {
    const token = signToken(user)

    res.cookie('token', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] == "https"
    })
    user.password = undefined

    res.status(status).json({
        status: true,
        token,
        user
    })
}

const createHash = async function (password) {
    return await bcrypt.hash(password, 10)
}


const signUp = async (req, res, next) => {
    const password = await createHash()
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
    })

    createSendToken(user, 201, req, res)
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({
        status: false,
        message: "Invalid credentials. Please provide valid email and password."
    })
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(verifyPassword(password, user.password))) return res.status(400).json({
        status: false,
        message: "Email not found. Please provide valid email and password."
    })

    createSendToken(user, 201, req, res)
}

module.exports = {
    signIn,
    signUp,
}