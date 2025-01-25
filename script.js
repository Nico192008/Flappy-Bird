const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    gravity: 0.6,
    lift: -15,
    velocity: 0,
};

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function updatePipes() {
    if (frame % 75 === 0) {
        let top = Math.random() * (canvas.height / 2);
        let bottom = Math.random() * (canvas.height / 2);
        pipes.push({
            x: canvas.width,
            top: top,
            bottom: bottom,
            width: 50,
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        if (pipe.x + pipe.width < 0) {
            pipes.shift();
            score++;
        }

        // Collision detection
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
        ) {
            gameOver = true;
        }
    });
}

function update() {
    if (!gameOver) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.height >= canvas.height) {
            gameOver = true;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();
        updatePipes();
        frame++;
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over! Score: ' + score, canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText('Press any key or tap to restart', canvas.width / 2 - 150, canvas.height / 2 + 40);
        playButton.style.display = 'block'; // Show the play button
    }

    requestAnimationFrame(update);
}

// Function to handle jump
function jump() {
    if (!gameOver) {
        bird.velocity = bird.lift;
    } else {
        // Reset game
        pipes = [];
 bird.y = canvas.height / 2;
        bird.velocity = 0;
        score = 0;
        gameOver = false;
        frame = 0;
        playButton.style.display = 'none'; // Hide the play button when the game starts
    }
}

// Keyboard event listener
document.addEventListener('keydown', jump);

// Touch event listener
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    jump();
});

// Play button event listener
playButton.addEventListener('click', () => {
    jump(); // Start the game when the play button is clicked
});

update();
