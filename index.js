
const myCanvas = { width: 500, height: 600};
const backgroundColor = [255, 161, 211];
const lineColor = [255, 247, 135];
const activeLineColor = [255, 54, 54];
const lineWidth = 10;
const activelineWidth = 20;
const sounds = Array.from({ length: 6 });

const ball1 = {
    x: 300,
    y: 300,
    size: 100,
    speed: 2,
    fillColor: [0, 255, 187],
    strokeColor: [212, 163, 255],
    ballStrokeWeight: 5,
    rightSound: sounds[0],
    leftSound: sounds[1],
    soundLength: 2000,
} 

const ball2 = {
    x: 300,
    y: 100,
    size: 50,
    speed: 5,
    fillColor: [169, 177, 252],
    strokeColor: [55, 74, 250],
    ballStrokeWeight: 5,
    rightSound: sounds[2],
    leftSound: sounds[3],
    soundLength: 1000,
} 

const ball3 = {
    x: 300,
    y: 200,
    size: 20,
    speed: 8,
    fillColor: [190,80,230],
    strokeColor: [0,220,20],
    ballStrokeWeight: 10,
    rightSound: sounds[4],
    leftSound: sounds[5],
    soundLength: 500,
} 

const leftEdge = {
    x1: 50,
    y1: 0,
    x2: 50,
    y2: 600,
    color: lineColor,
    width: lineWidth,

}

const rightEdge = {
    x1: 450,
    y1: 0,
    x2: 450,
    y2: 600,
    color: lineColor,
    width: lineWidth,
}


const balls = [ball1, ball2, ball3];



function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.wav`)
    })

    console.log(sounds);

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];

}

function setup(){
    createCanvas(myCanvas.width, myCanvas.height);
    background(backgroundColor);
}



function draw(){
    
    background(backgroundColor);

    balls.forEach((ball) => {
        updateBall(ball);
        displayBall(ball);
    })
    drawLine(leftEdge);
    drawLine(rightEdge);
}


function updateBall(ball){
    console.log(ball.x);
    if(ball.x + ball.size/2 > rightEdge.x1 ){
        ball.speed *= -1;
        ball.rightSound.play();
        activateLine(rightEdge);
    } else if(ball.x - ball.size/2 < leftEdge.x1 ){
        ball.speed *= -1;
        ball.leftSound.play();
        activateLine(leftEdge);
    }
    ball.x+= ball.speed;
}


const displayBall = ({x, y, size, strokeColor, fillColor, ballStrokeWeight}) => {
        stroke(strokeColor);
        fill(fillColor);
        strokeWeight(ballStrokeWeight);
        ellipse(x, y, size);
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}



function activateLine(line){

    line.color = activeLineColor;
    line.width = activelineWidth;

    setTimeout(() => resetLines(line), 500);
}


function resetLines(line){
    line.color = lineColor;
    line.width = lineWidth;
}