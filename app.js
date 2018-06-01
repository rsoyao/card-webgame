const express = require("express");
const bodyParser = require('body-parser');
const Mongo = require('mongodb');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const userfunctions = require('./userfunctions');
const app = express();
const longpoll = require("express-longpoll")(app)
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/data";
const PORT = process.env.PORT || 8080;
const path = require("path");
const sassMiddleware = require('node-sass-middleware');
const ObjectID = require('mongodb').ObjectID;
app.set('view engine', 'ejs');
let database;
MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        throw err
    }
    database = db;
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(cookieSession({
    name: 'session',
    keys: ["carsanddogs"],
}));
app.use(cookieParser('carsanddogs'));
app.use(sassMiddleware({
    src: path.join(__dirname, 'styles'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    outputStyle: 'compressed'
}));
let lobbyState = {
        current_users: [],
        users_in_lobby: [],
        users_in_mental: [],
    }
    //player play state is a boolean saying if the players has played card yet
let mentalGameState = {
    current_users: [],
    game_state: 'waiting_to_begin',
    player_play_state: [],
}
const users = {}
let currentGames = {};
//ROUTES
app.post("/register", (req, res) => {
    let name = req.body.register_name;
    let password = req.body.register_password;
    if (password.length > 0 && name.length > 0 && password.length > 0) {
        for (key in users) {
            if (users[key].name === name) {
                return res.status(400).send('This name is currently registered.');
            }
        }
        let newId = generateRandomString();
        users[newId] = {
            username: name,
            password: password
        };
        console.log(users);
    }
    userfunctions.register(name, password, database, function(insertedID) {
        console.log('inserted id', insertedID);
        let userId = ObjectID(insertedID).toString();
        req.session.login_name = req.body.register_name;
        req.session.userId = userId;
        console.log(req.session);
        addUserToLobbyStateArray(name, userId);
        res.redirect('/lobby');
    });
});
app.post("/login", (req, res) => {
    let name = req.body.login_name;
    let password = req.body.login_password;
    userfunctions.login(name, password, database, function(verified, id) {
        console.log('id', id);
        let userId = id;
        addUserToLobbyStateArray(name, userId);
        if (name === "" || password === "") {
            return res.status(404).send("Please enter valid credentials");
        }
        if (verified === true) {
            req.session.userId = id; //if an object, use or google mongo object id, node js
            res.redirect('/lobby');
        } else {
            res.redirect('/');
        }
    });
});
app.get("/lobby", (req, res) => {
    if (req.session.login_name) {
        const templateVars = {
            login_name: req.session.login_name
        };
        return res.render('urls_lobby', templateVars);
    } else {
        return res.status(400).send('Oops! Something is wrong!');
    }
    console.log(req.session);
    res.render('urls_lobby', templateVars);
});
//eventually there will ids for each game
app.get("/mental", (req, res) => {
    res.sendFile('views/mental.html', {
        root: '.'
    })
});

//maybe only for in game, future plan query single object for last time changed
//if object changed download whole state to client
function userEventLogger(name) {
    let timeStamp = Date();
    console.log('Time stamp in usereventlogger');
}
app.get('/lobby_data', function(req, res) {
    res.send(lobbyState);
})
app.get('/mental_data', function(req, res) {
    res.send(mentalGameState);
})
app.post("/create_mental", (req, res) => {
    console.log('creating new mental');
    let gameToPutInMemory = gameManagerMongoInterface.createGame(database);
    console.log('game that was made', gameToPutInMemory);
    res.send('worked');
    //pass user in 

})

function addUserToLobbyStateArray(user, userId) {
    let userObject = { name: user, userId: userId };
    lobbyState.current_users.push(userObject);
    lobbyState.users_in_lobby.push(userObject);
    console.log('lobby state', lobbyState);
}

function generateRandomString() {
    let randomString = "";
    let newString = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++) {
        var random = Math.floor(Math.random() * newString.length - 1);
        randomString += newString[random];
    }
    return randomString;
}

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});