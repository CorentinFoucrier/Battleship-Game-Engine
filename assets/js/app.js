/* VARIABLES */
const coords = document.getElementById("coords");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const totalSquares = 8;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const boatsProperties = { // Determine total of boats and size for each one.
    "totalOfBoats": 3,
    "boatsSizes": [4, 3, 2]
};
let boatsEntities = [];
let allBoatsPos = [];
let tempoBoatsPos = [];
let tableCells = [];
let boatsLeftToBeGenerate = boatsProperties.totalOfBoats;
let boatsLeftToWin = boatsProperties.totalOfBoats;
let ships;
/* VARIABLES */

const createBoard = () => {
    let boardHMLT = "";

    /* Y Posision display */
    boardHMLT += `<div class="y">\n`;
    boardHMLT += `    <div class="divTable">\n`;
    boardHMLT += `        <div class="divTableRow">\n`;
    for (let i = 0; i < totalSquares; i++) {
        boardHMLT += `            <div class="divTableCell">${letters[i]}</div>\n`;
    }
    boardHMLT += `        </div>\n`;
    boardHMLT += `    </div>\n`;
    boardHMLT += `</div>\n`;
    /* Y Posision display */

    /* X Posision display */
    boardHMLT += `<div class="x">\n`;
    boardHMLT += `    <div class="divTable">\n`;
    for (let i = 0; i < totalSquares; i++) {
        boardHMLT += `        <div class="divTableRow">\n`;
        boardHMLT += `            <div class="divTableCell">${i + 1}</div>\n`;
        boardHMLT += `        </div>\n`;
    }
    boardHMLT += `    </div>\n`;
    boardHMLT += `</div>\n`;
    /* X Posision display */

    /* Table display */
    boardHMLT += `<div class="divTable" id="table">\n`;
    boardHMLT += `    <div class="divTableBody">\n`;
    for (let i = 0; i < totalSquares; i++) {
        boardHMLT += `        <div class="divTableRow">\n`;
        for (let j = 0; j < totalSquares; j++) {
            boardHMLT += `            <div class="divTableCell" id="${i}x${j}"></div>\n`;
        }
        boardHMLT += `        </div>\n`;
    }
    boardHMLT += `    </div>\n`;
    boardHMLT += `</div>\n`;
    /* Table display */

    /* Ship display */
    boardHMLT += `<div class="ships" id="ships"></div>\n`;
    /* Ship display */

    coords.innerHTML = boardHMLT; // Put the result in HTML
}

/**
 * Generate a random number between 0 and max
 * @param {Number} max
 */
const randomNb = max => Math.floor(Math.random() * Math.floor(max));

/**
 * Make the 1st letter to uppercase
 * @param {String} str 
 */
const firstLetterUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Return name of a boat depending on it's size
 * @param {Number} boatLength
 */
const boatName = (boatLength) => {
    switch (boatLength) {
        case 4:
            return "battleship";
        case 3:
            return "crusier";
        case 2:
            return "destroyer";
    }
}

/**
 * FIRST FUNCTION CALL TO START THE GAME
 */
const startGame = () => {
    const debugTime0 = performance.now();
    startButton.classList.add("d-none");
    restartButton.classList.remove("d-none");
    createBoard();
    const tob = boatsProperties.totalOfBoats;
    const table = document.getElementById("table");
    tableCells = table.getElementsByClassName('divTableCell');
    ships = document.getElementById("ships");

    // Generate appropriate number of boats
    for (let i = 0; i < tob; i++) {
        generateBoat();
        boatsLeftToBeGenerate--;
    }

    // Add envent click on each cells to shoot
    for (let i = 0; i < tableCells.length; i++) {
        const cell = tableCells[i];
        cell.addEventListener("click", e => {
            const [x, y] = e.target.id.split('x');
            shoot(x, y);
        });
    }

    // console.log(allBoatsPos);
    // console.log(boatsEntities);
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
        allBoatsPos.indexOf(x + "x" + y) < 0
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

/**
 * This function is called after the 1st position of boat has been valided by verifCoords()
 * @param {Number} x "x" axis
 * @param {Number} y "y" axis
 * @param {Number} axis Direction to extent the rest of the boat
 */
const buildBoat = (x, y, axis) => {
    // console.log("buildBoat");
    const currentBoat = boatsProperties.totalOfBoats - boatsLeftToBeGenerate;
    const currentBoatSize = boatsProperties.boatsSizes[currentBoat];
    let i = 1;
    while (i < currentBoatSize) {
        (axis === 0) ? x++ : y++;
        if (verifCoords(x, y)) {
            // console.log("buildBoat true");
            tempoBoatsPos.push(x + "x" + y);
            i++;
            continue;
        } else {
            // console.log("buildBoat false");
            break;
        }
    }
    // console.log("after while");

    /* If i is different of currentBoatSize while loop has break, loop break = boat is not valid */
    if (i !== currentBoatSize) {
        tempoBoatsPos = []; // Empty temporary positions array
        generateBoat();
    } else {
        // console.log(tempoBoatsPos);
        allBoatsPos = tempoBoatsPos.concat(allBoatsPos);
        const bn = boatName(tempoBoatsPos.length);
        ships.insertAdjacentHTML("beforeend",
            `<div class="${bn}">${firstLetterUpperCase(bn)}: <span id="${tempoBoatsPos.length}|${boatsLeftToBeGenerate}">${tempoBoatsPos.length} square(s) left</span></div>`
        );
        tempoBoatsPos.unshift(tempoBoatsPos.length + "|" + boatsLeftToBeGenerate);
        boatsEntities.push(tempoBoatsPos);
        tempoBoatsPos = []; // Empty temporary positions array
    }
}

const shoot = (x, y) => {
    for (let i = 0; i < boatsEntities.length; i++) {
        const be = boatsEntities[i];
        const index = be.indexOf(x + "x" + y);
        const updateSquaresLeft = document.getElementById(be[0]);
        if (index >= 0) {
            be.splice(index, 1);
            updateSquaresLeft.innerHTML = be.length - 1 + " square(s) left";
            if (be.length - 1 === 0) {
                updateSquaresLeft.innerHTML = "Sunk";
                Swal.fire({
                    title: 'Success!',
                    text: 'You have sunk one ' + updateSquaresLeft.parentElement.className + '!',
                    showCancelButton: false,
                    confirmButtonColor: '#0bc36b',
                    showClass: {
                        popup: 'animated fadeIn'
                    },
                    hideClass: {
                        popup: 'animated fadeOut'
                    }
                });
                boatsLeftToWin--;
            }
            if (boatsLeftToWin === 0) {
                table.classList.add("end");
                Swal.fire({
                    title: 'Congrats!',
                    text: "Last ship has been sinks!",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Play again',
                    showClass: {
                        popup: 'animated fadeIn'
                    },
                    hideClass: {
                        popup: 'animated fadeOut'
                    }
                }).then((result) => {
                    if (result.value) {
                        location.reload();
                    }
                });
            }
        }
    }
    if (allBoatsPos.indexOf(x + "x" + y) < 0) {
        document.getElementById(x + "x" + y).classList.add('miss');
    } else {
        document.getElementById(x + "x" + y).classList.add('hit');
    }
    // console.log(boatsEntities);
}

startGame(); // debug