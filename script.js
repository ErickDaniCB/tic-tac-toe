const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory('Pobi', 'X');
const player2 = PlayerFactory('Polo', 'O');

const gameBoard = (() => {//BOARD MODULE

  const createBoard = () => {
    let grid = []; 
    for (let i = 0; i < 3; i++) {
      const arr = [];
      for (let j = 0; j < 3; j++) {
        arr.push('cell');
      }
      grid.push(arr);
    }
    return grid;
  }

  let board = createBoard();
  console.table(board);

  return { board };
})();

const gameFlow = (() => {// GAME FLOW MODULE

  let currentPlayer = player1;
  const makePlay = (cellRow, cellColumn, player) => {
    player = currentPlayer;
    if(gameBoard.board[cellRow][cellColumn] === 'cell'){
      gameBoard.board[cellRow][cellColumn] = player.marker;
      if(currentPlayer === player1){//Toggle player*
        currentPlayer = player2;
      } else currentPlayer = player1;
    }
  }

  const checkWinner = () => {
    
  }

  makePlay(1,1);
  makePlay(1,2);
  makePlay(1,0);
  console.table(gameBoard.board);
})();

const display = (() => {})();

