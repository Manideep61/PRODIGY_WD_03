const board = document.getElementById('board');
const cells = document.querySelectorAll('.square');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let currentPlayer = 'X'; // AI will overwrite this on first turn
let gameState = ['', '', '', '', '', '', '', '', ''];

function makeMove(cellIndex, player) {
  if (gameState[cellIndex] !== '') {
    return; // Cell already occupied
  }
  gameState[cellIndex] = player;
  cells[cellIndex].textContent = player;
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  return gameState.every(cell => cell !== '');
}

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cell);
  makeMove(cellIndex, currentPlayer);
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    return;
  }
  if (isDraw()) {
    alert('Draw!');
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  makeAIMove();
}

function makeAIMove() {
  // Simplified AI (random move) for demonstration
  let emptyCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      emptyCells.push(i);
    }
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomCell, 'O');
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Make AI move on game start (ensures AI goes first)
makeAIMove();

