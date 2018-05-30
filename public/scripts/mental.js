/*
1. Establish amount of players
2. Establish win condition
3. Create gameManager object




making decks of various sizes is trivial, implement later
let cardsPerDeck;
function makeDeck() {
    for (var i = 0; i < cardsPerDeck; i++) {

    }
}


//server waits for each play
*/

//let amoutOfPlayers = 3;
let winCondition;
let pointsForVictory; //points can be either total points or total rounds, same variable

let gameManager = {};

function setUpGame() {
    const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let amountOfPlayers = 3;
    addGameConditionsToGameManager(deck);
    addPlayersToGameManager(amountOfPlayers, deck);
    console.log(gameManager);
}

function addGameConditionsToGameManager(deck) {
    //id will be set by database
    gameManager.game_id = 1;
    gameManager.targetDeck = deck;
    gameManager.game_start = new Date;
    //win condition can be points or matches
    gameManager.win_condition = 'points';
    gameManager.total_rounds = deck.length;

}

function addPlayersToGameManager(amountOfPlayers, deck) {
    for (var i = 0; i < amountOfPlayers; i++) {

        let player_id = `player${i}_id`;
        let player_score = `player${i}_score`;
        let player_has_played = `player${i}_has_played`;
        let player_cards = `player${i}_cards`;

        gameManager[player_id] = `p${i}_id`;
        gameManager[player_score] = 0;
        gameManager[player_has_played] = false;
        gameManager[player_cards] = deck;
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

    //remove from deck 
    let index = deck.indexOf(cardToReturn);
    if (index > -1) {
        deck.splice(index, 1);
    }
    gameManager.targetDeck = deck;
    console.log('card to return', cardToReturn);
    console.log('target deck', gameManager.targetDeck);

}
setUpGame();
startGame();