var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

var playerA = 0;
var playerB = 0;
var storeWinningX = 0 ;
var storeWinningO = 0;
var lostX = 0;
var lostY = 0;
var storeDraw = 0;
var countX = 0;
var countY = 0;

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  console.log(turn)
  privateScoreUpdate();
  if(turn == 'X') {
    clearInterval(playerA);
    clearInterval(playerB);
    //console.log("player B turn")
      playerA = setInterval(() => {
         countY = countY + 1;
        // console.log('countB', countY)
       },1000)
  } else {
    clearInterval(playerA);
    clearInterval(playerB);
   // console.log("player A turn")
    playerB = setInterval(() => {
      countX= countX + 1;
     // console.log('countA', countX)
    },1000)
  }
  score[turn] += this.identifier;
  if (win(this)) {
    if(turn == 'X') {
      storeWinningX = storeWinningX + 1;
      if(storeWinningX === 1) {
         lostY = 1;
      }
       else if(storeWinningX > 1) {
        lostY = storeWinningX;
      }
      console.log(storeWinningX)
      console.log(lostY)
      clearInterval(playerA);
      setTimeout(() => {
        alert('Winner: Player A');
      }, 100)
    } else {
      storeWinningO = storeWinningO + 1;
      if(storeWinningO === 1) {
        lostX = 1;
     }
      else if(storeWinningO > 1) {
       lostX = storeWinningO;
     }
      console.log(storeWinningO)
      console.log(lostX)
      clearInterval(playerB); 
      setTimeout(() => {
        alert('Winner: Player B');
      }, 100)
    }
    setTimeout(()=> {
      startNewGame();
    }, 300)
    privateScoreUpdate();
  } else if (moves === N_SIZE * N_SIZE) {
    storeDraw = storeDraw + 1;
    privateScoreUpdate();
    console.log(storeDraw)
    setTimeout(() => {
      alert('Draw');
    }, 100)
    setTimeout(()=> {
      startNewGame();
    }, 300)
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    if(turn == 'X') {
    document.getElementById('turn').textContent = 'Player ' + 'A';
    } else {
      document.getElementById('turn').textContent = 'Player ' + 'B';
    }
  }
}
var toggleScoreX = true;
var toggleScoreY = true;

var player1C = document.getElementById("player1C");
var player2C = document.getElementById("player2C");
var player1Score = document.getElementById("player1Score");
var player2Score = document.getElementById("player2Score");
player1C.addEventListener('click', showScoreX);
player2C.addEventListener('click', showScoreO);

function showScoreX() {
  if(toggleScoreX) {
    toggleScoreX = false;
    player1Score.innerHTML =  "Win" + " " + storeWinningX + " " + "Lost"+ " " + lostX + " " + "Draw"  + " " + storeDraw + " " + "Time" + " " + countX + "sec";
  } else {
    toggleScoreX = true;
    player1Score.innerHTML = "";
  }
}
function showScoreO() {
  if(toggleScoreY) {
    toggleScoreY = false;
    player2Score.innerHTML =  "Win" + " " + storeWinningO + " " +"Lost"+ " " + lostY + " " + "Draw" + " " + storeDraw + " " +"Time" + " " + countY + "sec";
  } else {
    toggleScoreY = true;
    player2Score.innerHTML = "";
  }
}

function privateScoreUpdate() {
  if(!toggleScoreX) {
    player1Score.innerHTML =  "Win" + " " + storeWinningX + " " +  "Lost"+ " " + lostX + " " + "Draw"  + " " + storeDraw + " " + "Time" + " " + countX + "sec";
  }
  if(!toggleScoreY) {
    player2Score.innerHTML =  "Win" + " " + storeWinningO + " " + "Lost"+ " " + lostY +" " + "Draw" + " " + storeDraw + " " +"Time" + " " + countY + "sec";
  }
}


init();