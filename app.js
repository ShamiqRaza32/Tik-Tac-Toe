const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function handleResult(result) {
  gameActive = false;
  if (result === 'X' || result === 'O') {
    message.textContent = `${result} wins!`;
  } else {
    message.textContent = 'It\'s a draw!';
  }
}

function playerMove(cellIndex) {
  if (gameState[cellIndex] === '' && gameActive) {
    gameState[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    const winner = checkWin();
    if (winner) {
      handleResult(winner);
    } else if (checkDraw()) {
      handleResult('draw');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}
