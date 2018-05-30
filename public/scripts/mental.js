let winCondition;
let pointsForVictory; //points can be either total points or total rounds, same variable

let gameManager = {};

function setUpGame() {
    const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let amountOfPlayers = 3;
    //THESE WILL BE IN MONGO
    addGameConditionsToGameManager(deck, amountOfPlayers, 'points');
    addPlayersToGameManager(amountOfPlayers, deck);

    // console.log(gameManager);
}

function addGameConditionsToGameManager(deck, amountOfPlayers, win_condition) {
    //id will be set by database
    gameManager.game_id = 1;
    gameManager.targetDeck = deck;
    gameManager.game_start = new Date;
    //win condition can be points or matches
    gameManager.win_condition = win_condition;
    gameManager.total_rounds = deck.length;



}
//we need a connection from userDatabase for the in game name?


//user object nested with info
function addPlayersToGameManager(amountOfPlayers, deck) {

    gameManager.players = {};

    //the player object should have a relation to the players user/login name
    for (var i = 0; i < amountOfPlayers; i++) {
        let player = `player${i}`;
        gameManager.players[player] = {
            player_score: 0,
            player_has_played: false,
            current_card_played: 0,
            player_cards: deck,
        }
    }
}



function startGame() {

    //1. announce game start  
    selectCardFromDeck(gameManager.targetDeck);
    //3 .display card to players
    //4. wait for each player to submit
    //5. calculate winner of hand
    //6. assign points
    // 7. if deck has cards or no player has enough points to win goto 2
    // 8. if playing total rounds calculate winner of round  
}

function selectCardFromDeck(deck) {

    //pick card
    let cardsRemaining = deck.length;
    let indexForChoosingCard = Math.floor(Math.random() * cardsRemaining + 1);
    let cardToReturn = deck[indexForChoosingCard];

    //remove from deck (will be removed from object on database)
    let index = deck.indexOf(cardToReturn);
    if (index > -1) {
        deck.splice(index, 1);
    }
    gameManager.targetDeck = deck;
    console.log('card to return', cardToReturn);
    console.log('target deck', gameManager.targetDeck);

}

function calculateWinnerOfTurns() {
    console.log('in calculate winners');

    let highestCard = 0;
    for (var card in gameManager.players) {
        console.log("in for in loop");
    }
}
setUpGame();
startGame();
calculateWinnerOfTurns();

//Match is the entire game
//Round is the comprised of 13 turns