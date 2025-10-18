document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board div');
    
    squares.forEach(square => {
        square.classList.add('square');
    });
      let currentPlayer = 'X'; 
    let gameState = ['', '', '', '', '', '', '', '', '']; 

    squares.forEach((square, index) => {
        square.addEventListener('click', function() {
            if (gameState[index] === '') {
                gameState[index] = currentPlayer;
                
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });

});

