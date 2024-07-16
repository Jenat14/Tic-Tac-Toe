function Player(name, role) {
    this.name = name;
    this.role = role;
  }
    Player.prototype.getName = function() {
    return this.name;
  };
    Player.prototype.getrole = function() {
    return this.role;
  };
  document.getElementById('player-details').addEventListener('submit', function(event) {
    event.preventDefault();
    const player1Name = document.getElementById('player1').value || 'Player 1';
    const player2Name = document.getElementById('player2').value || 'Player 2';
  
    TicTacToeGame.initialize(player1Name, player2Name);
  });
  
  const TicTacToeGame = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: null,
    isGameActive: true,
    players: {
      player1: null,
      player2: null
    },
  
    boardElement: document.getElementById('board'),
    cells: document.querySelectorAll('.cell'),
    resetButton: document.getElementById('reset-game'),
    statusElement: document.getElementById('status'),
    turnElement: document.getElementById('turn'),
  
    winningConditions: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ],
  
    initialize: function(player1Name, player2Name) {
      this.players.player1 = new Player(player1Name, 'X');
      this.players.player2 = new Player(player2Name, 'O');
      this.currentPlayer = this.players.player1;
  
      document.getElementById('player-form').style.display = 'none';
      document.getElementById('game').style.display = 'grid';
  
      this.cells.forEach(cell => {
        cell.addEventListener('click', () => this.handleCellClick(cell));
      });
  
      this.resetButton.addEventListener('click', () => this.restartGame());
  
      this.updateTurnDisplay();
    },
  
    handleCellClick: function(cell) {
      if (!this.isGameActive) return;
  
      const index = parseInt(cell.getAttribute('data-cell-index'));
      if (this.board[index] === '') {
        this.board[index] = this.currentPlayer.getrole();
        cell.innerText = this.currentPlayer.getrole();
  
        if (this.checkWin()) {
          this.statusElement.innerText = `${this.currentPlayer.getName()} wins!`;
          this.isGameActive = false;
        } else if (this.board.every(cell => cell !== '')) {
          this.statusElement.innerText = "It's a draw!";
          this.isGameActive = false;
        } else {
          this.currentPlayer = (this.currentPlayer === this.players.player1) ? this.players.player2 : this.players.player1;
          this.updateTurnDisplay();
        }
      }
    },
  
    checkWin: function() {
      return this.winningConditions.some(condition => {
        const [a, b, c] = condition;
        return this.board[a] !== '' && this.board[a] === this.board[b] && this.board[b] === this.board[c];
      });
    },
  
    updateTurnDisplay: function() {
      this.turnElement.innerText = `Current turn: ${this.currentPlayer.getName()}`;
      this.statusElement.innerText = '';
    },
  
    restartGame: function() {
      this.board = ['', '', '', '', '', '', '', '', ''];
      this.currentPlayer = this.players.player1;
      this.isGameActive = true;
      this.cells.forEach(cell => cell.innerText = '');
      this.updateTurnDisplay();
    }
  };
  