const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

//game intervals
let ballDrawInterval;
let ballSpeedInterval;

//game options
let gameStarted = true;
let gamePaused = false;
let gameOver = false;
let gameScore = 0;
let gameLives = 3;
let gameSpeed = 70;

//ball options
let ball_x = 20;
let ball_y = 20;
let dir_x = 5;
let dir_y = 5;
let ballSize = 10;

//paddle options
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 5;
let paddleSpeed = 5;
let paddleMoveLeft = false;
let paddleMoveRight = false;

const drawPaddle = () => {
  context.beginPath();
  context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = '#00FF00';
  context.fill();
  context.closePath();
}

const drawBall = () => {
  context.beginPath();
  context.arc(ball_x, ball_y, ballSize, 0, 2 * Math.PI);
  context.fillStyle = '#00FF00'
  context.fill();
  context.closePath();
}

const drawToScreen = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
}

const updateBallPosition = () => {
  ball_x += dir_x;
  ball_y += dir_y;

  if (ball_x + dir_x > canvas.width - ballSize || ball_x < ballSize) dir_x = -dir_x;
  if (ball_y + dir_y > canvas.height - ballSize || ball_y < ballSize) dir_y = -dir_y;
}

const updatePaddlePosition = () => {
  if (paddleMoveLeft && paddleX > 0) paddleX -= paddleSpeed;
  if (paddleMoveRight && paddleX < canvas.width - paddleWidth) paddleX += paddleSpeed;

  if (ball_y + ballSize >= paddleY && ball_x >= paddleX && ball_x <= paddleX + paddleWidth) {
    dir_y = -dir_y;
    gameScore++;
  }
}

const updateGame = () => {
  if (gameStarted && !gamePaused && !gameOver) {
    updateBallPosition();
    updatePaddlePosition();
    drawToScreen();
  }
}

const startGame = () => {
  setInterval(updateGame, 100 - gameSpeed);
}

document.addEventListener('keydown', ({ key }) => {
  console.log(key)
  if (!paddleMoveLeft && key === 'ArrowLeft') paddleMoveLeft = true;
  if (!paddleMoveRight && key === 'ArrowRight') paddleMoveRight = true;
})

document.addEventListener('keyup', ({ key }) => {
  if (key === 'ArrowLeft') paddleMoveLeft = false;
  if (key === 'ArrowRight') paddleMoveRight = false;
  if (key === 'Enter') startGame();
  if (key === 'Escape') gameStarted = false;
  if (key === ' ') gamePaused = !gamePaused;
})

