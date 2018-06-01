var timeOfLastEventReceived = createInitialDate();
console.log('timeOfLastEventReceived set up', timeOfLastEventReceived);
$(document).ready(function() {
    console.log('in lobby starts');

    setInterval(poll, 1000);


});
//a variable with users name


const poll = function() {

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
    // getCookie();
    //console.log('lobbyState users', lobbyState);
    let usersInLobby = lobbyState.users_in_lobby;
    let usersInMental = lobbyState.users_in_mental;
    let currentUsers = lobbyState.current_users;

    console.log('usersInLobby', usersInLobby); //creates lobby names
    console.log('usersInMental', usersInMental); //creates user
    console.log('currentUsers', currentUsers);

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