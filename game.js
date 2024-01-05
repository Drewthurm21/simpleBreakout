
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

//ball data
let pos_x = 0;
let pos_y = 0;
let ballSize = 10;
let dir_x = 1;
let dir_y = 1;


const createBall = () => {
  context.beginPath();
  context.arc(pos_x, pos_y, ballSize, 0, 2 * Math.PI);
  context.fillStyle = '#00FF00'
  context.fill();
  context.closePath();
}

const updateBallPosition = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  createBall();

  pos_x += ballSize + dir_x;
  pos_y += ballSize + dir_y;
}

let interval = setInterval(() => {
  console.log('interval')
  updateBallPosition();
}, 100);
