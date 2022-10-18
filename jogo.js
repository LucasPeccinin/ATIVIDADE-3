var uI;
var board;
var players = [];
var gameRoles;
var isGameOver;
var form = document.forms["myForm"];

startGame = function () {
    initialize();
    eventIdentifier();
    setMessage();
    return false;
}

initialize = function () {
    var user_x = form["usuario_x"].value;
    var user_o = form["usuario_o"].value;
    isGameOver = false;
    players[0] = { id: 1, name: user_x, peca: "X", isMyTurn: true, isWinner: false };
    players[1] = { id: 2, name: user_o, peca: "O", isMyTurn: false, isWinner: false };
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameWin = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8], [0, 3, 6]];
    uI = {};
    setUi();
}


update = function () {
    if (winner()) {

    }
    setMessage();
}

winner = function () {
    for (let i = 0; i < gameWin.length; i++) {
        for (let player of players) {
            if (board[gameWin[i][0]] == player.id && board[gameWin[i][1]] == player.id && board[gameWin[i][2]] == player.id) {
                player.isWinner = true;
                isGameOver = true;
                player.isMyTurn = true;
                if (player.id == 1) {
                    players[1].isMyTurn = false;
                }
                if (player.id == 2) {
                    players[0].isMyTurn = false;
                }
                return true;
            }
        }
    }
    return false;
}

setMessage = function () {
    let j = 0;
    if (players[0].name.length != "" && players[1].name.length != "") {
        for (let player of players) {
            if (player.isMyTurn && !player.isWinner) {
                uI.current_player.innerText = "É a vez de: " + player.name;
            }
            else if (player.isWinner) {
                uI.current_player.innerText = player.name + " venceu!";
                alert(player.name + " venceu!");
                resetGame();
            }
            for (let i = 0; i <= board.length; i++) {
                if (board[i] == 1 || board[i] == 2 && !player.isWinner) {
                    j++;
                }
            }
            if (j == 9) {
                alert("Deu velha!");
                resetGame();
            }
            if (player.isWinner || j == 9) {
                resetGame();
            }
        }
    }
    else {
        alert("Preencha corretamente os nomes dos jogadores");
    }
}

eventIdentifier = function () {
    let index = 0;
    for (let peca of uI.pecas) {
        peca.index = index++;
        peca.addEventListener("click", () => pecaClick(peca));
    }
}

resetGame = function () {
    players[0].isWinner = false;
    players[1].isWinner = false;
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let piece of uI.pieces) {
        piece.innerText = "";
    }
    isGameOver = false;
}

pecaClick = function (peca) {
    if (!isGameOver) {
        for (let player of players) {
            if (player.isMyTurn && board[peca.index] == 0) {
                board[peca.index] = player.id;
                player.isMyTurn = false;
                if (player.id == 1) {
                    players[1].isMyTurn = true;
                }
                if (player.id == 2) {
                    players[0].isMyTurn = true;
                }
                uI.pecas[peca.index].innerText = player.peca;
                update();
                return 0;
            }
        }
        return 0;
    }
}

setUi = function () {
    uI.pecas = document.getElementsByClassName("peca");
    uI.current_player = document.querySelector(".current-player");
}
