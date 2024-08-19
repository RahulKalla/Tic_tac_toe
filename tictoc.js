document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    function createBoard() {
        board.innerHTML = '';
        gameState.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.dataset.index = index;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        });
    }

    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkForWinner()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkForWinner() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s Turn`;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
    status.textContent = `Player ${currentPlayer}'s Turn`;
});
