document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board div');
    const statusDiv = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    
    squares.forEach(square => {
        square.classList.add('square');
    });
    
    let currentPlayer = 'X'; 
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const originalMessage = 'Move your mouse over a square and click to play an X or an O.';

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]; 
            }
        }
        return null; 
    }

    function handleResult() {
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
            statusDiv.classList.add('you-won');
        }
    }

    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        
        statusDiv.textContent = originalMessage;
        statusDiv.classList.remove('you-won');
    }

    newGameBtn.addEventListener('click', resetGame);

    squares.forEach((square, index) => {
        square.addEventListener('click', function() {
            if (gameState[index] === '' && gameActive) {
                gameState[index] = currentPlayer;
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                
                handleResult();
                
                if (gameActive) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });

        square.addEventListener('mouseover', function() {
            if (gameState[index] === '' && gameActive) {
                square.classList.add('hover');
            }
        });

        square.addEventListener('mouseout', function() {
            square.classList.remove('hover');
        });
    });
});