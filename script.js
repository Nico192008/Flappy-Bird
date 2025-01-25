const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const jumpButton = document.getElementById('jumpButton');

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
            bottom : bottom,
            width: 50,
        });
    }
    pipes.forEach(pipe => {
        pipe.x -= 2; // Move pipes to the left
    });
    if (pipes.length && pipes[0].x < -pipes[0].width) {
        pipes.shift(); // Remove pipes that have gone off screen
        score++; // Increase score for each pipe passed
    }
}

function checkCollision() {
    for (let pipe of pipes) {
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x) {
            if (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom) {
                gameOver = true; // Collision detected
            }
        }
    }
}

function jump() {
    bird.velocity += bird.lift; // Apply lift to the bird
}

function update() {
    if (!gameOver) {
        bird.velocity += bird.gravity; // Apply gravity
        bird.y += bird.velocity; // Update bird position
        if (bird.y > canvas.height) {
            gameOver = true; // Bird falls off the screen
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawBird();
        drawPipes();
        updatePipes();
        checkCollision();
        frame++;
        requestAnimationFrame(update); // Continue the game loop
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '48px sans-serif';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 50);
    }
}

playButton.addEventListener('click', () => {
    playButton.style.display = 'none'; // Hide play button
    jumpButton.style.display = 'block'; // Show jump button
    resetGame(); // Reset game state
    update(); // Start the game loop
});

jumpButton.addEventListener('click', jump); // Jump on button click

function resetGame() {
    bird.y = canvas.height / 2; // Reset bird position
    bird.velocity = 0; // Reset velocity
    pipes = []; // Clear pipes
    score = 0; // Reset score
    gameOver = false; // Reset game over state
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; // Adjust canvas width
    canvas.height = window.innerHeight; // Adjust canvas height
});
``` ### Explanation of the Code Changes

In this updated code, a new button labeled "Jump" has been added to the game interface. This button allows players to control the bird's jump without relying on keyboard input. The button is initially hidden and only appears after the player clicks the "Play" button to start the game.

### Key Features

- **Jump Button**: The button is styled and positioned at the bottom of the screen. When clicked, it triggers the `jump` function, which applies a lift to the bird, making it jump.
- **Game Reset**: The game state resets when the "Play" button is clicked, allowing players to start fresh each time.
- **Responsive Design**: The canvas resizes with the window, ensuring that the game remains playable on different screen sizes.

### Testing the Game

To test the game, ensure that you have the necessary video file and sound effects in place. Open the `index.html` file in a web browser, click the "Play" button to start the game, and use the "Jump" button to control the bird. Enjoy the enhanced gameplay experience!
