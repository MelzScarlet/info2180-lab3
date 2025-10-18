document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board div');
    const statusDiv = document.getElementById('status');
    
    squares.forEach(square => {
        square.classList.add('square');
    });
    
    let currentPlayer = 'X'; 
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
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