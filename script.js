const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory("Pobi", "X");
const player2 = PlayerFactory("Polo", "O");

const gameBoard = (() => {//BOARD MODULE

  const createBoard = () => {
    let grid = [];
    for (let i = 0; i < 3; i++) {
      const arr = [];
      for (let j = 0; j < 3; j++) {
        arr.push("");
      }
      grid.push(arr);
    }
    return grid;
  };

  let board = createBoard();

  return { board };
})();

const gameFlow = (() => {// GAME FLOW MODULE

  let currentPlayer = player1;

  const makePlay = (cellRow, cellColumn, player) => {
    player = currentPlayer;
    if (gameBoard.board[cellRow][cellColumn] === "") {
      gameBoard.board[cellRow][cellColumn] = player.marker;
      checkWinner(); //Probably have to move!!!!
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else currentPlayer = player1;
    }
  };

  // WIN CONDITIONS: //

  //BY ROWS
  const rowArr = () => {
    const arrString = [];
    gameBoard.board.forEach(row => {
      let joined = row.join("");
      arrString.push(joined);
    });
    return arrString;
  };

  
  //BY COLUMNS
  const columnArr = () => {
    const columnString = ['','',''];
    gameBoard.board.forEach(row => {
      for (let i = 0; i < 3; i++) {
        columnString[i] += row[i];
      }
    });
    return columnString;
  }

  //BY DIAGONAL 
  const diagonalArr = () => { 
    const diagonalString = ['',''];
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 0:
          diagonalString[0] += gameBoard.board[i][0];
          diagonalString[1] += gameBoard.board[i][2];
        break;
        case 1:
          diagonalString[0] += gameBoard.board[i][1];
          diagonalString[1] += gameBoard.board[i][1];
        break;
        case 2:
          diagonalString[0] += gameBoard.board[i][2];
          diagonalString[1] += gameBoard.board[i][0];
        break; 
      }
    }
    return diagonalString;
  }
  
  const checker = (arrMarkers) => {
    let marker = `${currentPlayer.marker}`;
    let pattern = `${marker}${marker}${marker}`;
    const arrString = arrMarkers;
    console.log(arrString);
    
    arrMarkers.forEach((string) => {
      if (string === pattern) {
        console.log(`${marker} Winner`);
      }
    });
  };
  
  const checkWinner = () => {
    const row = rowArr();
    checker(row);
    const column = columnArr();
    checker(column);
    const diagonal = diagonalArr();
    checker(diagonal);
  };

  makePlay(0, 0);//X
  makePlay(0, 2);//O
  makePlay(2, 2);//X
  makePlay(2, 1);//O
  makePlay(1, 1);//X
  console.table(gameBoard.board);
})();

const display = (() => {})();
