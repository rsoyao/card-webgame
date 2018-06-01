$(document).ready(function() {
    console.log('in mentallogic starts');

    setInterval(poll, 1000);

});



var poll = function() {
    $.ajax({
        url: "http://localhost:8080/mental_data",
        success: function(mentalGameState) {
            console.log(mentalGameState);

        },
        error: function() {

        },
        timeout: 30000 // 30 seconds
    });
};