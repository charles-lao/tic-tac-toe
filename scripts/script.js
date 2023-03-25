/* eslint-disable no-plusplus */

const gameBoard = (() => {
    const board = [
        "x", "o", "x", "o", "x", "o", "x", "o", "x"
    ];

    return {
        board
    };
})();

const displayController = ((board) => {

    const tBody = document.querySelector('.table-body');

    const render = () => {

        let boardIndex = 0;

        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');

            for (let c = 0; c < 3; c++) {
                const cell = document.createElement('td');
                cell.classList.add('boardCells');

                const moveText = document.createElement('p');

                cell.addEventListener('click', (e) => {
                    alert(cell);
                });

                moveText.textContent = board[boardIndex];
                boardIndex++;

                cell.appendChild(moveText);
                row.appendChild(cell);
            }

            tBody.appendChild(row);
        }

    };

    return {
        render
    };
})(gameBoard.board);

displayController.render();
