const grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
let score = 0;
// Render the grid on the page
const renderGrid = () => {
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = '';
  for (let row of grid) {
    for (let cell of row) {
      const div = document.createElement('div');
      div.classList.add('cell');
      if (cell) {
        div.innerHTML = cell;
      }
      gridContainer.appendChild(div);
    }
  }
};

let direction = {};
let moved = {};
let combined = [];
let combine = [];

const moveAndCombine = (direction) => {
  let moved = move(direction);
  if (moved) {
    combine(direction);
    renderGrid();
    checkGameOver();
  }
};

// Move cells in the specified direction
const move = (direction) => {
  let moved = false;
  const combine = (direction) => {
    switch (direction) {
        case 'left':
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 3; col++) {
                    if (grid[row][col] === grid[row][col + 1] && grid[row][col] !== 0) {
                        grid[row][col] = grid[row][col] * 2;
                        grid[row][col + 1] = 0;
                        score += grid[row][col];
                    }
                }
            }
            break;
        case 'up':
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 4; col++) {
                    if (grid[row][col] === grid[row + 1][col] && grid[row][col] !== 0) {
                        grid[row][col] = grid[row][col] * 2;
                        grid[row + 1][col] = 0;
                        score += grid[row][col];
                    }
                }
            }
            break;
        case 'right':
            for (let row = 0; row < 4; row++) {
                for (let col = 3; col > 0; col--) {
                    if (grid[row][col] === grid[row][col - 1] && grid[row][col] !== 0) {
                        grid[row][col] = grid[row][col] * 2;
                        grid[row][col - 1] = 0;
                        score += grid[row][col];
                    }
                }
            }
            break;
        case 'down':
            for (let row = 3; row > 0; row--) {
                for (let col = 0; col < 4; col++) {
                    if (grid[row][col] === grid[row - 1][col] && grid[row][col] !== 0) {
                        grid[row][col] = grid[row][col] * 2;
                        grid[row - 1][col] = 0;
                        score += grid[row][col];
                    }
                }
            }
            break;
    }
};
    if (moved) {
        move();
        moved = false;
    }
  };
  // Code to move cells in the direction
  switch (direction) {
    case 'left':
      for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
          if (grid[row][col] !== 0) {
            let currentCol = col;
            while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
              grid[row][currentCol - 1] = grid[row][currentCol];
              grid[row][currentCol] = 0;
              currentCol--;
              moved = true;
            }
          }
        }
      }
      break;
    case 'up':
      for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
          if (grid[row][col] !== 0) {
            let currentRow = row;
            while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
              grid[currentRow - 1][col] = grid[currentRow][col];
              grid[currentRow][col] = 0;
              currentRow--;
              moved = true;
            }
          }
        }
      }
      break;
    case 'right':
      for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
          if (grid[row][col] !== 0) {
            let currentCol = col;
            while (currentCol < 3 && grid[row][currentCol + 1] === 0) {
              grid[row][currentCol + 1] = grid[row][currentCol];
              grid[row][currentCol] = 0;
              currentCol++;
              moved = true;
            }
          }
        }
      }
      break;
      case 'down':
        for (let col = 0; col < 4; col++) {
          for (let row = 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
              let currentRow = row;
              while (currentRow < 3 && grid[currentRow + 1][col] === 0) {
                grid[currentRow + 1][col] = grid[currentRow][col];
                grid[currentRow][col] = 0;
                currentRow++;
                moved = true;
              }
            }
          }
        }
        break;
  }
  if (moved) {
    combine();
    addRandomCell();
    renderGrid();
    checkGameOver();
  };

/*const combine = () => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] !== 0) {
        if (row > 0 && grid[row - 1][col] === grid[row][col]) {
          grid[row - 1][col] = grid[row - 1][col] * 2;
          grid[row][col] = 0;
          score += grid[row - 1][col];
          move('up');
        }
        if (row < 3 && grid[row + 1][col] === grid[row][col]) {
          grid[row + 1][col] = grid[row + 1][col] * 2;
          grid[row][col] = 0;
          score += grid[row + 1][col];
          move('down');
        }
        if (col > 0 && grid[row][col - 1] === grid[row][col]) {
          grid[row][col - 1] = grid[row][col - 1] * 2;
          grid[row][col] = 0;
          score += grid[row][col - 1];
          move('left');
        }
        if (col < 3 && grid[row][col + 1] === grid[row][col]) {
          grid[row][col + 1] = grid[row][col + 1] * 2;
          grid[row][col] = 0;
          score += grid[row][col + 1];
          move('right');
        }
      }
    }
  }
};*/

  // Add a new random cell to the grid
  const addRandomCell = () => {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    if (emptyCells.length > 0) {
      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      let randomValue = Math.random() < 0.9 ? 2 : 4;
      grid[randomCell.row][randomCell.col] = randomValue;
    }
  };
  
  // Check if the game is over
  const checkGameOver = () => {
    // Code to check if the game is over
    let gameOver = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          gameOver = false;
        }
        if (row < 3 && grid[row][col] === grid[row + 1][col]) {
          gameOver = false;
        }
        if (col < 3 && grid[row][col] === grid[row][col + 1]) {
          gameOver = false;
        }
      }
    }
    if (gameOver) {
      alert("Game Over! Your score is " + score);
    }
  };
  
  // Listen for arrow key presses to move the cells
  document.addEventListener('keydown', (event) => {
    let direction;
    if (event.code === 'ArrowLeft') {
      direction = 'left';
    } else if (event.code === 'ArrowUp') {
      direction = 'up';
    } else if (event.code === 'ArrowRight') {
      direction = 'right';
    } else if (event.code === 'ArrowDown') {
      direction = 'down';
    }
    moveAndCombine(direction);
});

    // Initialize the grid with a few random cells
    for (let i = 0; i < 2; i++) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      grid[row][col] = 2;
    }

  renderGrid();