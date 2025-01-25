const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const jumpButton = document.getElementById('jumpButton');

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
    pipe.x -= 2; // Move pipes to the left
  });

  if (frame % 100 === 0) {
    const gap = 120; // Gap between pipes
    const top = Math.random() * (canvas.height / 2) + 50; // Random height for top pipe
    pipes.push({
      x: canvas.width,
      width: 50, // Pipe width
      top: top,
      bottom: canvas.height - top - gap
    });
  }

  if (pipes.length > 0 && pipes[0].x + pipes[0].width < 0) {
    pipes.shift(); // Remove pipes that go off-screen
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

  // Check collision with ground or ceiling
  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    resetGame();
  }

  // Check collision with pipes
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
  bird.y = canvas.height / 2;    // Reset bird's position
  bird.velocity = 0;            // Reset bird's velocity
  pipes.length = 0;             // Clear pipes
  score = 0;                    // Reset score
  frame = 0;                    // Reset frame counter
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

// Event Listener for Keyboard Input (Spacebar to Jump)
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    bird.velocity = bird.lift;
  }
});

// Event Listener for Jump Button (For Mobile/Touch Users)
jumpButton.addEventListener('click', () => {
  bird.velocity = bird.lift;
});

// Start the game loop
gameLoop();
