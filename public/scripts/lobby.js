$(document).ready(function() {
    console.log('in lobby starts');

    setInterval(poll, 1000);

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

$('#return_to_lobby').click(function() {
    console.log('clicked return to lobby'); //works
    $.get({
        type: "GET",
        url: '/return_to_lobby',
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

    console.log(lobbyState);
    if (lobbyState.last_change > lastLobbyStateChange) {
        console.log('i will do something new!');

        let usersInLobby = lobbyState.users_in_lobby;
        let htmlToAppendToLobby = "";
        // $('#lobby').empty();
        for (var i = 0; i < usersInLobby.length; i++) {
            let userToUpdate = lobbyState.users_in_lobby[i].name;

            htmlToAppendToLobby += `${userToUpdate}`;
            htmlToAppendToLobby += '<br>';
        }
        $('#lobby').append('<p>').html(htmlToAppendToLobby);


        let usersInMental = lobbyState.users_in_mental;
        let htmlToAppendToMental = "";
        for (var i = 0; i < usersInMental.length; i++) {
            let userToUpdate = lobbyState.users_in_mental[i].name;

            htmlToAppendToMental += `${userToUpdate}`;
            htmlToAppendToMental += '<br>';
        }
        $('#mental_queue').append('<p>').html(htmlToAppendToMental);

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