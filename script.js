const gridContainer = document.getElementById('grid');

  // Create 9 cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;

    cell.addEventListener('click', function () {
      this.textContent = 'X';
    });

    cell.addEventListener('dblclick', function (e) {
      e.preventDefault();
      this.textContent = 'O';
    });

    gridContainer.appendChild(cell);
  }

  function readGrid() {
    const cells = document.querySelectorAll('.cell');
    let grid = [[], [], []];
    for (let i = 0; i < cells.length; i++) {
      let row = Math.floor(i / 3);
      grid[row].push(cells[i].textContent || '');
    }

   function checkLineFormation(grid, player = 'X', countToWin = 3) {
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [0, 1],   // right
        [1, 0],   // down
        [1, 1],   // diagonal down-right
        [1, -1],  // diagonal down-left
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] !== player) continue;

            for (const [dr, dc] of directions) {
                let line = 1;
                let nr = r + dr;
                let nc = c + dc;

                while (
                    nr >= 0 && nr < rows &&
                    nc >= 0 && nc < cols &&
                    grid[nr][nc] === player
                ) {
                    line++;
                    if (line === countToWin) return true;
                    nr += dr;
                    nc += dc;
                }
            }
        }
    }

    return false;
}
    const xWins = checkLineFormation(grid, 'X');
    const oWins = checkLineFormation(grid, 'O');

    let result = '';
    if (xWins && oWins) {
      result = 'Both players cannot win simultaneously!';
    } else if (xWins) {
      result = 'Player X wins!';
    } else if (oWins) {
      result = 'Player O wins!';
    } else {
      result = 'No winner yet.';
    }
    document.getElementById('output').textContent = result;
  }



