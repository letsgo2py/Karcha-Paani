const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { checkAuth } = require("./Middlewares/checkAuth");

const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true  //  Crucial: allows cookies to be sent
}));
app.use(cookieParser());
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.use('/auth', require('./Routes/auth'));
app.use('/user', checkAuth, require('./Routes/user'));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})