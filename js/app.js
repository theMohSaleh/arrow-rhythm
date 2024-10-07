/*-------------- Constants -------------*/

const arrowTypesArray = [
    "↑",
    "→",
    "↓",
    "←",
];

const levelCombos = [
    ["→", "→", "↑", "↓"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
    ["↑", "←", "↑", "↑"],
]

const errorMargin = 10;

const arrowArray = [];


const gameDifficulty = [
    'Easy', 'Normal', 'Hard',
]


/*---------- Variables (state) ---------*/

let hp;
let arrCount;
let diffIndex;
let lose;
let velocity;
let game;

/*----- Cached Element References  -----*/

const canvas = document.querySelector("#gameCanvas");
const nextBtn = document.querySelector("#nextBtn");
const backBtn = document.querySelector("#backBtn");
const playBtn = document.querySelector('#playBtn');
const retryBtn = document.querySelector('#retryBtn');
const diffSection = document.querySelector("#difficulty-section");
const diffText = document.querySelector("#difficulty");

const ctx = canvas.getContext("2d");

/*-------------- Functions -------------*/

// arrow class that represents each arrow drawn on the screen
class Arrow {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.stopped = false;
        this.missed = false;
        this.arrowType = arrowTypesArray[Math.floor(Math.random() * 4)]

        this.draw = function () {
            ctx.font = "30px Arial"
            ctx.fillText(this.arrowType, this.x, this.y);
            ctx.strokeText(this.arrowType, x + 40, y + 40)
        }

        this.update = function () {
            if (this.stopped) {
                console.log('arrow stopped');
                return;
            }

            if (this.x > canvas.width - 40 || this.x - 1 < 0) {
                this.dx = -this.dx;
            }

            // avoid hp bar
            if (this.y + 96 > canvas.height * 1.3 || this.y - canvas.height / 20 < 50) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            // set a time limit for each arrow drawn
            setTimeout(() => {
                this.missed = true;
                this.stopped = true;
                return
            }, 3100);

            // let keyPressed = logKey();

            // console.log(keyPressed);
            
            // if (this.x === x + errorMargin || this.x === x - errorMargin)
            // {
            //     switch (e.code) {
            //         case 'ArrowUp':
                        
            //     }
            //     console.log("timed correctly");
            // }

            this.draw();
        }
    }
}

function init() {
    hp = 100;
    arrCount = 0;
    // on first initialize, set index to 0
    if (!diffIndex) {
        diffIndex = 0;
    }
    lose = false;
    retryBtn.classList.add('hidden');
    velocity = 0;
}

function render() {
    diffText.textContent = gameDifficulty[diffIndex];
}

init();
render();

function startGame() {
    playBtn.classList.add('hidden');
    diffSection.classList.add('hidden');
    arrCount = 0;
    while (arrowArray.length > 0) {
        arrowArray.pop();
    }

    switch (gameDifficulty[diffIndex]) {
        case 'Easy':
            velocity = 1;
            break;
        case 'Normal':
            velocity = 2;
            break;
        case 'Hard':
            velocity = 4;
            break;
    }

    generateArrows();
    game = setInterval(() => {
        pen = setTimeout(() => {
            // console.log(arrowArray[arrCount].missed);

            // if (arrowArray[arrCount].missed) {
            hp -= 10;
            // }
        }, 3000)
        arrCount++;
    }, 1000);
    drawGame();
}

function generateArrows() {
    for (let i = 0; i < 50; i++) {

        let xMove = (Math.floor(Math.random() * canvas.width));
        let yMove = (Math.floor(Math.random() + canvas.height - 100));

        arrowArray.push(new Arrow(xMove, yMove, velocity, velocity))
    }
}

function gameOver() {
    diffSection.classList.remove('hidden');
    retryBtn.classList.remove('hidden');
    lose = true;
    clearInterval(game);
    clearTimeout(pen);
}

function drawGame() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save();

    // draw health bar
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width / 20 - 15, (canvas.height / 20), (hp * 2), 18);
    // draw health bar border
    ctx.strokeStyle = 'black';
    ctx.strokeRect(canvas.width / 20 - 15, (canvas.height / 20), 200, 18);

    ctx.restore();

    //render arrow
    if (arrCount < 10) {
        spawnArrow();
    } else {
        console.log('count ended');
        setTimeout(gameOver, 3500);
        return;
    }

    // if hp is at 0, stop call gameover and stop drawing
    if (hp <= 0) {
        gameOver();
        return;
    }

    // repeat animation
    requestAnimationFrame(drawGame)
}

function spawnArrow() {
    arrowArray[arrCount].update();
    arrowArray[arrCount + 1].update();
    arrowArray[arrCount + 2].update();
    // arrowArray[arrCount + 3].update();
}


// function to handle difficulty change click
function handleDiffClick(event) {
    // check which button was clicked on

    if (event.target.id === 'nextBtn') {
        // check if user is at the end of the array, reset index value to the start if true
        if (diffIndex + 1 >= gameDifficulty.length) {
            diffIndex = 0;
        } else {
            diffIndex += 1;
        }
    } else if (event.target.id === 'backBtn') {
        // check if user is at the start of the array, set index to last value in the array if true
        if (!diffIndex - 1 === -1) {
            diffIndex -= 1;
        } else {
            diffIndex = gameDifficulty.length - 1;
        }
    }

    // show new difficulty
    diffText.textContent = gameDifficulty[diffIndex];
}

function handlePlayClick(event) {
    startGame();
}


function handleRetryClick() {
    init();
    startGame();
}


/*----------- Event Listeners ----------*/

playBtn.addEventListener('click', handlePlayClick);
retryBtn.addEventListener('click', handleRetryClick);
diffSection.addEventListener('click', handleDiffClick);

document.addEventListener('keyup', logKey)

function logKey(e) {
    console.log(e.code);
}