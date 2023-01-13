const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  
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
  
  // Move cells in the specified direction
  const move = (direction) => {
    let moved = false;
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
      addRandomCell();
      renderGrid();
      checkGameOver();
    }
  };
  
  const addRandomCell = () => {
    const emptyCells = [];
    //code to find empty cells in the grid
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      // assign a random value to the cell
      const randomValues = [2, 2, 2, 2, 4];
      const randomValueIndex = Math.floor(Math.random() * randomValues.length);
      grid[randomCell.row][randomCell.col] = randomValues[randomValueIndex];
    }
  };
  
  // Add event listeners to the arrow keys
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 37:
        move('left');
        break;
      case 38:
        move('up');
        break;
      case 39:
        move('right');
        break;
      case 40:
        move('down');
        break;
    }
  });
  
  // Initialize the grid with a few random cells
  for (let i = 0; i < 2; i++) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    grid[row][col] = 2;
  }
  
  renderGrid();