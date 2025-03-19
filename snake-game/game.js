const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let gameLoop;
let gameSpeed = 100;
let isGameOver = false;

// ��ʼ����Ϸ
function initGame() {
    // ��ʼ����
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    
    // ��ʼ������
    direction = 'right';
    
    // ��ʼ������
    score = 0;
    scoreElement.textContent = `�÷�: ${score}`;
    
    // ���ɵ�һ��ʳ��
    generateFood();
    
    // ������Ϸ��������
    gameOverElement.style.display = 'none';
    
    // ��ʼ��Ϸѭ��
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, gameSpeed);
    
    isGameOver = false;
}

// ����ʳ��
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // ȷ��ʳ�ﲻ��������������
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            break;
        }
    }
}

// ��Ϸ��ѭ��
function gameUpdate() {
    if (isGameOver) return;
    
    // �ƶ���
    const head = { x: snake[0].x, y: snake[0].y };
    
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // ����Ƿ�ײǽ
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // ����Ƿ�ײ���Լ�
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    // �ƶ���
    snake.unshift(head);
    
    // ����Ƿ�Ե�ʳ��
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `�÷�: ${score}`;
        generateFood();
        // �ӿ���Ϸ�ٶ�
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameUpdate, gameSpeed);
        }
    } else {
        snake.pop();
    }
    
    // ������Ϸ����
    draw();
}

// ������Ϸ����
function draw() {
    // ��ջ���
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ������
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // ����ʳ��
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// ��Ϸ����
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
}

// ���¿�ʼ��Ϸ
function restartGame() {
    initGame();
}

// ���̿���
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

// ��ʼ��Ϸ
initGame();