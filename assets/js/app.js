const divTableBody = document.getElementById("divTableBody");

let table = "";
const totalSquares = 8;

for (let i = 0; i < totalSquares; i++) {
    table += `<div class="divTableRow">\n`;
    for (let j = 0; j < totalSquares; j++) {
        table += `    <div class="divTableCell" id="${i}x${j}"></div>\n`;
    }
    table += `</div>\n`;
}

divTableBody.innerHTML = table;

let boatsPos = [];
const boatsProperties = { // Determine total of boats and size for each one.
    "totalOfBoats": 3,
    "boatsSizes": [4, 3, 2]
};
let boatsLeft = boatsProperties.totalOfBoats;
let tempoBoatsPos = [];
const randomNb = interval => Math.floor(Math.random() * Math.floor(interval));


const startGame = () => {
    const debugTime0 = performance.now();
    const tob = boatsProperties.totalOfBoats;
    for (let i = 0; i < tob; i++) {
        generateBoat();
        boatsLeft--;
    }
    // console.log(boatsPos);
    const debugTime1 = performance.now();
    console.log("Call to startGame() took " + (debugTime1 - debugTime0) + " milliseconds.");
}

const generateBoat = () => {
    let x = randomNb(8);
    let y = randomNb(8);
    let axis = randomNb(2);
    if (verifCoords(x, y)) {
        // console.log("generateBoat true");
        tempoBoatsPos.push(x + "x" + y);
        buildBoat(x, y, axis);
    } else {
        // console.log("generateBoat false");
        generateBoat();
    }
}

/**
 * Check if axes are in the grid and if it's an empty square.
 * @param {number} x "x" axis
 * @param {number} y "y" axis
 */
const verifCoords = (x, y) => {
    if (
        boatsPos.indexOf(x + "x" + y) < 0
        && x <= totalSquares - 1
        && x >= 0
        && y <= totalSquares - 1
        && y >= 0
    ) {
        return true;
    } else {
        return false;
    }
}

const buildBoat = (x, y, axis) => {
    // console.log("buildBoat");
    let currentBoat = boatsProperties.totalOfBoats - boatsLeft;
    let currentBoatSize = boatsProperties.boatsSizes[currentBoat];
    let i = 1;
    let x1 = x;
    let y1 = y;
    while (i < currentBoatSize) {
        (axis === 0) ? x1++ : y1++;
        if (verifCoords(x1, y1)) {
            // console.log("buildBoat true");
            tempoBoatsPos.push(x1 + "x" + y1);
            i++;
            continue;
        } else {
            // console.log("buildBoat false");
            break;
        }
    }
    // console.log("after while");
    if (i !== currentBoatSize) {
        tempoBoatsPos = [];
        generateBoat();
    } else {
        // console.log(tempoBoatsPos);
        boatsPos = tempoBoatsPos.concat(boatsPos);
        tempoBoatsPos = [];
    }
}

startGame();
