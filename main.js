
let boardTracker = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],]
let boxTracker = [0,0,0,0,0,0,0,0,0]
let box = document.getElementsByClassName('box')
let turn = 0
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// Make Big Board
for (let i = 8; i >= 0; i--) {
    let game = document.getElementById('game');
    let box = document.createElement('div');
    let overlay = document.createElement('div');

    box.className = 'box';
    overlay.className = 'overlay gray-overlay';
    overlay.id = i + ' overlay'
    
    box.appendChild(overlay)
    game.insertBefore(box, game.firstChild);
}

// Create cells, assign id name, call function to update cell class
for (let i = 0; i < 9; i++) {
    let elem = box[i]
    for (let j = 8; j >= 0; j--) {
        let cell = document.createElement('div')
        cell.className = 'cell'
        cell.id = i.toString() + j.toString()
        elem.insertBefore(cell, elem.firstChild)
        cell.addEventListener("click", trackBoard) // updates playable box (graphical)
    }
}

// function to keep track of player moves and to call other helper functions
function trackBoard() {
    let boxIndex = (this.id)[0]
    let cellIndex = (this.id)[1]

    if (turn == 81) {
        alert('no one wins')
    }
    if ((boardTracker[boxIndex])[cellIndex]) {
        alert('someone has this cell')
    } else {
        (boardTracker[boxIndex])[cellIndex]=(turn % 2) + 1
        updatePlayfield(cellIndex)

        if (isWinner(boardTracker[boxIndex])) {
            boxTracker[boxIndex] = (turn % 2) + 1
            updateBoxColor(boxIndex)
            
            if (isWinner(boxTracker)) {
                alert('congratulations to player ' + ((turn % 2) + 1))
                greyAllBoxes()
            } else if (isDraw(boxTracker)) {
                greyAllBoxes()
                alert('no one wins')
            }

        } else if (isDraw(boardTracker[boxIndex])) {
            boxTracker[boxIndex] = 3
            greenBox(boxIndex)

            if (isDraw(boxTracker)) {
            console.log('no one wins')
            }
        } 
        updateCellColor(this) // call a change in color
        turn++ // increment turn timer
    }  
}

//function to check if winner
function isWinner(A) {
    for (const [a, b, c] of LINES) {
        if ((A[a] != 0 ) && (A[a] == A[b]) && (A[a] == A[c])) {
            return true
        }
    }
    return false
}

// function to check if draw
function isDraw(A) {
    if (A.includes(0)) {
        return false
    } else
        console.log("box is tie")
        return true
}

//Function to change color of cell
function updateCellColor(a) {
    if (turn % 2 == 0 ) {
        a.classList.add('blue')
    } else {
        a.classList.add('red')  
    } 
}

//function to update playfield
function updatePlayfield(a) {
    let playFields = document.getElementsByClassName('overlay') 
    let box = document.getElementById((a + ' overlay').toString())
    if (box.classList.contains("blue-overlay") || box.classList.contains("red-overlay") || box.classList.contains('draw-overlay')) {
        for (let playField of playFields) {
            if (playField.classList.contains("blue-overlay") || playField.classList.contains("red-overlay")) {
            } else {
            playField.style.display='none'
            }
        }
        box.style.display="block"
    } else {
        for (let playField of playFields) {
            playField.style.display='block'
        }
        box.style.display='none'
    }
}

// function to disable all boxes
function greyAllBoxes() {
    let playFields = document.getElementsByClassName('overlay') 
    for (let playField of playFields) {
        playField.style.display='block'
    }
}

//function to update color of box
function updateBoxColor(a) {
    let box = document.getElementById((a + ' overlay').toString())
    box.classList.remove("gray-overlay")
    if (turn % 2 == 0 ) {
        box.classList.add('blue-overlay')
    } else {
        box.classList.add('red-overlay')  
    } 
    box.style.display='block'
}

//function to recolor box if box is a draw
function greenBox(a) {
    let box = document.getElementById((a + ' overlay').toString())
    box.classList.remove("gray-overlay")
    box.classList.add('draw-overlay')
    box.style.display='block'
}