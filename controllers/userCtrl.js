const Users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const { CLIENT_URL } = process.env


const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            //ALL THE FIELDS MUST BE FILLED
            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill in all the fields" })

            //VALIDATE EMAIL
            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email" })

            const user = await Users.findOne({ email })
            if (user)
                return res.status(400).json({ msg: "This email adress already exists." })


            // PASSWORD ENCRYPTION

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters" })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            // Then create jsonwebtoken to authentication

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email adress")


            res.json({ msg: "Register Success! Please check your email and activate your account to start" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = userCtrl