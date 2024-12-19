let board = [];
let xIsNext = true;
let winner = null;

// Initialize the board
function initBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board = Array(9).fill(null); // Reset the board array

    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => handleSquareClick(i));
        boardElement.appendChild(square);
    }
}

// Update the status text
function updateStatus() {
    const statusElement = document.getElementById('status');
    if (winner) {
        statusElement.innerText = `Winner: ${winner}`;
    } else {
        statusElement.innerText = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
}

// Handle click on a square
function handleSquareClick(i) {
    if (board[i] || winner) return;

    board[i] = xIsNext ? 'X' : 'O';
    renderBoard();
    checkWinner();
    xIsNext = !xIsNext;

    // If it's AI's turn (when X is playing), trigger AI's move
    if (!xIsNext && !winner) {
        aiMove();
    }
}

// Render the board
function renderBoard() {
    const boardElement = document.getElementById('board');
    const squares = boardElement.querySelectorAll('.square');
    for (let i = 0; i < 9; i++) {
        squares[i].innerText = board[i];
    }
}

// Check for a winner
function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            updateStatus();
            return;
        }
    }

    // Check for a draw
    if (!board.includes(null)) {
        winner = 'Draw';
        updateStatus();
    }
}

// AI's move (picks a random empty square)
function aiMove() {
    const emptySquares = board.map((value, index) => value === null ? index : null).filter(val => val !== null);
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    board[randomIndex] = 'O';
    renderBoard();
    checkWinner();
    xIsNext = true; // Switch back to player X's turn
}

// Reset the game
function resetGame() {
    winner = null;
    xIsNext = true;
    initBoard();
    updateStatus();
}

// Initialize the game
initBoard();
updateStatus();