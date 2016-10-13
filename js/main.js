/* jslint esversion:6 */
/* Game Object Definition */
const gamer1 = "X";
const gamer2 = "O";
var game = {
  turn: gamer1, //takes values beetwen 0 and 1, if 0 turn of X, if turn of O
};
game.over = false;
game.winner = null;
game.board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
game.nextTurn = function(){
  if(game.turn === gamer1){
    game.turn = gamer2;
  }else {
    game.turn = gamer1;
  }
  return game.turn;
};
game.checkWinner = function(){
  if(game.board.dom_ready !== true){
    return null;
  }
  // Validatin rows for winner
  game.board.forEach(function (row) {
    if(row[0].textContent === row[1].textContent &&
       row[1].textContent === row[2].textContent &&
       row[0].textContent !== ''){
         game.winner = row[0].textContent;
       }
  });
  // Validating Collumns for winner
  var i=0;
  for (i = 0;i < game.board.length; i++) {
    if(game.board[0][i].textContent === game.board[1][i].textContent &&
       game.board[1][i].textContent === game.board[2][i].textContent &&
       game.board[0][i].textContent !== '' ){
         game.winner = game.board[0][i].textContent;
       }
  }
  //Check Diagonals
  if(game.board[1][1].textContent === game.board[2][2].textContent &&
     game.board[2][2].textContent === game.board[3][3].textContent &&
     game.board[1][1].textContent !== ''){
       game.winner = game.board[1][1].textContent;
     }
  if(game.board[0][2].textContent === game.board[1][1].textContent &&
     game.board[1][1].textContent === game.board[2][0].textContent &&
     game.board[0][2].textContent !== ''){
       game.winner = game.board[0][2].textContent;
     }

  if(game.winner !== null){
    console.log(game.winner);
  }
 };
/* End Game Object Definition */

document.addEventListener("DOMContentLoaded", function(){
  //Here must be only what need Dom elements
  var row0 = document.querySelectorAll("#boardgame li[data-y='0']");
  var row1 = document.querySelectorAll("#boardgame li[data-y='1']");
  var row2 = document.querySelectorAll("#boardgame li[data-y='2']");
  var playing_info = document.querySelectorAll("#game-info .player");
  playing_info = Array.from(playing_info);
  game.board[0] = Array.from(row0);
  game.board[1] = Array.from(row1);
  game.board[2] = Array.from(row2);
  game.board.dom_ready = true;
  //console.log(game.board);
  // Board ready
  game.board.forEach(function(row, index, board){
    //add click behavior per cell
    row.forEach(function(cell, index, board){
      cell.addEventListener("click", function(){
        if(cell.textContent !== "" || game.winner !== null){
          return;
        }
        cell.textContent = game.turn;
        if(game.nextTurn() === gamer1){
          playing_info[0].querySelector(".status").textContent = "Juega";
          playing_info[1].querySelector(".status").textContent = "Espera";
        }else{
          playing_info[0].querySelector(".status").textContent = "Espera";
          playing_info[1].querySelector(".status").textContent = "Juega";
        }
        game.checkWinner();
      }); //Function on
    });// For each of row
  });// For ecah of board

});
