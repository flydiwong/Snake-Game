const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// 适配移动设备
function resizeCanvas() {
    const maxWidth = window.innerWidth - 20;
    const maxHeight = window.innerHeight - 100;
    const aspectRatio = canvas.width / canvas.height;

    let newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let gameLoop;
let gameSpeed = 100;
let isGameOver = false;

// 初始化游戏
function initGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    
    direction = 'right';
    score = 0;
    scoreElement.textContent = `得分: ${score}`;
    generateFood();
    gameOverElement.style.display = 'none';
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, gameSpeed);
    
    isGameOver = false;
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            break;
        }
    }
}

// 游戏主循环
function gameUpdate() {
    if (isGameOver) return;
    
    const head = { x: snake[0].x, y: snake[0].y };
    
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `得分: ${score}`;
        generateFood();
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameUpdate, gameSpeed);
        }
    } else {
        snake.pop();
    }
    
    draw();
}

// 绘制游戏画面
function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// 游戏结束
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
}

// 重新开始游戏
function restartGame() {
    initGame();
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// 移动设备控制
document.getElementById('up').addEventListener('click', () => {
    if (direction !== 'down') direction = 'up';
});
document.getElementById('down').addEventListener('click', () => {
    if (direction !== 'up') direction = 'down';
});
document.getElementById('left').addEventListener('click', () => {
    if (direction !== 'right') direction = 'left';
});
document.getElementById('right').addEventListener('click', () => {
    if (direction !== 'left') direction = 'right';
});

// 触摸控制
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

canvas.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== 'left') {
            direction = 'right';
        } else if (deltaX < 0 && direction !== 'right') {
            direction = 'left';
        }
    } else {
        if (deltaY > 0 && direction !== 'up') {
            direction = 'down';
        } else if (deltaY < 0 && direction !== 'down') {
            direction = 'up';
        }
    }
    e.preventDefault();
});

// 开始游戏
initGame();