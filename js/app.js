/*-------------- Constants -------------*/

const arrowArray = []; // used to show which arrows to currently display

// available game difficulties
const gameDifficulty = [
    'Normal', 'Hard',
]

/*---------- Variables (state) ---------*/

let hp;
let arrCount;
let diffIndex; // difficulty index
let victory;
let lose;
let arrowSpeed;
let game; // game frame request
let incrementInterval;
let incrementTimeout;
let appendArrowTimeout;
let resetTimeout;
let keyPressed;
let comboStartIdx;
let comboEndIdx;
let arrowSpawnRate;
let comboSpawnRate;
let arrowDuration;

/*----- Cached Element References  -----*/

const canvas = document.querySelector("#gameCanvas");
const nextBtn = document.querySelector("#nextBtn");
const backBtn = document.querySelector("#backBtn");
const playBtn = document.querySelector('#playBtn');
const retryBtn = document.querySelector('#retryBtn');
const homeBtn = document.querySelector('#homeBtn');
const diffSection = document.querySelector("#difficulty-section");
const diffText = document.querySelector("#difficulty");

const ctx = canvas.getContext("2d"); // used for styling and drawing 

/*-------------- Functions -------------*/

// arrow class that represents each arrow drawn on the screen
class Arrow {
    constructor(arrowType, x, y, hitX, hitY, velocity, duration) {
        this.x = x; // X axis on the canvas
        this.y = y; // Y axis on the canvas
        this.dx = velocity; // X velocity
        this.dy = velocity; // Y velocity
        this.startTimer = performance.now(); // get the time the arrow spawned
        this.arrowDuration = duration; // set duration for how long the arrow will stay
        this.stopped = false;
        this.hit = false;
        this.early = false;
        this.arrowType = arrowType;

        // method to draw arrow
        this.draw = function () {
            // check if user did not hit the arrow early
            if (!this.early) {
                // check if arrow has not been hit on beat yet
                if (!this.hit) {
                    // draw arrow
                    ctx.font = "30px Arial"
                    ctx.fillText(this.arrowType, this.x, this.y);
                    // draw ghost arrow (where the arrow needs to align for the timing)
                    ctx.strokeText(this.arrowType, hitX, hitY);
                } else {
                    // render check mark if arrow was hit on time
                    ctx.save();
                    ctx.font = "25px Arial";
                    ctx.fillStyle = 'green';
                    ctx.fillText("✓", hitX, hitY);
                    ctx.restore();
                }
            } else {
                // render X if arrow was was hit too early
                ctx.save();
                ctx.font = "25px Arial";
                ctx.fillStyle = 'red';
                ctx.fillText("X", hitX, hitY);
                ctx.restore();
            }
        }

        // method to check the timing of the arrow press
        this.checkBeat = function (keyPress) {
            const time = performance.now();
            const arrowTime = time - this.startTimer;

            // if user presses too early, damage the player
            if (Math.abs(arrowTime - this.arrowDuration) > 140 && Math.abs(arrowTime - this.arrowDuration) < 300) {
                this.early = true;
            }

            // check if arrow is hit within frame window
            if (Math.abs(arrowTime - this.arrowDuration) < 140 && Math.abs(arrowTime - this.arrowDuration) > -140) {
                // check if arrow matches keypress
                switch (this.arrowType) {
                    case "↑":
                        if (keyPress === 'ArrowUp') {
                            this.hit = true;
                        }
                        break;
                    case "→":
                        if (keyPress === 'ArrowRight') {
                            this.hit = true;
                        }
                        break;
                    case "↓":
                        if (keyPress === 'ArrowDown') {
                            this.hit = true;
                        }
                        break;
                    case "←":
                        if (keyPress === 'ArrowLeft') {
                            this.hit = true;
                        }
                        break;
                }
                return;
            }
        }

        // updating rendered arrow. this is a recursive method and only stops when arrow duration ends
        this.update = function () {
            // if the arrow expired, stop rendering it
            if (this.stopped) {
                return;
            }

            // move in velocity direction
            this.x += this.dx;
            this.y += this.dy;

            // set a time limit for each arrow drawn
            setTimeout(() => {
                this.stopped = true;
                return
            }, this.arrowDuration);

            this.draw();
        }

        // if player does not hit the arrow when the arrow duration ends, deduct 10 hp
        setTimeout(() => {
            if (!this.hit) {
                hp -= 10;
            }
        }, this.arrowDuration);
    }
}

