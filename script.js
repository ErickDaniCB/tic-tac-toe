const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory("Pobi", "X");
const player2 = PlayerFactory("Polo", "O");

const gameBoard = (() => {
  //BOARD MODULE

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

const gameFlow = (() => {
  // GAME FLOW MODULE

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
  const rowStrings = () => {
    let arrString = [];
    gameBoard.board.forEach((row) => {
      let joined = row.join("");
      arrString.push(joined);
    });
    return arrString;
  };

  const rowChecker = () => {
    let marker = `${currentPlayer.marker}`;
    let pattern = `${marker}${marker}${marker}`;
    const arrString = rowStrings();
    console.log(arrString);

    arrString.forEach((string) => {
      if (string === pattern) {
        console.log(`${marker} Winner by row!`);
      }
    });
  };

  //BY COLUMNS
  

  const checkWinner = () => {
    rowChecker();
  };

  makePlay(0, 0);
  makePlay(1, 0);
  makePlay(0, 1);
  makePlay(1, 1);
  makePlay(0, 2);
  console.table(gameBoard.board);
})();

const display = (() => {})();
