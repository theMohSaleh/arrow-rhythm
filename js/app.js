/*-------------- Constants -------------*/

const levelCombos = [
    [
        { arrow: "→", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
        { arrow: "→", startPos: { x: 140, y: 50 }, hitPos: { x: 250, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 210, y: 50 }, hitPos: { x: 320, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 210, y: 180 }, hitPos: { x: 100, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 250, y: 180 }, hitPos: { x: 140, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 290, y: 180 }, hitPos: { x: 180, y: 70 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 320, y: 180 }, hitPos: { x: 210, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 140, y: 90 }, hitPos: { x: 250, y: 200 }, velocity: 1 },
        { arrow: "→", startPos: { x: 100, y: 90 }, hitPos: { x: 210, y: 200 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 160, y: 90 }, hitPos: { x: 270, y: 200 }, velocity: 1 },
        { arrow: "←", startPos: { x: 120, y: 90 }, hitPos: { x: 230, y: 200 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 140, y: 20 }, hitPos: { x: 250, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 100, y: 20 }, hitPos: { x: 210, y: 130 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 160, y: 20 }, hitPos: { x: 270, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 120, y: 20 }, hitPos: { x: 230, y: 130 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 360, y: 260 }, hitPos: { x: 250, y: 150 }, velocity: -1 },
        { arrow: "→", startPos: { x: 130, y: 40 }, hitPos: { x: 240, y: 150 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 140, y: 40 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
        { arrow: "←", startPos: { x: 350, y: 260 }, hitPos: { x: 240, y: 150 }, velocity: -1 },
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
let victory;
let lose;
let arrowSpeed;
let game;
let incrementInterval;
let incrementTimeout;
let appendArrowTimeout;
let resetTimeout;

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
    constructor(arrowType, x, y, hitX, hitY, velocity) {
        this.x = x; // X axis on the canvas
        this.y = y; // Y axis on the canvas
        this.dx = velocity; // X velocity
        this.dy = velocity; // Y velocity
        this.startTimer = performance.now();
        this.arrowDuration = 1900;
        this.stopped = false;
        this.hit = false;
        this.arrowType = arrowType;

        this.draw = function () {
            ctx.font = "30px Arial"
            ctx.fillText(this.arrowType, this.x, this.y);

            ctx.strokeText(this.arrowType, hitX, hitY);
        }

        this.checkBeat = function (keyPress) {
            const time = performance.now();
            const arrowTime = time - this.startTimer;

            // check if arrow is hit within frame window
            if (Math.abs(arrowTime - this.arrowDuration) < 150 && Math.abs(arrowTime - this.arrowDuration) > -100) {
                // check if arrow matches keypress
                switch (this.arrowType) {
                    case "↑":
                        if (keyPress === 'ArrowUp') {
                            console.log('Up arrow hit!');
                            this.hit = true;
                        }
                        break;
                    case "→":
                        if (keyPress === 'ArrowRight') {
                            console.log('Right arrow hit!');
                            this.hit = true;
                        }
                        break;
                    case "↓":
                        if (keyPress === 'ArrowDown') {
                            console.log('Down arrow hit!');
                            this.hit = true;
                        }
                        break;
                    case "←":
                        if (keyPress === 'ArrowLeft') {
                            console.log('Left arrow hit!');
                            this.hit = true;
                        }
                        break;
                }
                return;
            }
        }

        this.update = function () {
            if (this.stopped) {
                return;
            }

            this.x += this.dx;
            this.y += this.dy;

            // set a time limit for each arrow drawn
            setTimeout(() => {
                this.stopped = true;
                if (!this.hit) {
                    hp -= 10;
                }
                return
            }, this.arrowDuration);

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
    victory = false;
    lose = false;
    retryBtn.classList.add('hidden');
    arrowSpeed = 0;
}

function render() {
    diffText.textContent = gameDifficulty[diffIndex];
}

// initalize on load
init();
render();

setInterval(() => {
    console.log(arrowArray);
}, 1000);

// function to start the game
function startGame() {
    playBtn.classList.add('hidden');
    diffSection.classList.add('hidden');
    arrCount = 0;
    while (arrowArray.length > 0) {
        arrowArray.pop();
    }

    switch (gameDifficulty[diffIndex]) {
        case 'Easy':
            arrowSpeed = 1;
            break;
        case 'Normal':
            arrowSpeed = 2;
            break;
        case 'Hard':
            arrowSpeed = 3;
            break;
    }
    drawGame();
    renderArrows(0);
}

function gameWin() {
    playBtn.classList.remove('hidden');
    diffSection.classList.remove('hidden');
    victory = true;
}

// function to stop game and display a game over screen
function gameOver() {
    diffSection.classList.remove('hidden');
    setTimeout(() => {
        retryBtn.classList.remove('hidden');
    }, 1800)
    lose = true;
    // clear all intervals and timeouts to prevent bugs when restarting the game
    clearInterval(game);
    clearInterval(incrementInterval);
    clearTimeout(incrementTimeout);
    clearTimeout(appendArrowTimeout);
    clearTimeout(resetTimeout);
}

// function to draw and update the canvas
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

    //render arrows
    if (arrowArray.length) {
        updateArrows();
    }

    // if hp is at 0, stop call gameover and stop drawing
    if (hp < 1) {
        gameOver();
        return;
    }

    // repeat animation
    requestAnimationFrame(drawGame)
}

// function to call update each animation for each arrow 
function updateArrows() {
    // spawn 3 arrows at max each time
    let arrow1 = arrowArray[arrCount];
    let arrow2 = arrowArray[arrCount + 1];
    let arrow3 = arrowArray[arrCount + 2];
    // only call update if arrow exists
    if (arrow1) {
        arrowArray[arrCount].update();
    }
    if (arrow2) {
        arrowArray[arrCount + 1].update();
    }
    if (arrow3) {
        arrowArray[arrCount + 2].update();
    }
}

function renderArrows(comboIdx) {
    // get the set combo in the level combos array
    const combo = levelCombos[comboIdx];
    let delay = 0 // delay to the arrows to spawn

    incrementTimeout = setTimeout(() => {
        incrementInterval = setInterval(() => {
            arrCount++;
        }, 1000);
    }, 1900);

    // wait 1 second and then spawn next arrow
    combo.forEach((arr, index) => {
        appendArrowTimeout = setTimeout(() => {
            drawArrow(arr);
        }, delay);
        delay += 1000;
    });

    clearInterval(incrementInterval);

    // after the previous foreach ends, wait 2 seconds and then reinvoke this function to start next combo
    resetTimeout = setTimeout(() => {
        // if there are more combos, start next combo
        if (comboIdx < levelCombos.length - 1 && !lose) {
            renderArrows(comboIdx + 1)
        } else {
            // if there are no more combo levels and player did not lose all their health, the player wins
            if (hp > 0) {
                gameWin();
            }
        }
    }, delay + 2000);
}

function drawArrow(arr) {
    arrowArray.push(new Arrow(
        arr.arrow,
        arr.startPos.x,
        arr.startPos.y,
        arr.hitPos.x,
        arr.hitPos.y,
        arr.velocity * arrowSpeed, // increase by set speed depending on difficulty
    ));
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

    // display new difficulty text
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
    // check for each arrow pressed
    arrowArray.forEach(arr => {
        if (!arr.stopped) {
            arr.checkBeat(event.code);
        }
    })

    // press space to restart game
    if (event.code === 'Space' && !retryBtn.classList.contains('hidden')) {
        handleRetryClick();
    }
}

/*----------- Event Listeners ----------*/

playBtn.addEventListener('click', handlePlayClick);
retryBtn.addEventListener('click', handleRetryClick);
diffSection.addEventListener('click', handleDiffClick);
document.addEventListener('keydown', handleKeyPress)