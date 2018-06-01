$(document).ready(function() {
    console.log('in mentallogic starts');

    setInterval(poll, 1000);

});


//eventually this polls /mental/gameid/poll (rename for purpose of route)
var poll = function() {
    $.ajax({
        url: "http://localhost:8080/mentalState",
        success: function(data) {
            console.log(data); // { text: "Some data" } -> will be printed in your browser console every 5 seconds
            poll();
        },
        error: function() {
            poll();
        },
        timeout: 30000 // 30 seconds
    });
};