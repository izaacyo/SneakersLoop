const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


// ROUTES

app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))








// Connect to mongodb 

const URI = process.env.MONGO_URL

mongoose.connect(URI, {
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})



const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log('Server is running on part 5000')
})