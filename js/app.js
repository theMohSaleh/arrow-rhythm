/*-------------- Constants -------------*/

const arrowTypesArray = [
    "↑",
    "→",
    "↓",
    "←",
];

const levelCombos = [
    // ["→", "→", "↑", "↓"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    // ["↑", "←", "↑", "↑"],
    [
        { arrow: "→", pos: { x: 100, y: 50 } },
        { arrow: "→", pos: { x: 120, y: 50 } },
        { arrow: "↑", pos: { x: 140, y: 50 } },
        { arrow: "↓", pos: { x: 160, y: 50 } },
    ],
    [
        { arrow: "↑", pos: { x: 140, y: -100 } },
        { arrow: "→", pos: { x: 100, y: -100 } },
        { arrow: "↓", pos: { x: 160, y: -100 } },
        { arrow: "→", pos: { x: 120, y: -100 } },
    ],
    [
        { arrow: "↑", pos: { x: 140, y: 20 } },
        { arrow: "→", pos: { x: 100, y: 20 } },
        { arrow: "↓", pos: { x: 160, y: 20 } },
        { arrow: "→", pos: { x: 120, y: 20 } },
    ],
]

const errorMargin = 50; // user margin for each beat in milliseconds

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
        this.x = x; // X axis on the canvas
        this.y = y; // Y axis on the canvas
        this.dx = dx; // X velocity
        this.dy = dy; // Y velocity
        this.startTimer = performance.now();
        this.arrowDuration = 3000;
        this.stopped = false;
        this.missed = false;
        this.arrowType = arrowTypesArray[Math.floor(Math.random() * 4)]

        this.draw = function () {
            ctx.font = "30px Arial"
            ctx.fillText(this.arrowType, this.x, this.y);

            ctx.strokeText(this.arrowType, canvas.width / 2 + 50, canvas.height / 2 + 100)
            // if (x + 40 > canvas.width - 40) {
            //     ctx.strokeText(this.arrowType, x - 40, y - 40)
            // } else {
            //     ctx.strokeText(this.arrowType, x + 40, y + 40)
            // }
        }

        this.checkBeat = function () {
            const time = performance.now();
            const arrowTime = time - this.startTimer;
                        
            if (Math.abs(arrowTime - this.arrowDuration) <= this.startTimer) {
                console.log("arrow hit");
                return;
            } else {
                console.log('missed');
                return;
            }
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
                this.stopped = true;
                return
            }, 3100);

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
            velocity = 3;
            break;
    }

    game = setInterval(() => {
        arrCount++;
    }, 1000);
    drawGame();

    renderArrows(0);
}

function gameOver() {
    diffSection.classList.remove('hidden');
    retryBtn.classList.remove('hidden');
    lose = true;
    clearInterval(game);
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
    // arrowArray[arrCount + 1].update();
    // arrowArray[arrCount + 2].update();
}

function renderArrows(comboIdx) {
    console.log(levelCombos[comboIdx]);
    
    const combo = levelCombos[comboIdx];
    let delay = 0;

    combo.forEach((arr, index) => {
        setTimeout(() => {
            drawArrow(arr);
        }, delay);

        delay += 1000;
    });

    setTimeout(() => {
        // start next combo
        if (comboIdx < levelCombos.length - 1) {
            renderArrows(comboIdx+1)
        }
    }, delay + 2000);
}

function drawArrow(arr) {
    ctx.font = "30px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText = (arr.arrow, arr.pos.x, arr.pos.y);

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


function handleKeyPress(event) {
    if (event.code === 'Space') {
        arrowArray.forEach(arr => {
            if (!arr.stopped) {
                arr.checkBeat();
            }
        })
    }
}


/*----------- Event Listeners ----------*/

playBtn.addEventListener('click', handlePlayClick);
retryBtn.addEventListener('click', handleRetryClick);
diffSection.addEventListener('click', handleDiffClick);
document.addEventListener('keydown', handleKeyPress)