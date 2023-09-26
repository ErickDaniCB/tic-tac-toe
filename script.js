const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory("Pobi", "X");
const player2 = PlayerFactory("Polo", "O");

//BOARD

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


// GAME FLOW MODULE ///

const gameFlow = (() => {
  let board = createBoard();
  let currentPlayer = player1;

  const switchPlayer = () => {
    return currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentMarker = () => {
    return currentPlayer.marker;
  };

  const makePlay = (cellRow, cellColumn, player) => {
    if (board[cellRow][cellColumn] === "") {
      player = currentPlayer;
      board[cellRow][cellColumn] = player.marker;
      console.table(board);

      const checkWin = checkEach();
      const checkFilled = isFilled();
      if (checkWin) {
        console.log(`${currentPlayer.marker} wins!`);
        restart();
      } else if (checkFilled) {
        console.log("Draw!");
        restart();
      }
      currentPlayer = switchPlayer();
    }
  };

  // WIN CONDITIONS:

  //BY ROWS
  const rowArr = () => {
    const arrString = [];
    board.forEach((row) => {
      let joined = row.join("");
      arrString.push(joined);
    });
    return arrString;
  };

  //BY COLUMNS
  const columnArr = () => {
    const columnString = ["", "", ""];
    board.forEach((row) => {
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
          diagonalString[0] += board[i][0];
          diagonalString[1] += board[i][2];
          break;
        case 1:
          diagonalString[0] += board[i][1];
          diagonalString[1] += board[i][1];
          break;
        case 2:
          diagonalString[0] += board[i][2];
          diagonalString[1] += board[i][0];
          break;
      }
    }
    return diagonalString;
  };

  const checker = (arrMarkers) => {
    const marker = `${currentPlayer.marker}`;
    const pattern = `${marker}${marker}${marker}`;
    let win = false;
    arrMarkers.forEach((string) => {
      if (string === pattern) {
        win = true;
      }
    });
    return win;
  };

  const checkEach = () => {
    const rowStrings = rowArr();
    const columnStrings = columnArr();
    const diagonalStrings = diagonalArr();

    const rowCheck = checker(rowStrings);
    const columnCheck = checker(columnStrings);
    const diagonalCheck = checker(diagonalStrings);

    if (rowCheck || columnCheck || diagonalCheck) {
      return true;
    } else return false;
  };

  //DRAW CONDITION:

  const isFilled = () => {
    let arrTemp = [];
    board.forEach((arr) => {
      arrTemp = arrTemp.concat(arr);
    });
    if(arrTemp.includes('')){
      return false;
    } return true;
  };
  
  //RESTART GAME 
  
  const restart = () => { 
    board = createBoard();
    console.log(board);
  }

  return { makePlay, getCurrentMarker };
})();

// DISPLAY GAME MODULE ///

const display = (() => {

  const cells = document.querySelectorAll(".cell");

  cells.forEach((item) => {
    const play = () => {
    const id = item.getAttribute("id");
      if (item.textContent === "") {
        item.textContent = gameFlow.getCurrentMarker();
        gameFlow.makePlay(id[0], id[1]);
      }
    }
    item.addEventListener("click", play);
  });

  return {} ;
})();
