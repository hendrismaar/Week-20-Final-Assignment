require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
require('./models/db');
const mainRoutes = require('./routes/mainRoutes');


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(mainRoutes);

const port = 3000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
});