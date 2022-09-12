

function generateWinningNumber() {
    let randomNum = Math.floor(Math.random() * 100) + 1;
    return randomNum;
}

function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function shuffle(arr) {
    let m = arr.length;
    while(m) {
        let index = Math.floor(Math.random() * m--);
        let temp = arr[m];
        arr[m] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }

    isLower() {
        return (this.playersGuess < this.winningNumber) ? true : false
    }

    playersGuessSubmission(num) {
        if (num < 1 || num > 100 || typeof num !== 'number') {
            return 'That is an invalid guess.';
        }
        else {
            this.playersGuess = num;
        }
        return this.checkGuess();
    }

    checkGuess() {
        if (this.pastGuesses.includes(this.playersGuess)) {
            return "You have already guessed that number.";
        }
        if (this.playersGuess !== this.winningNumber && !this.pastGuesses.includes(this.playersGuess)) {
            this.pastGuesses.push(this.playersGuess);
        }
        if (isNaN(this.playersGuess)) {
            this.pastGuesses.pop();
            return 'This is not a number!';
        }
        if (this.pastGuesses.length === 5 && this.playersGuess !== this.winningNumber) {
            return "You Lose.";
        }
        if (this.playersGuess === this.winningNumber) {
            return "You Win!";
        }
        else if (this.playersGuess < this.winningNumber && (this.difference()) < 10) {
            return "You're burning up! ⤴"
        }
        else if (this.playersGuess < this.winningNumber && (this.difference()) < 25) {
            return "You're lukewarm. ⤴"
        }
        else if (this.playersGuess < this.winningNumber && (this.difference()) < 50) {
            return "You're a bit chilly ⤴"
        }
        else if (this.playersGuess < this.winningNumber && (this.difference()) < 100) {
            return "You're ice cold ⤴"
        }

        if (this.playersGuess > this.winningNumber && (this.difference()) < 10) {
            return "You're burning up! ⤵"
        }
        else if (this.playersGuess > this.winningNumber && (this.difference()) < 25) {
            return "You're lukewarm. ⤵"
        }
        else if (this.playersGuess > this.winningNumber && (this.difference()) < 50) {
            return "You're a bit chilly ⤵"
        }
        else if (this.playersGuess > this.winningNumber && (this.difference()) < 100) {
            return "You're ice cold ⤵"
        }
        // if  ((this.difference()) < 10) {
        //     return "You're burning up!";
        // }
        // if  ((this.difference()) < 25) {
        //     return "You're lukewarm.";
        // }
        // if  ((this.difference()) < 50) {
        //     return "You're a bit chilly.";
        // }
        // if  ((this.difference()) < 100) {
        //     return "You're ice cold!";
        // }
    }

    newGame() {
        let game = new this();
        return game;
    }

    provideHint() {
        // let arr = Array.from({length: 3});
        // let randomInd = Math.floor(Math.random() * arr.length);
        // arr[randomInd] = this.winningNumber;
        // for (let i = 1; i < arr.length; i++) {
        //     arr.push(generateWinningNumber());
        // }
        // return shuffle(arr);
        let arr = [];
        arr[0] = this.winningNumber;
        arr[1] = generateWinningNumber();
        arr[2] = generateWinningNumber();
        return shuffle(arr);
    }
}
let game = new Game();

//experimental styling for page, and added the Success Button
const bottomButtons = document.querySelector(".bottom");
const body = document.querySelector('body')


//Storing the buttons onto variables
const submit = document.querySelector('.submit');
const submitBox = document.querySelector('input');
const playAgainButton = document.querySelector('.playagain');
const hintButton = document.querySelector('.hint');
// submit.addEventListener('mouseover', () => {
//     body.style.background = 'coral';
// })
// submit.addEventListener('mouseout', () => {
//     body.style.background = 'wheat';
// })


const heading = document.querySelector('.heading');
const unorderedList = document.querySelector('ul');
const answerCheck = document.querySelector('#announce');
const announce = document.createElement('h2');
announce.classList.add('announce');
answerCheck.append(announce);

submit.addEventListener('click', () => {
    const listItem = document.createElement('li');
    listItem.textContent = parseInt(submitBox.value);
    console.log(game.pastGuesses);
    unorderedList.append(listItem);

    const userGuess = game.playersGuessSubmission(parseInt(submitBox.value))
    console.log(userGuess);
    announce.innerText= userGuess;
    submitBox.value = '';
    announce.style.color = 'black';
    if (userGuess === 'That is an invalid guess.') {
        listItem.style.display = 'none';
        announce.style.color = 'red';
    }
    if (game.pastGuesses.length > 5 || userGuess === 'You Win!') {
        submit.disabled = true;
        hintButton.disabled = true;
        heading.innerHTML = "Reset game to play again!";
        body.style.background = 'lightblue';
        hintButton.style.display = 'none';
    }
    if (game.pastGuesses.length > 5 || userGuess === 'You Lose.') {
        submit.disabled = true;
        hintButton.disabled = true;
        heading.innerHTML = "Reset game to play again!";
        body.style.background = 'coral';
        hintButton.style.display = 'none';
        newDiv.innerText = `The winning number was ${game.winningNumber}!`;
    }
    if (userGuess === 'This is not a number!') {
        listItem.style.display = 'none';
        announce.style.color = 'red';
    }
})

playAgainButton.addEventListener('click', () => {
    unorderedList.innerHTML = '';
    location.reload();
})

const newDiv = document.createElement('h3');
newDiv.classList.add('hintArea');

bottomButtons.append(newDiv);

hintButton.addEventListener('click', () => {
    let hintArr = [game.winningNumber];
    let num = generateWinningNumber();
    for (let i = 0; i < 2; i++) {
        if (hintArr.includes(num)) {
            let newNum = generateWinningNumber();
            hintArr.push(newNum);
        }
        else {
            hintArr.push(num);
        }
    }
    let newArr = shuffle(hintArr)
    const hintStr = `The winning number is either ${newArr[0]}, ${newArr[1]}, or ${newArr[2]}`;
    newDiv.innerText = hintStr;
    submit.addEventListener('click', () => {
        newDiv.innerText = '';
    })
})

