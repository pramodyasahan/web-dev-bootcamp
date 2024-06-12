const playerOne = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display")
}

const playerTwo = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display")
}

const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#level");
let isGameOver = false;
let winningScore = 3;

function updatScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
        }
        player.display.innerText = player.score;
    }
}

function reset() {
    isGameOver = false;
    playerOne.score = 0;
    playerTwo.score = 0;
    playerOne.display.innerText = 0;
    playerTwo.display.innerText = 0;
    playerOne.display.classList.remove('winner', 'loser')
    playerTwo.display.classList.remove('loser', 'winner')
}

playerOne.button.addEventListener('click', function () {
    updatScore(playerOne, playerTwo)
})

playerTwo.button.addEventListener('click', function () {
    updatScore(playerTwo, playerOne)
})

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)