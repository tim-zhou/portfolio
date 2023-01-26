// let game = {}

// game.init = function(){
//     setupModeButtons();
//     setupSquares();
//     reset();
// }

// game.init();

let colors = [];
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let numSquares = 6;
let timerNum = 45;

let countdownTimer = setInterval(countdown, 1000);

init();


function init(){
    //mode buttons event listeners
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons(){
    for(let i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");

            this.classList.add("selected");
    
            // this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            if(this.textContent === "Easy"){
                timer(this.textContent);
                numSquares = 3;
            }else if(this.textContent === "Normal"){
                timer(this.textContent)
                numSquares = 6;
            }else{
                timer(this.textContent)
                numSquares = 9;
            }
    
            reset();
        });
    }
}

function setupSquares(){
    for(let i = 0; i < squares.length; i ++){
        // add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        //add click listeners to squarse
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}


function reset(){
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    //change colors of squares
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    timer(document.querySelector(".selected").textContent);
    reset();
});


// Change all the colors to the correct color
function changeColors(color){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

// Pick the a correct color from the array of random colors
function pickColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// create an array of random colors
function generateRandomColors(num){
    let arr = [];
    for(let i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}


// Create a random color
function randomColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function timer(difficulty){
    if(difficulty === "Easy"){
        timerNum = 60;
    }else if(difficulty === "Normal"){
        timerNum = 45;
    }else{
        timerNum = 30;
    }
}

function countdown(){
    if(timerNum <= 0){
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "Expired";
    }else{
        document.getElementById("timer").innerHTML = timerNum;
    }
    timerNum -= 1;
}