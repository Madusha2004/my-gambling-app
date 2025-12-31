// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give/take the user their winnings/losers
// 7. Play again

const prompt = require("prompt-sync")();

const ROWS = 3; // global variables with const are all capital letters
const COLS = 3;

const SYMBOLS_COUNT = { //key - map(ex:- Key A map with Value 2, likewise; these are objects in javascript)
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {// This is more like a multiplier
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
    
        if (isNaN(numberDepositAmount) || numberDepositAmount<= 0 ){
            console.log("Invalid Deposit Amount, Try Again.");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines you are betting on (1-3): ");
        const numberOfLines = parseInt(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines. Please try again.");
        }else{
            return numberOfLines;
        }
    }
};

const getBet = (balance, numberOfLines) => {
    while(true){
        const bet = prompt("Enter the amount you like to put per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet >= balance/numberOfLines){// why does "lines" also works in here?
            console.log("Invalid Bet, Please Try Again.");
        }else{
            return numberBet;
        }
    }
};

const spin = () =>{
    const symbols = [];// reference data type - manipulation can be done
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [] ;
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];//copy the symbols we have available to choose for each reel in to another array
        for(let j = 0; j < ROWS; j++){//why columns 1st then rows?
            const randomIndex = Math.floor( Math.random() * reelSymbols.length);// WTF?
            const  selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);// not sure this is for the removal from the available symbols in a way not to get the same

        }
    }
    return reels;
};
const transpose = (reels) => {//transposing of matrices
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){// for every single row loop through every single column
            rows[i].push(reels[j][i])//rows at row i and then push reels at column j at row i

        }
    }

    return rows;

};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | ";

            }
        }
        console.log(rowString)
    }

};

const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];

        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;

};



const game = () =>{
    let balance = deposit();

    while (true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You Won, $" + winnings.toString());
        if (balance <= 0){
            console.log("You ran out of Money!");
            break;
        }
        const playAgain = prompt("Do you want to play again(y/n)? ");
        if(playAgain != "y"){
            console.log("Your final balance is $" + balance + ", Thank you for playing with us.");
            break;

        } 
    }
}

game();