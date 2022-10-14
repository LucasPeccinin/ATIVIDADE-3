document.getElementById("current-player").innerHTML="teste";

//document.getElementsByClassName("current-player").innerHTML="ers";

var uI;
var board;
var players;
var gameRoles;
var isGameOver;

startGame = function(){
    isGameOver = false;
    players = [];
    players[0] = {id:1,name:"P X", peca:"X", isMyTurn:true, isWinner:false}
    players[1] = {id:2,name:"P O", peca:"O", isMyTurn:false, isWinner:false}
    board = [0,0,0,
             0,0,0,
             0,0,0];
    gameRoles = [[0,1,2], 
                 [3,4,5],
                 [6,7,8],
                 [2,5,8],
                 [0,4,8],
                 [2,4,6],
                 [0,3,6],
                 [1,4,7],
                 [2,5,8]];
    uI = {};
    setUi();
    eventHandle();
}

restartGame = function(){}

update = function()
{
    hasWinner();
    console.log(isGameOver);
}

hasWinner = function()
{
    for(let i = 0; i < gameRoles.lenght; i++)
    {
        for(let player of players)
        {
            if(board[gameRoles[i][0]] == player.id && board[gameRoles[i][1]] == player.id && board[gameRoles[i][2]] == player.id) 
            {
                player.isWinner = true;
                isGameOver = true;
                return true;
            }
        }
    }
    return false;
}

play = function(){}

eventHandle = function()
{
    let index = 0;
    for(let peca of uI.pecas)
    {
        peca.index = index++;
        peca.addEventListener("click", ()=>pecaEventClick(peca));
    }
}

pecaEventClick = function(peca)
{
    for(let player of players)
    {
        if(player.isMyTurn && board[peca.index] == 0) 
        {
            board[peca.index] = player.id;
            player.isMyTurn = false;
            if(player.id == 1)
            {
                players[1].isMyTurn = true;
            }
            if(player.id == 2)
            {
                players[0].isMyTurn = true;
            }
            console.log(board);
            uI.pecas[peca.index].innerText = player.peca;
            update();
            return 0;
        }
    }
    return 0;
}

setUi = function()
{
    uI.pecas = document.getElementsByClassName("peca");
    uI.current_player = document.querySelector(".current-player")
}

startGame();