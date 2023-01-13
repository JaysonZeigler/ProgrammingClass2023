const guessButton = document.getElementById('guess-button');
const guessInput = document.getElementById('guess-input');
const message = document.getElementById('message');

let answer = Math.floor(Math.random() * 100) + 1;
let guesses = 0;

guessButton.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);
  guesses++;
  
  if (guess === answer) {
    message.innerHTML = `You got it! The answer was ${answer}. It took you ${guesses} guesses.`;
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (guess < answer) {
    message.innerHTML = 'Too low!';
  } else if (guess > answer) {
    message.innerHTML = 'Too high!';
  }
});