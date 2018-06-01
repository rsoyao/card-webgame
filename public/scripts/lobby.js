var timeOfLastEventReceived = createInitialDate();
console.log('timeOfLastEventReceived set up', timeOfLastEventReceived);
$(document).ready(function() {
    console.log('in lobby starts');

    setInterval(poll, 1000);

});

const poll = function() {

    $.ajax({
        //  url: "http://localhost:8080/poll/" + timeOfLastEventReceived,
        url: "http://localhost:8080/lobby_data",
        success: function(lobbyState) {
            //console.log('success');
            checkLogForNewEvents(lobbyState);

        },
        error: function() {
            console.log('error');

        },
        timeout: 30000 // 30 seconds
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



    //window location href if 200 redirect to mental
    //redirect using ajax
});

function checkLogForNewEvents(lobbyState) {
    console.log('lobbyState users', lobbyState.users_in_lobby);

    //look at lobbyState
    //draw boxes in lobby for each user
    //draw boxes in mental queue

}

function createInitialDate() {
    let date = new Date();
    let t = date.setDate(date.getDate() - 100);
    return t;
}