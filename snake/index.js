//define html elements
//import $ from "jquery";
//import express from "express";
//import ejs from "ejs";
//import pg from "pg";
//import bodyParser from "body-parser";


const board = document.getElementById('game-board')

// $('#game-board)

//define game variables
const gridSize = 20;
let snake = [{ x:10, y:10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score')
const highScoreText = document.getElementById('highscore')

// draw game map, snake and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

//Draw snake
function drawSnake(){
    snake.forEach((segment) =>{
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

//create a snake or food cube 

function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
//set the snake position or foods
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Drawing the food
function drawFood(){
    if(gameStarted){
    const foodElement = createGameElement('div','food');
    setPosition(foodElement, food);
    board.appendChild(foodElement)
    }
}
// Generate food
function generateFood(){
    const x = Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random()*gridSize)+1;
    return {x,y};
}


// moving the snake
function move(){
    const head = {...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;
        case 'up':
            head.y--;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); // clear past interval
        gameInterval= setInterval(()=> {
            move();
            checkCollision();
            draw();
        },gameSpeedDelay)
    }else{
        snake.pop();
    }
}

//start game function 

function startGame() {
    console.log(gameSpeedDelay);
    gameStarted = true;//Keep track of if game is running
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

//Keypress event listener
function handleKeyPress(event){
    if(!gameStarted && (event.code === 'Space'|| event.key === ' '))
    {
        console.log("space key pressed")
        startGame();
    }else{
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowRight':
            direction = 'right';    
            break;
        }
    }   
}
document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -=5;
    }else if (gameSpeedDelay > 100){
        gameSpeedDelay -=3;
    }else if (gameSpeedDelay > 70){
        gameSpeedDelay -=2;
    }else if (gameSpeedDelay > 50){
        gameSpeedDelay -=1;
    }
}

function checkCollision(){
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame();
    }
    for (let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
    }
}


function resetGame(){
    updateHighscore();
    stopGame();
    snake = [{x:10,y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

function stopGame(){
    clearInterval(gameInterval)
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighscore(){
    const currentScore = snake.length -1;
    if (currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display = 'block';
}
//Test moving func
//setInterval(() => {
//   move();  //move first
//   draw(); // draw new position
//}, 200);





//testing draw function

//draw();