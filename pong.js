const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 5;
let ballSpeedY = -5;
let score = 0;

let paused = false;

// Background music
const bgMusic = new Audio("background-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;
bgMusic.play();

// Listen for keyboard input
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === " ") togglePause(); // Spacebar toggles pause
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") rightPressed = false;
  if (e.key === "ArrowLeft") leftPressed = false;
});

// Pause/Resume game
function togglePause() {
  paused = !paused;
  if (paused) {
    bgMusic.pause();
  } else {
    bgMusic.play();
    gameLoop(); // Resume the game loop
  }
}

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = "#00A36C";
  ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 1, Math.PI * 5);
  ctx.fillStyle = "#0000FF";
  ctx.fill();
  ctx.closePath();
}

// Draw score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// Update game state
function update() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 15;
  if (leftPressed && paddleX > 0) paddleX -= 15;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with walls
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + ballRadius > canvas.height) {
    // Ball hits the bottom
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
      score++;
    } else {
      alert(`Game Over! Your score: ${score}`);
      document.location.reload();
    }
  }
}

// Main game loop
function gameLoop() {
  if (!paused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
    update();
    requestAnimationFrame(gameLoop);
  }
}

// Start the game
gameLoop();


