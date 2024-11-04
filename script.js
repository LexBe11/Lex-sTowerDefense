let currentRound = 1;
let enemies = [];
let towers = [];
let gameStarted = false;

const roundIndicator = document.getElementById('roundIndicator');
const gameArea = document.getElementById('gameArea');
const startButton = document.getElementById('startButton');
const skipButton = document.getElementById('skipButton');

startButton.addEventListener('click', startGame);
skipButton.addEventListener('click', skipRound);

function startGame() {
    gameStarted = true;
    currentRound = 1;
    roundIndicator.innerText = `Round: ${currentRound}`;
    spawnEnemies(currentRound);
}

function skipRound() {
    if (gameStarted) {
        currentRound++;
        roundIndicator.innerText = `Round: ${currentRound}`;
        spawnEnemies(currentRound);
    }
}

function spawnEnemies(round) {
    let enemyCount = Math.floor(round * 1.5); // Example scaling
    for (let i = 0; i < enemyCount; i++) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.backgroundImage = "url('images/bloon.jpg')";
        enemy.style.left = '-50px'; // Start off screen
        enemy.style.top = `${Math.random() * 100 + 250}px`; // Random vertical position
        gameArea.appendChild(enemy);
        enemies.push(enemy);
        moveEnemy(enemy);
    }
}

function moveEnemy(enemy) {
    let position = -50; // Starting position
    const moveInterval = setInterval(() => {
        position += 2; // Move to the right
        enemy.style.left = `${position}px`;

        if (position > gameArea.clientWidth) {
            clearInterval(moveInterval);
            gameArea.removeChild(enemy); // Remove enemy if it exits the area
        }
    }, 50);
}

function createTower(type, x, y) {
    const tower = document.createElement('div');
    tower.className = `tower ${type}`;
    tower.style.backgroundImage = `url('images/${type}Tower.jpg')`;
    tower.style.position = 'absolute';
    tower.style.left = `${x}px`;
    tower.style.top = `${y}px`;
    gameArea.appendChild(tower);
    towers.push(tower);
    towerAttack(tower);
}

function towerAttack(tower) {
    tower.classList.add('bouncing'); // Start bounce animation
    const attackInterval = setInterval(() => {
        // Attack logic here
        // For simplicity, we can remove the enemy if it's within a certain range
        for (const enemy of enemies) {
            if (enemy) {
                const enemyRect = enemy.getBoundingClientRect();
                const towerRect = tower.getBoundingClientRect();
                
                if (enemyRect.left < towerRect.right && enemyRect.right > towerRect.left && enemyRect.top < towerRect.bottom && enemyRect.bottom > towerRect.top) {
                    gameArea.removeChild(enemy); // Remove enemy
                    enemies = enemies.filter(e => e !== enemy); // Update enemies array
                    break; // Break after attacking one enemy
                }
            }
        }
    }, 1000);

    // Stop attack animation after a certain period
    setTimeout(() => {
        clearInterval(attackInterval);
        tower.classList.remove('bouncing');
    }, 10000); // Attack for 10 seconds
}

// Allow dragging and dropping towers
const towerElements = document.querySelectorAll('.tower');
towerElements.forEach(tower => {
    tower.addEventListener('dragstart', dragStart);
});

gameArea.addEventListener('dragover', dragOver);
gameArea.addEventListener('drop', dropTower);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.className);
}

function dragOver(event) {
    event.preventDefault(); // Necessary to allow drop
}

function dropTower(event) {
    const towerClass = event.dataTransfer.getData('text/plain');
    const towerType = towerClass.split(' ')[1];
    const towerX = event.offsetX - 50; // Adjust for center of the tower
    const towerY = event.offsetY - 50; // Adjust for center of the tower
    createTower(towerType, towerX, towerY);
}
