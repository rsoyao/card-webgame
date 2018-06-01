let gameManager = {};

function setUpGame() {
    let gameManager = {};
    const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let amountOfPlayers = 3;
    let winCondition = 'points';
    let pointsForVictory = 100;
    //THESE WILL BE IN MONGO
    addGameConditionsToGameManager(deck, amountOfPlayers, winCondition);
    addPlayersToGameManager(amountOfPlayers, deck);

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
    for (var i = 1; i < amountOfPlayers + 1; i++) {
        let player = `player${i}`;
        gameManager.players[player] = {
            player_score: 0,
            player_has_played: false,
            //temporary for testing functions
            current_card_played: 0,
            player_cards: deck,
        }
    }
}

function startGame() {
    console.log("********GAME HAS STARTED***********");
    for (var i = 0; i < gameManager.total_rounds; i++) {
        selectCardFromDeck(gameManager.targetDeck);
        simulatePlayerAction();
        //calculateWinnerOfTurn();
    }
    console.log(gameManager);
    //1. announce game start  

    //3 .display card to players
    //4. wait for each player to submit

    //calculateWinnerOfTurns();

    //6. assign points
    // 7. if deck has cards or no player has enough points to win goto 2
    // 8. if playing total rounds calculate winner of round  
}

function simulatePlayerAction() {
    //Math.floor(Math.random() * 10 + 1),
    for (var player in gameManager.players) {
        //select card from array, remove from array,
        let card = gameManager.players[player].player_cards[Math.floor(Math.random() *
            gameManager.players[player].player_cards.length)];
        gameManager.players[player].current_card_played = card;
    }
}

function selectCardFromDeck(deck) {
    //pick card
    let cardsRemaining = deck.length;
    let indexForChoosingCard = Math.floor(Math.random() * cardsRemaining);
    let cardToReturn = deck[indexForChoosingCard];

    //remove from deck (will be removed from object on database)
    let index = deck.indexOf(cardToReturn);
    if (index > -1) {
        deck.splice(index, 1);
    }
    gameManager.targetDeck = deck;
    console.log('card to return', cardToReturn);

    calculateWinnerOfTurn(cardToReturn);

}

function calculateWinnerOfTurn(cardToReturn) {
    let highestCard = 0;
    let winner;
    let topCardsAreTied = false;
    for (var player in gameManager.players) {
        playerCard = gameManager.players[player].current_card_played;
        //  console.log('card', card, 'current_card_played', gameManager.players[card].current_card_played, 'highest card', highestCard);
        if (playerCard > highestCard) {
            highestCard = playerCard;
            winner = player;
            topCardsAreTied = false;
        } else if (playerCard === highestCard) {
            topCardsAreTied = true;
        }
    }

    if (topCardsAreTied) {
        //  console.log('top cards tied, no one wins')
    } else {
        //console.log('The winner is ', winner, ' with a', highestCard, 'they won', cardToReturn);
        gameManager.players[winner].player_score += cardToReturn;
    }

}

function calculateTheWinner() {
    let highestScore = 0;
    let winner;
    let topScoresTied = false;
    for (var player in gameManager.players) {
        let finalScore = gameManager.players[player].player_score;
        console.log(`${player} final score: ${finalScore}`);
        //  console.log('card', card, 'current_card_played', gameManager.players[card].current_card_played, 'highest card', highestCard);
        if (finalScore > highestScore) {
            highestScore = finalScore;
            winner = player;
            topScoresTied = false;
        } else if (finalScore === highestScore) {
            topCardsAreTied = true;
        }
    }
    if (!topScoresTied) {
        console.log(`${winner} has won the game with a score of ${highestScore}`);
    }

}
setUpGame();
startGame();
calculateTheWinner();


//console.log(gameManager);



//Match is the entire game
//Round is the comprised of 13 turns