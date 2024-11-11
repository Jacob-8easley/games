//define html elements
import jquery from "jquery";
import express from "express";
import ejs from "ejs";
import pg from "pg";
import bodyParser from "body-parser";
import { create } from "domain";

const board = $('game-board');

//define game variables
let snake = [{ x:10, y:10 }];

// draw game map, snake and food
function draw() {
    board.innerHTML = '';
    drawSnake();
}

//Draw snake
function drawSnake(){
    snake.forEach((segment) =>{
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement, segment);
        board.append(snakeElement);
    });
}

//create a snake or food cube 

function createGameElement(tag, className){
    const element = $(tag);
    element.className = className;
    return element;
}
//set the snake position or foods
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//testing draw function

draw();