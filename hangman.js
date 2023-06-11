const words = ["apple", "banana", "cherry", "dragonfruit", "elderberry", "fig", "grape", "honeydew"];
let chosenWord = "";
let guessedLetters = [];
let guessesLeft = 6;

function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    const wordDisplay = document.getElementById("word-display");
    let display = "";
    for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
            display += chosenWord[i] + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display;
}

function displayGuessesLeft() {
    const guessesLeftDisplay = document.getElementById("guesses-left");
    guessesLeftDisplay.textContent = "Guesses Left: " + guessesLeft;
}

function displayLettersGuessed() {
    const lettersGuessedDisplay = document.getElementById("letters-guessed");
    lettersGuessedDisplay.textContent = "Letters Guessed: " + guessedLetters.join(", ");
}

function checkWin() {
    for (let i = 0; i < chosenWord.length; i++) {
        if (!guessedLetters.includes(chosenWord[i])) {
            return false;
        }
    }
    return true;
}

function checkLose() {
    return guessesLeft === 0;
}

function gameOver(message) {
    alert(message);
    resetGame();
}

function resetGame() {
    chosenWord = "";
    guessedLetters = [];
    guessesLeft = 6;
    chooseWord();
    displayWord();
    displayGuessesLeft();
    displayLettersGuessed();
}

function guessLetter() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase().trim();

    if (guess.length !== 1 || guessedLetters.includes(guess)) {
        guessInput.value = "";
        return;
    }

    guessedLetters.push(guess);
    guessInput.value = "";

    if (chosenWord.includes(guess)) {
        displayWord();
        if (checkWin()) {
            gameOver("Congratulations! You won!");
        }
    } else {
        guessesLeft--;
        displayGuessesLeft();
        displayLettersGuessed();
        if (checkLose()) {
            gameOver("Game over! You lost.");
        }
    }
}

resetGame();
