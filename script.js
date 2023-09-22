const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory("Pobi", "X");
const player2 = PlayerFactory("Polo", "O");

//BOARD MODULE ///

const gameBoard = (() => {
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

// GAME FLOW MODULE ///

const gameFlow = (() => {
  let currentPlayer = player1;

  const switchPlayer = () => {
    return currentPlayer === player1 ?  player2 :  player1;
  };

  const getCurrentMarker = () => {
    return currentPlayer.marker;
  }

  const makePlay = (cellRow, cellColumn, player) => {
    if (gameBoard.board[cellRow][cellColumn] === "") {
      player = currentPlayer;
      gameBoard.board[cellRow][cellColumn] = player.marker;
      checkWinner();
      currentPlayer = switchPlayer();
    }
  };

  // WIN CONDITIONS:

  //BY ROWS
  const rowArr = () => {
    const arrString = [];
    gameBoard.board.forEach((row) => {
      let joined = row.join("");
      arrString.push(joined);
    });
    return arrString;
  };

  //BY COLUMNS
  const columnArr = () => {
    const columnString = ["", "", ""];
    gameBoard.board.forEach((row) => {
      for (let i = 0; i < 3; i++) {
        columnString[i] += row[i];
      }
    });
    return columnString;
  };

  //BY DIAGONAL
  const diagonalArr = () => {
    const diagonalString = ["", ""];
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
  };

  const checker = (arrMarkers) => {
    let marker = `${currentPlayer.marker}`;
    let pattern = `${marker}${marker}${marker}`;
    const arrString = arrMarkers;

    arrMarkers.forEach((string) => {
      if (string === pattern) {
        console.log(`${marker} Winner`);
      }
    });
  };

  const checkWinner = () => {
    console.table(gameBoard.board);
    const row = rowArr();
    checker(row);
    const column = columnArr();
    checker(column);
    const diagonal = diagonalArr();
    checker(diagonal);
  };

  return { makePlay, getCurrentMarker };
})();

// DISPLAY GAME MODULE ///

const display = (() => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((item) => {
    const id = item.getAttribute("id");
    item.addEventListener("click", () => {
      item.textContent = gameFlow.getCurrentMarker();
      gameFlow.makePlay(id[0], id[1]);
    });
  });

  return {};
})();
