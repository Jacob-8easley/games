const board = document.getElementById('game-board');
const net = document.getElementById('net');
let netState = 'none';
net.style.display = netState;
const gridSize = 300;
let gameStarted = false;
let gameInterval;
let gameSpeedDelay = 40;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score1 = document.getElementById('player-1');
const score2 = document.getElementById('player-2');
//const padel1 = document.getElementsByClassName('padel-1')
let padel1Position = {x:5,y:60};
let padel2Position = {x:gridSize-10,y:gridSize-60};
let ballPosition = {
    x:150,
    y:150,
    ballSpeedX: 1,
    ballSpeedY:2
};
let player1Score = 0;
let player2Score = 0;

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
    const pPadel1 = createGameElement('div','padel-1');
    setPosition(pPadel1, padel1Position);
    board.appendChild(pPadel1);
}
function drawPlayer2Padel(){
    const pPadel2 = createGameElement('div','padel-2');
    setPosition(pPadel2,padel2Position);
    board.appendChild(pPadel2);
}
function drawBall(){
    const ball = createGameElement('div','ball');
    setPosition(ball,ballPosition);
    board.appendChild(ball)
}

function moveBall(){
    ballPosition.x += ballPosition.ballSpeedX;
    ballPosition.y += ballPosition.ballSpeedY;
    if(ballPosition.y <= 1 ||(ballPosition.y >= gridSize-10)){
        ballPosition.ballSpeedY *= -1; //reverse direction 
    
    }
}
function reboundBall(){
    ballPosition.ballSpeedX *= -1;
}

const padel1 = document.getElementsByClassName('padel-1')
const padel2 = document.getElementsByClassName('padel-2')

function draw(){
    //padel1.innerHTML ='';
    drawPlayer1Padel();
    drawPlayer2Padel(); 
    drawBall();
    drawNet();
}
function drawNet(){
    netState = 'block';
    net.style.display = netState;  // displays net
    board.appendChild(net)
}
function hideStartingText(){
    instructionText.style.display = 'none';// hides instruction text
    logo.style.display = 'none'; // hides game logo
}
function showStartingText(){
    instructionText.style.display = 'block';// shows instruction text
    logo.style.display = 'block'; // shows game logo
}
function hideHtmlElements(){
    board.innerHTML =''
}

function startGame() {
    gameStarted = true;//Keep track of if game is running
    hideStartingText();
    clearInterval(gameInterval);
    player1Score = 0;
    player2Score = 0;
    
    gameInterval = setInterval(() => {
        board.innerHTML='';
        draw();
        if(checkCollision(ballPosition,padel1Position)){
            if(ballPosition.x <= padel1Position.x + 10){
                ballPosition.ballSpeedX *=-1;
            }
        }else if (checkCollision(ballPosition,padel2Position)){
            if(ballPosition.x + 10 >= padel1Position.x){
                ballPosition.ballSpeedX *=-1;
            }
        }
        scoring();
        moveBall();
        gameEndWinner();
        quitGame(); 
    }, gameSpeedDelay);
    document.addEventListener('keydown', player1KeyPress);
    document.addEventListener('keydown', player2KeyPress);
}

function checkCollision(a,b){
    return a.x < b.x + 5 &&
    a.x + 5 > b.x &&
    a.y < b.y + 30 &&
    a.y + 5 > b.y;
}
//Keypress event listener and padel1 mover
const keysPressed = new Set([]);

function deleteKeys(key){
    document.addEventListener('keyup', (event) => {
    keysPressed.delete(key); // Remove the key from the pressed keys object
    });
}

function quitGame(){
    if(keysPressed.has('q')){
        clearInterval(gameInterval)
        gameStarted = false;
        hideHtmlElements();
        showStartingText();
        deleteKeys('q')
    }
}

function player1KeyPress(event){
    keysPressed.add(event.key);
    //player 1
    
    if((keysPressed.has('ArrowUp'))&& (outOfBoundsTop(padel1Position.y))) { 
        padel1Position.y-=3;
        //board.innerHTML =''
        draw();
        console.log(keysPressed)
        deleteKeys('ArrowUp'); 
        console.log(keysPressed)
        console.log(padel1Position)

    }else if (keysPressed.has('ArrowDown')&& outOfBoundsBottom(padel1Position.y)){
        //keysPressed.unshift(event.key)
        padel1Position.y+=3;
        //board.innerHTML =''
        draw();
        console.log(keysPressed)
        deleteKeys('ArrowDown');
        console.log(padel1Position)
    }
    

};
    //player 2
function player2KeyPress(event){
    keysPressed.add(event.key);
    
    if(keysPressed.has('s')&& outOfBoundsBottom(padel2Position.y)){
        padel2Position.y+=3;
        // board.innerHTML =''
        draw();
        console.log(keysPressed)
        deleteKeys('s');
        //console.log(padel2Position)

    }
    else if(keysPressed.has('w')&& outOfBoundsTop(padel2Position.y)){
        padel2Position.y-=3;
        // board.innerHTML =''
        draw();
        console.log(keysPressed)
        deleteKeys('w');
        //console.log(padel2Position)


    }
};

function outOfBoundsTop(yPosition){
        return (yPosition > 1);
}
function outOfBoundsBottom(yPosition){
    return (yPosition < gridSize-30)
}
function scoring(){
    if (ballPosition.x > gridSize - 5){
        player1Score += 1;
        score1.textContent = player1Score.toString().padStart(2,'0');
        resetBall();
    }else if (ballPosition.x < 1){
        player2Score += 1;
        score2.textContent = player2Score.toString().padStart(2,'0');
        resetBall();
    }
}
//reset the ball after point is scored
function resetBall(){
    ballPosition.x = 150
    ballPosition.y = 150
}

//End game and display winner
function gameEndWinner(){
    if(player1Score === 11 || player2Score === 11){
        clearInterval(gameInterval)
        gameStarted = false;
        hideHtmlElements();
        showStartingText();
          
    }
        
}



// start game with space-bar
document.onkeydown = (start) => {
    if(!gameStarted && (start.code === 'Space'|| start.key === ' ')){
        console.log('press key space')            
        startGame();
    }
}

