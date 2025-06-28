let currentPlayer = "X";           
let cells = ["", "", "", "", "", "", "", "", ""]; 
let gameOver = false;

function showBoard() {
  const board = document.getElementById("board");
  board.innerHTML = ""; 

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = cells[i];
    cell.onclick = function () {
      playMove(i);
    };
    board.appendChild(cell);
  }
}

function playMove(index) {
  if (cells[index] !== "" || gameOver) return;

  cells[index] = currentPlayer;
  showBoard();

  if (checkWinner()) {
    document.getElementById("status").innerText = currentPlayer + " wins!";
    gameOver = true;
  } else if (!cells.includes("")) {
    document.getElementById("status").innerText = "Draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = currentPlayer + "'s turn";
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      const cellDivs = document.querySelectorAll(".cell");
      cellDivs[a].classList.add("winning");
      cellDivs[b].classList.add("winning");
      cellDivs[c].classList.add("winning");
      return true;
    }
  }
  return false;
}


function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("status").innerText = currentPlayer + "'s turn";
  showBoard();
}

showBoard(); 

