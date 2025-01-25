const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 640;

const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 20,
  height: 20,
  gravity: 0.5,
  lift: -10,
  velocity: 0
};

const pipes = [];
let frame = 0;
let score = 0;

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    pipe.x -= 2;
  });

  if (frame % 100 === 0) {
    const gap = 100;
    const top = Math.random() * (canvas.height / 2);
    pipes.push({
      x: canvas.width,
      width: 30,
      top: top,
      bottom: canvas.height - top - gap
    });
  }

  if (pipes.length > 0 && pipes[0].x + pipes[0].width < 0) {
    pipes.shift();
    score++;
  }
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    resetGame();
  }

  pipes.forEach(pipe => {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      resetGame();
    }
  });
}

function resetGame() {
  alert(`Game Over! Your score: ${score}`);
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes.length = 0;
  score = 0;
  frame = 0;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
  drawScore();
  updateBird();
  frame++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', () => {
  bird.velocity = bird.lift;
});

gameLoop();
      
