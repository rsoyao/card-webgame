const express = require("express");
const bodyParser = require('body-parser');
const Mongo = require('mongodb');
const cookieSession = require('cookie-session');
const userfunctions = require('./userfunctions');
const app = express();
const longpoll = require("express-longpoll")(app)
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/data";
const PORT = process.env.PORT || 8080;

app.set('view engine', 'html');


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

let database;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieSession({
    name: 'session',
    keys: ["carsanddogs"],
}))
MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        throw err
    }
    database = db;
})

//ROUTES


app.post("/register", (req, res) => {
    console.log('in post registration');
    let name = req.body.register_name;
    let password = req.body.register_password;
    userfunctions.register(name, password, database);
    res.redirect('/lobby');
});

app.post("/login", (req, res) => {
    let name = req.body.login_name;
    let password = req.body.login_password;
    userfunctions.login(name, password, database, function(verified) {
        if (verified === true) {
            res.redirect('/lobby');
            addUserToLobbyStateArray(name);
        } else {
            res.redirect('/');
        }
    });
});

app.get("/lobby", (req, res) => {
    res.sendFile('views/lobby.html', { root: '.' })
});
//eventually there will ids for each game
app.get("/mental", (req, res) => {
    res.sendFile('views/mental.html', { root: '.' })
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
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



function addUserToLobbyStateArray(user) {
    lobbyState.current_users.push(user);
    lobbyState.users_in_lobby.push(user);

    console.log('lobby state', lobbyState);

}

//a route might be: /games/:id/actions/:actiontype
//ajax post and get, similar to tweeter 
//a different action type for each thing you can do in a game

//push eventLogs into an array so they are ordered (right now its in an object) they dont need names
//in the database query for all things after the timestamp
// structure a query to look for events after a certain time stamp
//


//use this for indiviual game rooms
// app.get('/poll/:timeStamp', function(req, res) {

//     console.log('in variabled timestamp');
//     timeOfClientsLastRequest = req.params.timeStamp;
//     console.log('IN /poll:timestapm***time of client', timeOfClientsLastRequest);
//     res.send(lobbyState);

// });