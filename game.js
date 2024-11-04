let enemies = [];
let round = 1;
const gameArea = document.getElementById('gameArea');
const roundIndicator = document.getElementById('roundIndicator');
const skipButton = document.getElementById('skipButton');

// Function to create enemies based on the current round
function createEnemiesForRound() {
    let moabCount = 0;
    let bloonariusCount = 0;

    // Determine the number of enemies based on the round
    if (round < 10) {
        moabCount = Math.pow(2, round - 1); // Exponential growth for MOABs
    } else {
        bloonariusCount = Math.floor(round / 10); // 1 Bloonarius for every 10 rounds
    }

    // Create MOABs
    for (let i = 0; i < moabCount; i++) {
        createEnemy('moab');
    }

    // Create Bloonarius
    for (let i = 0; i < bloonariusCount; i++) {
        createEnemy('bloonarius');
    }

    // Create Bloons for rounds below 10
    if (round < 10) {
        let bloonCount = round * 10; // Adjust the number of Bloons as desired
        for (let i = 0; i < bloonCount; i++) {
            createEnemy('bloon');
        }
    }
}

// Enemy creation function
function createEnemy(type) {
    let enemy;
    let health;

    switch (type) {
        case 'bloon':
            health = 100; // Bloon has 100 HP
            enemy = document.createElement('div');
            enemy.className = 'enemy bloon';
            break;
        case 'moab':
            health = 2500; // MOAB has 2500 HP
            enemy = document.createElement('div');
            enemy.className = 'enemy moab';
            break;
        case 'bloonarius':
            health = 1000000; // Bloonarius has 1,000,000 HP
            enemy = document.createElement('div');
            enemy.className = 'enemy bloonarius';
            break;
        default:
            return; // No valid enemy type
    }

    enemy.style.left = '0px';
    enemy.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`; // Random vertical position
    gameArea.appendChild(enemy);
    enemies.push({ element: enemy, health, type });

    // Move the enemy across the screen
    moveEnemy(enemy, type, health);
}

// Function to move enemies across the screen
function moveEnemy(enemy, type, health) {
    const moveInterval = setInterval(() => {
        let left = parseInt(enemy.style.left);

        if (left < gameArea.clientWidth) {
            enemy.style.left = `${left + 2}px`; // Move right
        } else {
            clearInterval(moveInterval);
            enemy.remove(); // Remove enemy if it reaches the end
        }
    }, 50);
}

// Start game logic
function startGame() {
    roundIndicator.textContent = `Round: ${round}`;
    createEnemiesForRound();
}

// Skip round functionality
function skipRound() {
    round++;
    roundIndicator.textContent = `Round: ${round}`;
    createEnemiesForRound();
}

// Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
skipButton.addEventListener('click', skipRound);
