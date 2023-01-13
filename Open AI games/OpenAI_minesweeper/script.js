const grid = []; // 2D array representing the game grid
const mines = []; // Array to store mine locations
const rows = 8; // Number of rows in the grid
const cols = 8; // Number of columns in the grid
const mineCount = 10; // Number of mines in the game

// Initialize the grid
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = {
            value: 0, // Number of neighboring mines
            isMine: false, // Whether the square is a mine
            isRevealed: false, // Whether the square has been revealed
            isFlagged: false // Whether the square has been flagged
        };
    }
}

// Place mines randomly on the grid
for (let i = 0; i < mineCount; i++) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);
    if (!grid[row][col].isMine) {
        grid[row][col].isMine = true;
        mines.push({row: row, col: col});
    } else {
        i--;
    }
}

// Function to initialize the grid
function initGrid() {
    // Initialize an empty grid
    grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push({
                mine: false,
                revealed: false,
                flagged: false,
                neighboringMines: 0
            });
        }
        grid.push(currentRow);
    }
    // Add mines to the grid
    addMines();
    // Count neighboring mines for each square
    countNeighboringMines();
}

// Function to add mines to the grid
function addMines() {
    let minesAdded = 0;
    while (minesAdded < mineCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!grid[row][col].mine) {
            grid[row][col].mine = true;
            minesAdded++;
        }
    }
}

// Function to count the number of neighboring mines for each square
function countNeighboringMines() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const square = grid[row][col];
            if (!square.mine) {
                square.neighboringMines = countSquareNeighboringMines(row, col);
            }
        }
    }
}

// Function to count the number of neighboring mines for a specific square
function countSquareNeighboringMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const neighboringRow = row + i;
            const neighboringCol = col + j;
            if (neighboringRow >= 0 && neighboringRow < rows && neighboringCol >= 0 && neighboringCol < cols) {
                if (grid[neighboringRow][neighboringCol].mine) {
                    count++;
                }
            }
        }
    }
    return count;
}

// Function to reveal a square
function reveal(row, col) {
    if (grid[row][col].isFlagged) {
        return;
    }

    if (grid[row][col].isMine) {
        alert('Game Over');
        return;
    }

    grid[row][col].isRevealed = true;

    if (grid[row][col].value === 0) {
        // Reveal all neighboring squares
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col-1; j <= col+1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && !grid[i][j].isRevealed) {
                    reveal(i, j);
                }
            }
        }
    }
}

// Function to toggle flagging a square
function toggleFlag(row, col) {
    if (!grid[row][col].isRevealed) {
        grid[row][col].isFlagged = !grid[row][col].isFlagged;
    }
}

// Count number of neighboring mines
function countMines() {
    for (let mine of mines) {
        let row = mine.row;
        let col = mine.col;
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col-1; j <= col+1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && !grid[i][j].isMine) {
                    grid[i][j].value++;
                }
            }
        }
    }
}

// Check if all non-mine squares have been revealed
function checkWin() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!grid[i][j].isMine && !grid[i][j].isRevealed) {
                return;
            }
        }
    }
    alert('You Win!');
}

// Function to handle a button click on the game grid
function buttonClick(row, col) {
    reveal(row, col);
    checkWin();
}

// Function to handle a right-click on a button
function buttonRightClick(row, col) {
    toggleFlag(row, col);
}

// Function to render the game grid
function renderGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const button = document.createElement("button");
            button.classList.add("square");
            button.setAttribute("onclick", `buttonClick(${i}, ${j})`);
            button.setAttribute("oncontextmenu", `buttonRightClick(${i}, ${j}); return false;`);
            gridContainer.appendChild(button);
        }
    }
}

// Function to update the display of the game grid
function updateGrid() {
    const buttons = document.querySelectorAll(".square");
    let buttonIndex = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isRevealed) {
                buttons[buttonIndex].classList.add("revealed");
                if (grid[i][j].isMine) {
                    buttons[buttonIndex].innerHTML = "X";
                } else {
                    buttons[buttonIndex].innerHTML = grid[i][j].value;
                }
            }
            if (grid[i][j].isFlagged) {
                buttons[buttonIndex].innerHTML = "F";
                buttons[buttonIndex].classList.add("flagged");
            }
            buttonIndex++;
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    countMines();
    renderGrid();
    updateGrid();
});

function changeDifficulty() {
    const difficultySelect = document.getElementById("difficulty-select");
    const selectedDifficulty = difficultySelect.value;

    switch (selectedDifficulty) {
        case "easy":
            rows = 8;
            cols = 8;
            mineCount = 10;
            break;
        case "medium":
            rows = 16;
            cols = 16;
            mineCount = 40;
            break;
        case "hard":
            rows = 16;
            cols = 30;
            mineCount = 99;
            break;
    }

    function restart() {
        initGrid();
        renderGrid();
        updateGrid();
        stopTimer();
        startTimer();
        resetScoreboard();
    }
}

countMines();