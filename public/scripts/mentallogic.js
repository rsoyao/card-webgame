$(document).ready(function() {
    console.log('in mentallogic starts');

    // setInterval(poll, 1000);
    poll();
});


//eventually this polls /mental/gameid/poll
var poll = function() {
    $.ajax({
        url: "http://localhost:8080/poll",
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


$('#like').click(function() {
    console.log('clicked test button');
    $.post('/test')
});