const wordList = ["table", "chair", "piano", "mouse", "house", "plant", "brain", "cloud", "beach", "fruit"];
let targetWord = "";
let currentAttempt = 0;

const board = document.getElementById('board');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');


function initGame() {
    targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    currentAttempt = 0;
    board.innerHTML = "";
    resetButton.style.display = "none";
    guessInput.disabled = false;
    

    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        board.appendChild(cell);
    }
}

function handleGuess() {
    const guess = guessInput.value.toUpperCase();

   
    if (guess.length !== 5) {
        alert("Please enter exactly 5 letters.");
        return;
    }

    const startIdx = currentAttempt * 5;
    
  
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${startIdx + i}`);
        cell.innerText = guess[i];

        if (guess[i] === targetWord[i]) {
            cell.classList.add('green');
        } else if (targetWord.includes(guess[i])) {
            cell.classList.add('yellow');
        } else {
            cell.classList.add('red');
        }
    }

    if (guess === targetWord) {
        alert("You Won! 🎉");
        endGame();
    } else if (currentAttempt === 5) {
        alert(`You lost! The word was: ${targetWord}`); 
        endGame();
    }

    currentAttempt++;
    guessInput.value = "";
}

function endGame() {
    guessInput.disabled = true;
    resetButton.style.display = "block";
}


guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});

guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initGame);

initGame();