const PlayerFactory = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  return { name, marker };
};

const player1 = PlayerFactory('Pobi', 'X');
const player2 = PlayerFactory('Polo', 'O');

const gameBoard = (() => {
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

const gameFlow = (() => {
  
})();

const display = (() => {})();

