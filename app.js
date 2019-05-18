/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, dice, stateGame;

var DOMdice = document.querySelector('.dice');
init();

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    stateGame = true;

    DOMdice.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (stateGame) {
        //Random number
        dice = Math.floor(Math.random() * 6) + 1;

        //Display result of dice <img>
        DOMdice.style.display = 'block';
        DOMdice.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            DOMdice.style.display = 'none';
            //Next Player
            nextPlayer();
        }
    }

});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (stateGame) {
        //add CURRENT score to GLOBAL score
        score[activePlayer] += roundScore;
        //Update the UI of score
        DOMdice.style.display = 'none';
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

        //check if player won the game
        if (score[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'WIN WIN!!!';
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            stateGame = false;
        } else {
            //nextPlayer
            nextPlayer();
        }

    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    roundScore = 0;
    score[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}