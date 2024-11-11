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
let food = generateFood()

// draw game map, snake and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
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
    const foodElement = createGameElement('div','food');
    setPosition(foodElement, food);
    board.appendChild(foodElement)
}
// Generate food
function generateFood(){
    const x = Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random()*gridSize)+1;
    return {x,y};
}







//testing draw function

draw();