const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPostions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];
let fillCount;
    // Function to initialize game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
    fillCount=0;
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
}
initGame();
function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        gameGrid[index]=currentPlayer;
        fillCount++;
        swapTurn();
        checkGameOver();
    }
}
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
    handleClick(index);
    });
});

function checkGameOver(){
    let answer="";
    winningPostions.forEach((position)=>{
        if (
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&gameGrid[position[0]] === gameGrid[position[2]]
        ){
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }else{
                answer="0";
            }
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
        }

        //winner find
        if(answer!==""){
            gameInfo.innerText=`Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }
        //Tied Case
        if(fillCount==9){
            gameInfo.innerText="Game Tie!";
            newGameBtn.classList.add("active");
        }

    });
}

newGameBtn.addEventListener('click',initGame);