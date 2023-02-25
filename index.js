require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RegisterRoute = require('./Routes/register.route');
const LoginRoute = require('./Routes/login.route');
const LogoutRoute = require('./Routes/logout.route');
const { dbConnect } = require('./Configs/db');

const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.use('/register', RegisterRoute);
app.use('/login', LoginRoute);
app.use('/logout', LogoutRoute);

app.get('/', (req,res) => {
    res.send('Welcome to Authentication app');
});

app.listen(PORT, async ()=> {
    try{
        await dbConnect;
        console.log('Connected to the DB');
    } catch (err) {
        console.log('Error connecting to the DB');
        console.log(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});