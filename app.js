const express = require("express");
const bodyParser = require('body-parser');
const Mongo = require('mongodb');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const userfunctions = require('./userfunctions');
const app = express();
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/data"; //name of database
const PORT = process.env.PORT || 8080;
const path = require("path");
const sassMiddleware = require('node-sass-middleware');
app.set('view engine', 'ejs');
let database;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'styles'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));
app.use(express.static('public'));
app.use(cookieSession({
    name: 'session',
    keys: ["carsanddogs"],
}));
app.use(cookieParser('carsanddogs'));

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        throw err
    }
    database = db;

})

const users = {

};

//Generate random String ID
function generateRandomString() {
  let randomString = "";
  let newString = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 5; i++) {
    var random = Math.floor(Math.random() * newString.length - 1);
    randomString += newString[random];
  }
  return randomString;
}

//ROUTES

//LOBBY Page
app.get("/lobby", (req, res) => {
    console.log("*****",req.session)
 if (req.session.login_name) {
      const templateVars = { login_name: req.session.login_name };
      return res.render('urls_lobby', templateVars);
    } else {
      return res.status(400).send('Oops! Something is wrong!');
    }
    console.log(req.session);
    res.render('urls_lobby', templateVars);
  });

//POST ROUTES
//Register route
app.post('/register', (req, res) => {
  const newUsername = req.body.register_name;
  const newPassword = req.body.register_password;
  if (newPassword.length > 0 && newUsername.length > 0 && newPassword.length > 0) {
    for (key in users) {
      if (users[key].username === newUsername) {
        return res.status(400).send('THIS NAME IS CURRENTLY REGISTERED!');
      }
    }
    let newId = generateRandomString();

    users[newId] = {
      username: newUsername,
      password: newPassword
    };
    req.session.login_name = req.body.register_name;
    console.log(users);
    return res.redirect('/lobby');
  } else {
    res.status(400).send('YOU MISSED A STEP!');
  }
});

//LOGIN PAGE
app.post("/login", (req, res) => {
  const username = req.body.login_name;
  const password = req.body.login_password;

  if (username === "" || password === "") {
    return res.status(404).send("Please enter valid credentials");
  }

  for (var id in users) {

    if (users[id].username === username) {
      return res.redirect("/lobby");
    }
  }
  req.session.login_name = username;
  return res.status(403).send("403 Forbidden Error");

});


// app.get("/lobby", (req, res) => {
//     // res.sendFile('views/lobby.html', { root: '.' })
//     res.render('urls_lobby'); // added EJS and changed routes to EJS
// });

app.get("/mental", (req, res) => {
    res.sendFile('views/mental.html', { root: '.' })
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

//a route might be: /games/:id/actions/:actiontype
//ajax post and get, similar to tweeter
//a different action type for each thing you can do in a game

// redirect = /url
// render = file in the folder