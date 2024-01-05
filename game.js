
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

//ball data
let pos_x = 20;
let pos_y = 20;
let dir_x = 5;
let dir_y = 5;
let ballSize = 10;
let ballSpeed = 60;


const drawBall = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(pos_x, pos_y, ballSize, 0, 2 * Math.PI);
  context.fillStyle = '#00FF00'
  context.fill();
  context.closePath();
}

const updateBallPosition = () => {
  pos_x += dir_x;
  pos_y += dir_y;

  if (pos_x + dir_x > canvas.width - ballSize || pos_x < ballSize) dir_x = -dir_x;
  if (pos_y + dir_y > canvas.height - ballSize || pos_y < ballSize) dir_y = -dir_y;
}

let ballDrawInterval = setInterval(drawBall, 5);
let ballSpeedInterval = setInterval(() => {
  updateBallPosition();
}, 100 - ballSpeed);