function init() {
    hp = 100;
    arrCount = 0;
    arrowSpawnRate = 0;
    comboSpawnRate = 0;
    arrowDuration = 0;
    // on first initialize, set index to 0
    if (!diffIndex) {
        diffIndex = 0;
    }
    victory = false;
    lose = false;
    retryBtn.classList.add('hidden');
    homeBtn.classList.add('hidden');
    diffSection.classList.remove('hidden');
    playBtn.classList.remove('hidden');
    arrowSpeed = 0;
    keyPressed = false;

    render();
}

function render() {
    diffText.textContent = gameDifficulty[diffIndex];
    // clear canvas
    ctx.font = 'bold 50px Rajdhani';
    let winMsg = '';
    // if player wins
    if (victory) {
        ctx.save();
        ctx.fillStyle = 'green';
        if (hp === 100) {
            winMsg = 'Perfect!'
        } else {
            winMsg = 'You Win!'
        }
        ctx.fillText(winMsg, canvas.width / 3, canvas.height / 1.8 - 20);
        ctx.font = 'bold 40px Rajdhani';
        ctx.fillText(`${gameDifficulty[diffIndex]} Level Complete`, canvas.width / 5, canvas.height / 1.8 + 20);

        ctx.restore();
        // if player loses
    } else if (lose) {
        ctx.save();

        ctx.fillStyle = 'red';
        ctx.fillText("Game Over", canvas.width / 3 - 10, canvas.height / 1.8 - 20);
        ctx.font = 'bold 40px Rajdhani';
        ctx.fillText("You lose!", canvas.width / 3 + 25, canvas.height / 1.8 + 20);

        ctx.restore();
        // when in home screen
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save();
        ctx.font = 'bold 17px Rajdhani';
        ctx.fillText('Welcome to Arrow Ryhthm! The objective of this game is to time your', 10, 30);
        ctx.fillText('key presses when the arrow aligns with the outlined arrow.', 10, 60);
        ctx.font = 'bold 14px Rajdhani';
        ctx.fillText('Press the correct arrow keys ↑ → ↓ ← on your keyboard when the arrow is aligned.', 10, 90);
        ctx.fillText('Avoid pressing too early or too late to not lose health!', 10, 120);
        ctx.font = 'bold 17px Rajdhani';
        ctx.fillText('Begin by selecting the desired difficulty below.', 10, 170);
        ctx.fillText('Click on Play button or press the spacebar on your keyboard to begin!', 10, 200);

        ctx.restore();
    }
}

// initalize on load
init();

// function to start the game
function startGame() {
    playBtn.classList.add('hidden');
    diffSection.classList.add('hidden');
    arrCount = 0;
    while (arrowArray.length > 0) {
        arrowArray.pop();
    }

    switch (diffIndex) {
        case 0:
            arrowSpeed = 1; // 1 for 60fps 0.42 for 144fps
            arrowSpawnRate = 1000;
            comboSpawnRate = 1900;
            comboStartIdx = 0;
            comboEndIdx = 15;
            arrowDuration = 1900;
            break;
        case 1:
            arrowSpeed = 2; // 0.82 on 144fps
            arrowSpawnRate = 600;
            comboSpawnRate = 1500;
            comboStartIdx = 16;
            comboEndIdx = 35;
            arrowDuration = 1500;
            break;
    }
    // render game canvas
    drawGame();
    // start level combos
    renderArrows(comboStartIdx);
}

// function to display victory screen
function gameWin() {
    // display difficulty section and play button
    homeBtn.classList.remove('hidden');
    victory = true;
    // stop all intervals
    clearAllIntAndTimeout();
    render();
}

// function to stop game and display a game over screen
function gameOver() {
    lose = true;
    // add a 1.8s timer to show the retry button to avoid game breaking bug when restarting the level too quickly
    setTimeout(() => {
        retryBtn.classList.remove('hidden');
        homeBtn.classList.remove('hidden');
    }, 1800)
    // clear all intervals
    clearAllIntAndTimeout();
    render();
}

// function to stop frame requests, intervals and timeouts
function clearAllIntAndTimeout() {
    cancelAnimationFrame(game);
    clearInterval(incrementInterval);
    clearTimeout(incrementTimeout);
    clearTimeout(appendArrowTimeout);
    clearTimeout(resetTimeout);
}

// function to draw and update the canvas
function drawGame() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // render health bar
    drawHealthBar();

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
    game = requestAnimationFrame(drawGame)
}

// display health bar
function drawHealthBar() {

    ctx.save();

    // set health bar color to green when health is above 30, otherwise to red
    if (hp > 30) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    // draw health bar and text
    ctx.fillRect(canvas.width / 20 - 15, (canvas.height / 20), (hp * 2), 18);
    ctx.font = '15px Arial';
    ctx.fillText(`${hp}/100`, canvas.width / 20 + 190, (canvas.height / 20 + 13));
    // draw health bar border
    ctx.strokeStyle = 'black';
    ctx.strokeRect(canvas.width / 20 - 15, (canvas.height / 20), 200, 18);

    ctx.restore();
}

