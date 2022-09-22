//Libraries
require('dotenv/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();

//Database scripts
const createScript = require('./database/createScript');
createScript();

//Routers
const registerRouter = require('./routes/register');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

//Routes
app.use('/register', registerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}!`);
});