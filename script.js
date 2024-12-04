const outline = document.querySelector(".outline");
const highScore = document.querySelector(".hs");
let foodX,foodY;
let snakeHeadX=15, snakeHeadY=15;
let velocityX=0 , velocityY=0;
let gameOver = false;
let interval;
let score,hs;

hs = localStorage.getItem("high-score") || 0;

const direction = (e)=>{
  if(e.key === "ArrowRight" && velocityX!=-1){
    velocityX = 1;
    velocityY = 0;
  }
  if(e.key === "ArrowLeft" &&velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
  if(e.key === "ArrowUp" &&velocityY!=1){
    velocityX = 0;
    velocityY = -1;
  }
  if(e.key === "ArrowDown" &&velocityY!=-1){
    velocityX = 0;
    velocityY = 1;
  }
}

function callOut(){
  clearInterval(interval);
  alert("game Over");
  location.reload();
}

const snakeMovement = () =>{
  snakeHeadX+=velocityX;
  snakeHeadY +=velocityY;
  init();
}

const changePosition = () =>{
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

let snakeBody = [];

const init = ()=>{

  if (gameOver == 1) return callOut();

  let markup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
  
  snakeBody[0] = [snakeHeadX,snakeHeadY]

  

  if(snakeHeadX === foodX && snakeHeadY===foodY){
    snakeBody.push([foodX,foodY]);
    console.log(snakeBody);
    changePosition();
  }

  for(let i=0;i<snakeBody.length;i++){
    markup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
  }

  for(let i=snakeBody.length-1;i>0;i--){
    snakeBody[i] = [...snakeBody[i-1]];
    if(i!=1 && (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1])){
      gameOver = true;
    }
  }

  if(snakeHeadX < 0 || snakeHeadX > 30 || snakeHeadY < 0 || snakeHeadY>30){
    gameOver = true;
  }
  score = snakeBody.length-1;
  hs = score > hs ? score : hs;
  highScore.innerHTML = `score: ${score} , high score: ${hs}`;
  localStorage.setItem("high-score",hs);
  outline.innerHTML = markup;
}

document.addEventListener("keydown",direction);

changePosition();
init();

function timeduration(x){
  return ((1-x)/2.4)+160;
}
interval = setInterval(snakeMovement,timeduration(snakeBody.length));