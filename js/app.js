/*-------------- Constants -------------*/

const arrowArray = [];

const arrowTypesArray = [
    "↑",
    "→",
    "↓",
    "←",
];

const gameDifficulty = [
    'Easy', 'Normal', 'Hard',
]

// arrow class that represents each arrow drawn on the screen
class Arrow {
    constructor(x, y, dx, dy, timer) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.timer = timer;
        this.stopped = false;
        this.arrowType = arrowTypesArray[Math.floor(Math.random() * 4)]

        // set a time limit for each arrow drawn
        // setTimeout(() => {
        //     this.stopped = true;
        // }, this.timer);

        this.draw = function () {
            ctx.font = "30px Arial"
            ctx.fillText(this.arrowType, this.x, this.y);

        }

        this.update = function () {
            if (this.stopped) {
                return;
            }

            if (this.x + 40 > canvas.width || this.x - 1 < 0) {
                this.dx = -this.dx;
            }

            // avoid hp bar
            if (this.y + 96 > canvas.height * 1.3 || this.y - canvas.height / 20 < 50) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();

        }
    }
}


/*---------- Variables (state) ---------*/

let hp;
let arrCount;
let diffIndex;
let lose;
let velocity;

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

function init() {
    hp = 100;
    arrCount = 1;
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


    switch (gameDifficulty[diffIndex]) {
        case 'Easy':
            velocity = 1;
            break;
        case 'Normal':
            velocity = 2;
            break;
        case 'Hard':
            velocity = 3;
            break;
    }

    generateArrows();
    setInterval(increase, 1000);
    drawGame();
    // setTimeout(drawGame, 3000);
}

function generateArrows() {
    for (let i = 0; i < 50; i++) {

        let xMove = (Math.floor(Math.random() * canvas.width));
        let yMove = (Math.floor(Math.random() + canvas.height - 100));
        let randomNum = (Math.floor(Math.random() * 10) * 1000);

        arrowArray.push(new Arrow(xMove, yMove, velocity, velocity, randomNum))
    }
}

// function drawFrame() {
//     ctx.clearRect(0, 0, canvas.width / 20, canvas.height / 20);
//     for (let i = 0; i < arrowArray.length; i++) {
//         arrowArray[i].update();
//     }
//     requestAnimationFrame(drawFrame);
// }

function gameOver() {
    diffSection.classList.remove('hidden');
    retryBtn.classList.remove('hidden');
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
    if (arrCount < 50) {
        spawnArrow();
    } else {
        console.log('count ended');
        return
    }

    // if hp is at 0, stop call gameover and stop drawing
    if (lose) {
        return;
    }

    // repeat animation
    requestAnimationFrame(drawGame)
}

function increase() {
    // let xMove = (Math.floor(Math.random() * canvas.width));
    // let yMove = (Math.floor(Math.random() + canvas.height - 100));
    // let randomNum = (Math.floor(Math.random() * 10) * 1000);

    // arrowArray.push(new Arrow(xMove, yMove, velocity, velocity, randomNum))

    arrCount++;
}

function spawnArrow() {
    arrowArray[arrCount - 1].update();
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