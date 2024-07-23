const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

let isXNext = true;
let board = Array(9).fill(null);

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner(board)) {
        return;
    }
    board[index] = isXNext ? 'X' : 'O';
    event.target.textContent = board[index];
    event.target.classList.add('animated');
    clickSound.play();
    if (checkWinner(board)) {
        message.textContent = `Player ${board[index]} wins!`;
        winSound.play();
    } else if (board.every(cell => cell)) {
        message.textContent = 'It\'s a draw!';
        drawSound.play();
    } else {
        isXNext = !isXNext;
        message.textContent = `Player ${isXNext ? 'X' : 'O'}'s turn`;
        if (!isXNext) {
            setTimeout(playAgainstAI, 500);
        }
    }
}

function playAgainstAI() {
    const emptyIndices = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
    if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        cells[randomIndex].classList.add('animated');
        clickSound.play();
        if (checkWinner(board)) {
            message.textContent = 'Player O wins!';
            winSound.play();
        } else if (board.every(cell => cell)) {
            message.textContent = 'It\'s a draw!';
            drawSound.play();
        } else {
            isXNext = true;
            message.textContent = 'Player X\'s turn';
        }
    }
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('animated');
    });
    isXNext = true;
    message.textContent = `Player X's turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
message.textContent = `Player X's turn`;
