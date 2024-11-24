const board = document.getElementById('game-board');
const net = document.getElementById('net');
let netState = 'none';
net.style.display = netState;
const gridSize = 60;
let gameStarted = false;
let gameInterval;
let gameSpeedDelay = 500;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const player1Score = document.getElementById('player-1');
const player2Score = document.getElementById('player-2');
//let padel1 = generatePadel1();
let padel1Position = {x:1,y:10};
let player1Direction = 'up';
//let padel2 = generatePadel2();
let padel2Position = {x:60,y:46};




// create the game padels or ball 
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set the position of the padel or ball
function setPosition(element,position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//draw player padels 
function drawPlayer1Padel(){
    //if(gameStarted){
    const pPadel1 = createGameElement('div','padel-1');
    
    setPosition(pPadel1, padel1Position);
    
    board.appendChild(pPadel1);
    
    //}
}
function drawPlayer2Padel(){
    //if(gameStarted){
    
    const pPadel2 = createGameElement('div','padel-2');
    
    setPosition(pPadel2,padel2Position);
    
    board.appendChild(pPadel2);
    //}
}



function draw(){
    //board.innerHTML ='';
    
    drawPlayer1Padel();
    //drawPlayer2Padel(); 
    
}


function startGame() {
    gameStarted = true;//Keep track of if game is running
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    netState = 'block';
    net.style.display = netState;
    gameInterval= setInterval(()=> {
        move();
        //checkCollision();
        draw();
    },gameSpeedDelay)
}


// move padel function
function move(){
    const player1 = {...padel1Position};
    switch (player1Direction) {
        case 'down':
            console.log('down');
            player1.y++;
            break;
        case 'up':
            console.log('up');
            player1.y--;
            break;
    }
   //padel1Position.unshift(player1);
}



//Keypress event listener
function player1KeyPress(event){
    if(!gameStarted && (event.code === 'Space'|| event.key === ' '))
    {
        console.log("space key pressed")
        startGame();
    }else{
    switch (event.key) {
        case 'ArrowUp':
            player1Direction = 'up';
            break;
        case 'ArrowDown':
            player1Direction = 'down';
            break;
        }
    }   
}
document.addEventListener('keydown', player1KeyPress);

// creating a function to stop at limits of board

function moveLimits(){
    if((padel1Position.y === 1) || (padel1Position.y === gridSize-6)){
        stop();
    }
}


// function to stop padels movements
