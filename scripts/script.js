/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */

const gameBoard = (() => {
    const board = [
        "", "", "", "", "", "", "", "", ""
    ];

    return {
        board
    };
})();

const displayController = ((board) => {

    const _tBody = document.querySelector('.table-body');

    const renderBoard = () => {
        _tBody.textContent = '';
        let boardIndex = 0;

        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');

            for (let c = 0; c < 3; c++) {
                const cell = document.createElement('td');
                cell.classList.add('boardCells');
                cell.dataset.indexNumber = boardIndex;
                cell.addEventListener('click', game.placeMove);
                cell.textContent = board[boardIndex];

                // const moveText = document.createElement('p');

                // moveText.textContent = board[boardIndex];
                boardIndex++;

                // cell.appendChild(moveText);
                row.appendChild(cell);
            }

            _tBody.appendChild(row);
        }

    };

    return {
        renderBoard
    };

})(gameBoard.board);


const Player = (name, playerType) => ({
        name, playerType
    });

const game = (() => {
    
    let roundNo = 1;
    const playerX = Player('Player-X', 'x');
    const playerO = Player('Player-O', 'o');
    

    const start = () => {
        
        displayController.renderBoard();

    }

    const _checkAvailableCell = (boardIndex) => {

        if (gameBoard.board[boardIndex] == '') {
            return true;
        } else {
            return false;
        }
    }

    // get gamestate or playerturn from the gameobject or player object
    const placeMove = (e) => {

        const boardIndex = e.target.dataset.indexNumber;

        

        // check if cell empty before populating it
        if(_checkAvailableCell(boardIndex) == true) {
            const moveType = _checkPlayerTurn();
            gameBoard.board[boardIndex] = moveType;
        }

        displayController.renderBoard();
    };

    const _checkPlayerTurn = () => {

        let moveType;

        if( (roundNo % 2) === 0){
            moveType = playerO.playerType;
            roundNo++;
        } else {
            moveType =  playerX.playerType;
            roundNo++;
        }

        return moveType;
    }

    

    return {
        start, placeMove, roundNo, playerX, playerO
    }

})();






game.start();

