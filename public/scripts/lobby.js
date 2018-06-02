$(document).ready(function() {
    console.log('in lobby starts');

    setInterval(poll, 4000);

});
//a variable with users name
let lastLobbyStateChange = 0;

const poll = function() {
    console.log('in poll');
    $.ajax({

        url: "http://localhost:8080/lobby_data",
        success: function(lobbyState) {
            checkLogForNewEvents(lobbyState);
        },
        error: function() {
            console.log('error');
        },
        timeout: 30000 // 30 seconds, where logout happens
    });
};

$('#start_new_mental').click(function() {
    console.log('clicked test button'); //works
    $.post({
        type: "POST",
        url: '/create_mental',
        success: function(ret) {
            console.log(ret);
            if (ret === 'worked') {
                console.log('return worked');

                window.location.href = '/mental';
            } else {
                console.log('return failed');
            }
        }
    });
});

//this only moves the user in the lobbystate array
//this queries cookie and send it to a route that tells the lobby
//state remove its associated user object from lobby add me to mental queue
$('#join_mental').click(function() {
    console.log('clicked join mental'); //works
    $.get({
        type: "GET",
        url: '/move_to_mental_queue',
        success: function(ret) {
            console.log(ret);
        }
    });
});


// function getCookie() {
//     $.get({
//         type: "GET",
//         url: '/move_to_mental_queue',
//         success: function(ret) {
//             console.log(ret);
//         },

//     });
// }


function checkLogForNewEvents(lobbyState) {

    console.log('lobby date', lobbyState.last_change, 'client date', lastLobbyStateChange);
    if (lobbyState.last_change > lastLobbyStateChange) {
        console.log('i will do something new!')
        lastLobbyStateChange = lobbyState.last_change;
    } else {
        console.log('nothing has changed');
    }


    // getCookie();
    //console.log('lobbyState users', lobbyState);
    // let usersInLobby = lobbyState.users_in_lobby;
    // let usersInMental = lobbyState.users_in_mental;
    // let currentUsers = lobbyState.current_users;
    // let lastChange = lobbyState.last_change;
    // console.log('usersInLobby', usersInLobby); //creates lobby names
    // console.log('usersInMental', usersInMental); //creates user
    // console.log('currentUsers', currentUsers);
    // console.log('last change', lobbyState.lastChange);
    // console.log('last change was', lastChange);
    // console.log(lobbyState);

    // if (lobbyState.last_change)
    //     for (var i = 0; i < usersInLobby; i++) {
    //         let para = $('<p>').html('test');
    //         $('#lobby').append
    //     }

}

function removeFromLobby(user) {
    console.log()
}

function addToMentalQueue(user) {

}

function removeFromMentalQueue(user) {

}

function createInitialDate() {
    let date = new Date();
    let t = date.setDate(date.getDate() - 100);
    return t;
}