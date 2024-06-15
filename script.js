'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelectorAll('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInfo = document.querySelector('.btn--info');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');
const gamer0 = document.querySelector('#gamer0');
const gamer1 = document.querySelector('#gamer1');
const changePlayerName = document.querySelector('.changePlayerName');
const message = document.querySelector('.message');

let scores, currentScore, activePlayer, playing;

changePlayerName.addEventListener('click', function () {
  let getGamer0 = gamer0.value;
  let getGamer1 = gamer1.value;
  playerName0.textContent = getGamer0;
  playerName1.textContent = getGamer1;
  gamer0.classList.add('hidden');
  gamer1.classList.add('hidden');
  message.textContent = 'Player names changed!';

  console.log(getGamer0, getGamer1);
});
// setTimeout(getPlayerInfo, 3000);

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();
// Rolling dice functionality
let rollBtn = function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
};
for (let i = 0; i < btnRoll.length; i++) {
  btnRoll[i].addEventListener('click', rollBtn);
}

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the score of the active player
    scores[activePlayer] += currentScore;
    //scores[1]=scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnInfo.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// btnNew.addEventListener('click', function () {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   document.querySelector(`.player--0`).classList.remove('player--winner');
//   document.querySelector(`.player--1`).classList.remove('player--winner');
//   document.getElementById(`current--0`).textContent = currentScore;
//   document.getElementById(`current--1`).textContent = currentScore;
//   document.getElementById(`score--1`).textContent = scores[0];
//   document.getElementById(`score--0`).textContent = scores[1];
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add('player--active');
//   playing = true;
// });
