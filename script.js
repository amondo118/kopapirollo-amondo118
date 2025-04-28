const choices = ['rock', 'paper', 'scissors'];
const computerChoiceDisplay = document.getElementById('computerChoice');
const myChoiceDisplay = document.getElementById('myChoice');
const messageDisplay = document.getElementById('message');
const resultDisplay = document.getElementById('result');
const scoreboardDisplay = document.getElementById('scoreboard');
const restartButton = document.getElementById('restartButton');

let playerChoice = '';
let computerChoice = '';
let playerScore = 0;
let computerScore = 0;
let rounds = 0;

initializeHands();

document.getElementById('rock').addEventListener('click', () => playerChoiceFunction('rock'));
document.getElementById('paper').addEventListener('click', () => playerChoiceFunction('paper'));
document.getElementById('scissors').addEventListener('click', () => playerChoiceFunction('scissors'));

function initializeHands() {
  computerChoiceDisplay.innerHTML = `<img src="rock.jpeg" alt="rock">`;
  myChoiceDisplay.innerHTML = `<img src="rock.jpeg" alt="rock">`;
  setStandbyAnimation(true);
}

function setStandbyAnimation(active) {
  if (active) {
    computerChoiceDisplay.classList.add('standby');
    myChoiceDisplay.classList.add('standby');
  } else {
    computerChoiceDisplay.classList.remove('standby');
    myChoiceDisplay.classList.remove('standby');
  }
}

function playerChoiceFunction(choice) {
  if (playerScore+computerScore >= 3) return;

  playerChoice = choice;
  computerChoice = choices[Math.floor(Math.random() * choices.length)];

  setStandbyAnimation(false);

  setTimeout(() => {
    displayChoices();
    determineWinner();
  }, 1000);
}

function displayChoices() {

  computerChoiceDisplay.innerHTML = `<img src="${computerChoice}.jpeg" alt="${computerChoice}">`;
  myChoiceDisplay.innerHTML = `<img src="${playerChoice}.jpeg" alt="${playerChoice}">`;

  myChoiceDisplay.classList.add('upDown');
  computerChoiceDisplay.classList.add('upDown');

  setTimeout(() => {
    myChoiceDisplay.classList.remove('upDown');
    computerChoiceDisplay.classList.remove('upDown');
  }, 3000);
}

function determineWinner() {
  if (playerChoice === computerChoice) {
    resultDisplay.textContent = 'Döntetlen!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultDisplay.textContent = 'Te nyertél!';
    playerScore++;
  } else {
    resultDisplay.textContent = 'A gép nyert!';
    computerScore++;
  }

  rounds++;
  updateScoreboard();

  if (playerScore+computerScore >= 3) {
    endGame();
  } else {
    setTimeout(restartRound, 3000);
  }
}

function updateScoreboard() {
  scoreboardDisplay.textContent = `Te: ${playerScore} - Gép: ${computerScore}`;
}

function restartRound() {
  resultDisplay.textContent = '';
  initializeHands();
}

function endGame() {
  let finalMessage = '';
  if (playerScore > computerScore) {
    finalMessage = 'Gratulálok, te nyertél!';
  } else if (computerScore > playerScore) {
    finalMessage = 'A gép nyert!';
  } else {
    finalMessage = 'Döntetlen!';
  }

  messageDisplay.textContent = finalMessage;
  restartButton.style.display = 'inline-block';
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  rounds = 0;
  updateScoreboard();
  messageDisplay.textContent = '';
  resultDisplay.textContent = '';

  initializeHands();
  restartButton.style.display = 'none';
}
