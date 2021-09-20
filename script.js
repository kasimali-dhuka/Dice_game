'use strict';

// Button elements
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');
const resetBtn = document.querySelector('.btn--new');

// Dice image
const diceImg = document.querySelector('.dice');

// Player 1 elements
const player1 = document.querySelector('.player--0');
let player1Score = document.getElementById('score--0');
let player1Current = document.getElementById('current--0');

// Player 2 elements
const player2 = document.querySelector('.player--1');
let player2Score = document.getElementById('score--1');
let player2Current = document.getElementById('current--1');

let activePlayer = document.querySelector('.player--active');


// Declare inital score of a player
let score1 = 0;
let score2 = 0;
// Declare current-score of a player
let currentScore = 0;


// Active players score increament
function scoreChange() {
    if ( activePlayer.className.indexOf('player--0') >= 0) {
        score1 += currentScore;
        player1Score.textContent = score1;
        winningScore(score1);
    } else {
        score2 += currentScore;
        player2Score.textContent = score2;
        winningScore(score2);
    }
    currentScore = 0;
    player1Current.textContent = currentScore;
    player2Current.textContent = currentScore;
};



// function to toggle classes and switch between players when hold btn is clicked
const changePlayer = (activeClass) => {
    player1.classList.toggle(activeClass);
    player2.classList.toggle(activeClass);
    activePlayer = document.querySelector('.player--active');
    
}



// Function to increment current score and switch player
const currentScoreIncrement = (playerNum, x) => {
    currentScore += x;
    playerNum.textContent = currentScore;    
    // Switch players when dice rolls to 1
    if ( x === 1 ){
        changePlayer('player--active');
        currentScore = 0;
        playerNum.textContent = currentScore;
    }
}

// Winning score function
const winningScore = score => {
    if ( score >= 20 ) {
        activePlayer.classList.add('player--winner');
        holdBtn.removeEventListener('click', holdBtnFunction);
        rollBtn.removeEventListener('click', rollBtnFunction);
    } else {
        changePlayer('player--active');
    }
};

// Hold btn function
function holdBtnFunction () {
    scoreChange();
}


// Roll btn function
function rollBtnFunction() {
    // Declare random number 
    let x = Math.trunc(Math.random()*6)+1;
    // Image changes
    diceImg.src = `dice-${x}.png`;
    
    if (activePlayer.className.indexOf('player--0') >= 0) {
        currentScoreIncrement(player1Current, x);
        // switchPlayer(x, player1Current);
    } else {
        currentScoreIncrement(player2Current, x);
        // switchPlayer(x, player2Current);
    }
}

// function to reset game
function resetGame() {
    currentScore = 0;
    score1 = score2 = 0;
    activePlayer.classList.remove('player--winner');
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    player1Current.textContent = player2Current.textContent = currentScore;
    player1Score.textContent = player2Score.textContent = score1;

    // Click event listener for Hold button
    holdBtn.addEventListener('click', holdBtnFunction);

    // Click event listener to roll dice
    rollBtn.addEventListener('click', rollBtnFunction);
}


// Click event listener for new game button
resetBtn.addEventListener('click', resetGame);

// Click event listener to roll dice
rollBtn.addEventListener('click', rollBtnFunction);

// Click event listener for Hold button
holdBtn.addEventListener('click', holdBtnFunction);
