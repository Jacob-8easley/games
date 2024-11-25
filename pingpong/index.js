const board = document.getElementById('game-board');
const net = document.getElementById('net');
let netState = 'none';
net.style.display = netState;
const gridSize = 300;
let gameStarted = false;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const player1Score = document.getElementById('player-1');
const player2Score = document.getElementById('player-2');
//const padel1 = document.getElementsByClassName('padel-1')
let padel1Position = {x:5,y:60};
let padel2Position = {x:gridSize-10,y:gridSize-60};





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
    board.innerHTML += ''
    console.log(board.innerHTML);
    
    //}
}
function drawPlayer2Padel(){
    //if(gameStarted){
    
    const pPadel2 = createGameElement('div','padel-2');
    
    setPosition(pPadel2,padel2Position);
    
    board.appendChild(pPadel2);
    //}
}



const padel1 = document.getElementsByClassName('padel-1')
const padel2 = document.getElementsByClassName('padel-2')

function draw(){
    //padel1.innerHTML ='';
    drawPlayer1Padel();
    drawPlayer2Padel(); 
    
}
function drawNet(){
    netState = 'block';
    net.style.display = netState;  // displays net
    board.appendChild(net)
}

function startGame() {
    gameStarted = true;//Keep track of if game is running
    while(gameStarted){
    instructionText.style.display = 'none';// hides instruction text
    logo.style.display = 'none'; // hides game logo
    drawNet();
    
    draw();
    console.log('drawn')
    playerKeyPress();
    console.log('finished')
    console.log(padel1);
    gameStarted = false;
    }
}

//Keypress event listener and padel1 mover
function playerKeyPress(event){
    console.log('this time')
    if(!gameStarted && (event.code === 'Space'|| event.key === ' '))
        {
            console.log("space key pressed")
            startGame();
        } 
    if(event ==='ArrowUp') {   
        padel1Position.y--;
    }else if (event ==='ArrowDown'){
        padel1Position.y++;
    }
    else if(event ==='s'){
        padel2Position.y++;
    }else if(event === 'w'){
        padel2Position.y--;


    }
};
document.addEventListener('keydown', playerKeyPress);
// document.addEventListener('keydown',player2KeyPress)
document.onkeydown = (playerKeyPress) => {
    if (playerKeyPress.key === 'ArrowUp'){
        console.log('UP')
        padel1Position.y --;
        board.innerHTML=''
        drawNet();
        draw();
        console.log(padel1)
        console.log(padel1Position.y)
    }
    else if(playerKeyPress.key === 'ArrowDown'){
        console.log('Down');
        board.innerHTML='';
        drawNet();
        draw();
        padel1Position.y++;
        console.log(padel1)
        console.log(padel1Position.y)
    }
// }
// document.onkeydown = (player2KeyPress) =>{
    if(playerKeyPress.key === 'w'){
        console.log('w');
        board.innerHTML='';
        drawNet();
        draw();
        padel2Position.y--;
        console.log(padel2)
        console.log(padel2Position.y);
    }
    else if(playerKeyPress.key === 's'){
        console.log('s');
        board.innerHTML='';
        padel2Position.y++;
        drawNet();
        draw();
        console.log(padel2)
        console.log(padel2Position.y)
}
}
// creating a function to stop at limits of board

function moveLimits(){
    if((padel1Position.y === 1) || (padel1Position.y === gridSize-6)){
        stop();
    }
}


// function to stop padels movements
function stop(){
    player1Direction = '';
};
//reset page
//location.reload();

