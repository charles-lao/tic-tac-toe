/* eslint-disable eqeqeq */
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
    const _statusHeader = document.querySelector('#status-header');
    const _statusText = document.querySelector('#status-text');
    const _changeNameBtn  = document.querySelector('#change-name-btn');
    const _formContainer = document.querySelector('.form-container');
    const _closeBtn = document.querySelector('#close-btn');
    const _saveBtn = document.querySelector('#save-btn');


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

    const displayRound = (roundNo, name) => {
        _statusHeader.textContent = `Round ${roundNo}`;
        _statusText.textContent = `${name}'s turn to play!`;
    }

    const displayWinner = (name) => {
        _statusHeader.textContent = 'GAME OVER!'
        _statusText.textContent = `${name} wins the game!`;
    }

    const displayTie = () => {
        _statusHeader.textContent = 'GAME OVER!'
        _statusText.textContent = 'It\'s a tie! No one won!';
    }

    // displays the form for changing player names
    _changeNameBtn.addEventListener('click', () => {
        _formContainer.style.display = 'inline';
    });

    _closeBtn.addEventListener('click', () => {
        hideForm();
    });

    _saveBtn.addEventListener('click', () => {
        const xName = document.querySelector('#x-name').value;
        const oName = document.querySelector('#o-name').value;

        game.changePlayerNames(xName, oName);
    });

    const hideForm = () => {
        _formContainer.style.display = 'none';
    };

    
    return {
        renderBoard, displayRound, displayWinner, displayTie, hideForm
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
        
        // add restart game function to button
        const _restartBtn = document.querySelector('#restart-btn');
        _restartBtn.addEventListener('click', game.start);

        for(let i = 0; i<gameBoard.board.length; i++) {
            gameBoard.board[i] = '';
        }

        roundNo = 1;
        
        displayController.renderBoard();
        displayController.displayRound(1, playerX.name);
        displayController.hideForm();
   
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
            
            // increase current round number
            roundNo++;

            
            if(roundNo < 10) {
                // update status display
                let playerName;

                if (moveType == 'x'){
                    playerName = playerO.name;
                } else {
                    playerName = playerX.name;
                }
                
                displayController.displayRound(roundNo, playerName);
            } else {
                // tie game
                displayController.displayTie();
            }
            
            // refresh board display
            displayController.renderBoard();

            if(roundNo > 5) {
                if(_checkWinner(moveType)){
                   const winner = _checkWinner(moveType);
                   displayController.displayWinner(winner);
                }
            }
        }

       
 
    };

    const _checkWinner = (moveType) => {

        // shorten variable names
        const c = gameBoard.board;
        const m = moveType;


        if(
            (c[0]==m && c[1]==m && c[2]==m) ||
            (c[3]==m && c[4]==m && c[5]==m) ||
            (c[6]==m && c[7]==m && c[8]==m) ||
            (c[0]==m && c[3]==m && c[6]==m) ||
            (c[1]==m && c[4]==m && c[7]==m) ||
            (c[2]==m && c[5]==m && c[8]==m) ||
            (c[0]==m && c[4]==m && c[8]==m) ||
            (c[2]==m && c[4]==m && c[6]==m)
        ) {
            if(m == 'x'){
                return playerX.name;
            } else if(m == 'o') {
                return playerO.name;
            }
        }  
    };

    const _checkPlayerTurn = () => {

        let moveType;

        if( (roundNo % 2) === 0){
            moveType = playerO.playerType;
        } else {
            moveType =  playerX.playerType;
        }

        return moveType;
    }

    const changePlayerNames = (xName, oName) => {
        if(xName != ''){
            playerX.name = xName;
        }
        if(oName != ''){
            playerO.name = oName;
        }

        // restarts the game to apply name changes
        if(xName != '' || oName != '') {
            game.start();
        }
        
    }

    return {
        start, placeMove, roundNo, playerX, playerO, changePlayerNames
    }

})();


// starts the game
game.start();

