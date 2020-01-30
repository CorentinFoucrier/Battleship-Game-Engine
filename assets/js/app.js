const divTableBody = document.getElementById("divTableBody");

let table = "";

for (let i = 0; i < 8; i++) {
    table += `<div class="divTableRow">\n`;
    for (let j = 0; j < 8; j++) {
        table += `    <div class="divTableCell" id="${i}x${j}"></div>\n`;
    }
    table += `</div>\n`;
}

divTableBody.innerHTML = table;