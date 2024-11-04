// Summoning and Tower Placement Logic
document.getElementById("summon-btn").addEventListener("click", summonUnit);

// Array of unit types with corresponding image paths
const units = [
    { name: "Bloon", image: "assets/images/bloon.jpg", rarity: "Common" },
    { name: "MOAB", image: "assets/images/moab.jpg", rarity: "Rare" },
    { name: "Cinemaman Tower", image: "assets/images/cinemamanTower.jpg", rarity: "Godly" },
    { name: "Drillman Tower", image: "assets/images/drillmanTower.jpg", rarity: "Exclusive" },
    { name: "Bloonarius", image: "assets/images/bloonarius.jpg", rarity: "Boss" }
];

// Summoning function
function summonUnit() {
    // Randomly select a unit
    const unit = units[Math.floor(Math.random() * units.length)];
    
    // Display the unit name, rarity, and image
    document.getElementById("summon-result").textContent = `You summoned: ${unit.name} (${unit.rarity})`;
    const summonImage = document.getElementById("summon-image");
    summonImage.src = unit.image;
    summonImage.alt = unit.name;
    summonImage.style.display = "block";
    
    // Optionally, add the unit to the list of player's towers
    addTower(unit);
}

// Function to add the summoned unit to the player's tower section
function addTower(unit) {
    const towerSection = document.getElementById("towers");
    const towerElement = document.createElement("div");
    towerElement.className = "tower";
    towerElement.innerHTML = `
        <p>${unit.name}</p>
        <img src="${unit.image}" alt="${unit.name}" style="width: 50px; height: auto;">
        <p>Rarity: ${unit.rarity}</p>
    `;
    towerSection.appendChild(towerElement);
}
