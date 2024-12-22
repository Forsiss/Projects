let currentPlayer = 'X'; //Player X always starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // field 3x3
let gameActive = true;

function handlePlayerTurn(clickedCellIndex){// replacing players function
    if(gameBoard[clickedCellIndex] !== '' || !gameActive){// Check if cell is empty or game is active
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer; // if cell isn't empty then it install X or O depends on players
    checkForWinOrDraw();//call function that check every player step
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //check if X is installed if yes then it install next move O or X if it first move
}

function cellClicked(clickedCellEvent){//place X or O depends on player
    const clickedCell = clickedCellEvent.target;//getting cell's element after click
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;//gettind cell's index and replacing it

    console.log(clickedCellIndex)

    if(gameBoard[clickedCellIndex] !== ''  || !gameActive){// Check if cell is busy or game isn't active
        return;
    }

    handlePlayerTurn(clickedCellIndex);//call a function that replace empty cell with X ot O
    updateUI();//call a function to updateUI after click
}


const cells = document.querySelectorAll('.cell')//Add event listener to all cells

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);//Add event listener for each cell in board
});


function updateUI(){//function that show step after player move
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}

function announceWinner(player){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw(){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Game Draw!`;
}

const winConditions = [//Defintion of win combinatons
    [0, 1, 2], //top row
    [3, 4, 5], //middle row
    [6, 7, 8], //bottom row
    [0, 3, 6], //left column
    [1, 4, 7], //middle column
    [2, 5, 8], //right column
    [0, 4, 8], //left to right diagonal
    [2, 4, 6] //right to left diagonal
];

function checkForWinOrDraw(){//Checks game on win or draw
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){//Check every single element in array
        const [a, b, c] = winConditions[i]; // install each array element in our element
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){ // Checks all win combinations
            roundWon = true;
            break;
        }
    }

    if(roundWon){//checks if true
        announceWinner(currentPlayer);//call function that announce winner
        gameActive = false;//stop game
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if(roundDraw){ //Check if true
        announceDraw(); // call function that announce draw
        gameActive = false;// stop game
        return;
    }
}

function resetGame(){// reset all to default values
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
    })
    document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);