const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const coookieParser = require('/cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(coookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.pdsu2b2.mongodb.net/node.js';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {


  //res.setHeader('set-cookies', 'newUser=true');

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');



});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);



});