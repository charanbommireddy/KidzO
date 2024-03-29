const words = [
    "EMPOWERMENT",
    "CONFIDENCE",
    "EQUALITY",
    "JUSTICE",
    "RESPECT",
    "DIVERSITY",
    "INCLUSIVITY",
    "COMPASSION",
    "EMPATHY",
    "INTEGRITY"
];

let wordGrid = generateWordGrid(words);
const highlightedWords = [];
const wordSearchElement = document.getElementById("word-search");
wordSearchElement.appendChild(createWordSearchTable(wordGrid));

function generateWordGrid(words) {
    const grid = [];

    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            row.push("-");
        }
        grid.push(row);
    }

    for (const word of words) {
        placeWordInGrid(word, grid);
    }

    return grid;
}

function getRandomCharacter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return characters[Math.floor(Math.random() * characters.length)];
}

function placeWordInGrid(word, grid) {
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    let startingPosition = getRandomPosition(word.length, direction);

    if (canPlaceWord(word, direction, startingPosition, grid)) {
        for (let i = 0; i < word.length; i++) {
            grid[startingPosition.row][startingPosition.col] = word[i];

            if (direction === "horizontal") {
                startingPosition.col++;
            } else {
                startingPosition.row++;
            }
        }
    }
}

function canPlaceWord(word, direction, startingPosition, grid) {
    if (direction === "horizontal") {
        if (startingPosition.col + word.length > 10) {
            return false;
        }

        for (let i = 0; i < word.length; i++) {
            if (grid[startingPosition.row][startingPosition.col + i] !== "-") {
                return false;
            }
        }
    } else {
        if (startingPosition.row + word.length > 10) {
            return false;
        }

        for (let i = 0; i < word.length; i++) {
            if (grid[startingPosition.row + i][startingPosition.col] !== "-") {
                return false;
            }
        }
    }

    return true;
}

function getRandomPosition(length, direction) {
    let row, col;

    do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
    } while (!isValidPosition(row, col, length, direction));

    return { row, col };
}

function isValidPosition(row, col, length, direction) {
    if (direction === "horizontal") {
        if (col + length > 10) {
            return false;
        }

        for (let i = 0; i < length; i++) {
            if (grid[row][col + i] !== "-") {
                return false;
            }
        }
    } else {
        if (row + length > 10) {
            return false;
        }

        for (let i = 0; i < length; i++) {
            if (grid[row + i][col] !== "-") {
                return false;
            }
        }
    }

    return true;
}

function createWordSearchTable(wordGrid) {
    const table = document.createElement("table");

    for (let row = 0; row < 10; row++) {
        const tableRow = table.insertRow();

        for (let col = 0; col < 10; col++) {
            const cell = tableRow.insertCell();
            cell.textContent = wordGrid[row][col];
            cell.style.textAlign = "center";
            cell.addEventListener("click", function() {
                cell.classList.toggle("highlighted");
            });
        }
    }

    return table;
}
function checkWords() {
    highlightedWords.length = 0;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const isWordFound = findWord(word, wordGrid);

        if (isWordFound) {
            highlightedWords.push(word);
        }
    }

    let resultMessage = "";

    if (highlightedWords.length === words.length) {
        resultMessage = "Congratulations! You found all the words!";
    } else {
        resultMessage = "Keep trying! You found " + highlightedWords.length +
            " out of " + words.length + " words.";
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = resultMessage;

    for (const word of highlightedWords) {
        const wordCells = findWordCells(word, wordGrid);

        for (const cell of wordCells) {
            cell.classList.remove("highlighted");
        }
    }
}

function findWord(word, grid) {
    let isWordFound = false;

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (grid[row][col] === word[0]) {
                const wordCells = findWordCells(word, grid, row, col);

                if (wordCells.length === word.length) {
                    isWordFound = true;
                    break;
                }
            }
        }
    }

    return isWordFound;
}

function findWordCells(word, grid, startRow, startCol) {
    const wordCells = [];
    let currentRow = startRow;
    let currentCol = startCol;
    
    for (let i = 0; i < word.length; i++) {
        if (grid[currentRow][currentCol] !== word[i]) {
            break;
        }

        wordCells.push({ row: currentRow, col: currentCol });

        if (i === word.length - 1) {
            break;
        }

        if (currentRow === startRow) {
            currentCol++;
        } else {
            currentRow++;
        }
    }

    return wordCells;
}