// function to call update each animation for each arrow 
function updateArrows() {
    // spawn 7 arrows at max each time
    let arrow1 = arrowArray[arrCount];
    let arrow2 = arrowArray[arrCount + 1];
    let arrow3 = arrowArray[arrCount + 2];
    let arrow4 = arrowArray[arrCount + 3];
    let arrow5 = arrowArray[arrCount + 4];
    let arrow6 = arrowArray[arrCount + 5];
    let arrow7 = arrowArray[arrCount + 6];
    // only call update if arrow exists
    if (arrow1) {
        arrow1.update();
    }
    if (arrow2) {
        arrow2.update();
    }
    if (arrow3) {
        arrow3.update();
    }
    if (arrow4) {
        arrow4.update();
    }
    if (arrow5) {
        arrow5.update();
    }
    if (arrow6) {
        arrow6.update();
    }
    if (arrow7) {
        arrow7.update();
    }
}

// function to start rendering arrows based on level,
// this function keeps repeating until all combos are rendered or if the game ended.
function renderArrows(comboIdx) {
    // get the set combo in the level combos array
    const combo = levelCombos[comboIdx];
    let delay = 0 // delay for the arrows to spawn

    // increase count to move array that spawns the arrows depending on difficulty
    incrementTimeout = setTimeout(() => {
        // increase count every x second depending on difficulty
        incrementInterval = setInterval(() => {
            arrCount++;
        }, arrowSpawnRate);
    }, comboSpawnRate);

    // wait to spawn next arrow depending on difficulty
    combo.forEach((arr, index) => {
        appendArrowTimeout = setTimeout(() => {
            if (lose) {
                while (arrowArray.length) {
                    arrowArray.pop();
                }
                return
            };
            drawArrow(arr);
        }, delay);
        delay += arrowSpawnRate;
    });

    // reset previous increment interval
    clearInterval(incrementInterval);

    // after the previous foreach ends, wait 2 seconds and then reinvoke this function to start next combo
    resetTimeout = setTimeout(() => {

        // if there are more combos, start next combo
        if (comboIdx < comboEndIdx && !lose) {
            renderArrows(comboIdx + 1)
        } else {
            // if there are no more combo levels and player did not lose all their health, the player wins
            if (hp > 0) {
                gameWin();
            }
        }
    }, delay + 2000);
}

// function to add arrow to arrowArray, which is used to display the arrows
function drawArrow(arr) {
    if (!lose) {
        arrowArray.push(new Arrow(
            arr.arrow,
            arr.startPos.x,
            arr.startPos.y,
            arr.hitPos.x,
            arr.hitPos.y,
            arr.velocity * arrowSpeed, // increase by set speed depending on difficulty
            arrowDuration,
        ));
    } else {
        while (arrowArray.length) {
            arrowArray.pop();
        }
    }
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

// this is called when the player clicks on Play or retry button
function handleGameStartClick() {
    init();
    startGame();
}

function handleHomeClick() {
    init();
}

function handleKeyPress(event) {
    // when game is playing, prevent default of arrows to prevent the window from scrolling with the arrow keys
    if (playBtn.classList.contains('hidden') && retryBtn.classList.contains('hidden')) {
        if (event.code === "ArrowUp" ||
            event.code === "ArrowRight" ||
            event.code === "ArrowDown" ||
            event.code === "ArrowLeft") {
            event.preventDefault();
        }
    }

    // if keyPressed is false, check for arrow input.
    // this is used to prevent the user from holding down arrow key ahead of time
    if (!keyPressed) {
        keyPressed = true;
        // check beat for every arrow available
        arrowArray.forEach(arr => {
            if (!arr.stopped) {
                arr.checkBeat(event.code); // pass key pressed code
            }
        })
    }

    // press space to start game
    if (event.code === 'Space' && !playBtn.classList.contains('hidden') || !retryBtn.classList.contains('hidden')) {
        event.preventDefault();
        handleGameStartClick();
    }
}

// release key
function handleKeyRelease() {
    keyPressed = false;
}

/*----------- Event Listeners ----------*/

playBtn.addEventListener('click', handleGameStartClick);
retryBtn.addEventListener('click', handleGameStartClick);
homeBtn.addEventListener('click', handleHomeClick);
diffSection.addEventListener('click', handleDiffClick);
document.addEventListener('keydown', handleKeyPress)
document.addEventListener('keyup', handleKeyRelease)