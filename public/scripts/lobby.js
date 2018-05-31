var timeOfLastEventReceived = createInitialDate();
console.log('timeOfLastEventReceived set up', timeOfLastEventReceived);
$(document).ready(function() {
    console.log('in lobby starts');

    setInterval(poll, 1000);

});
//this route shoudl point to /lobby/data
const poll = function() {
    $.ajax({
        url: "http://localhost:8080/poll/" + timeOfLastEventReceived,
        //url: "http://localhost:8080/poll/",
        success: function(data) {
            //console.log('success');
            //checkLogForNewEvents(data);
            // poll();
        },
        error: function() {
            console.log('error');
            //poll();
        },
        timeout: 30000 // 30 seconds
    });
};

$('#like').click(function() {
    console.log('clicked test button');
    $.post('/test')
});

function checkLogForNewEvents(data) {
    console.log(data);
}

function createInitialDate() {
    let date = new Date();
    let t = date.setDate(date.getDate() - 100);
    return t;
}