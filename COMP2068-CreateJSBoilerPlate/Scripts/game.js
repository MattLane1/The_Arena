/*
* gameState values:
* 1: Main Menu
* 2: Game on
* 3: Game over
* 4: Waiting for user choice
*/
var gameState;

//Create stage and canvas
var canvas;
var stage;

//post variables are used to write words to the screen for the user
var postHealth;
var postScore;
var postLevel;
var postMobs;

var test;

var bulletTest = false;

//Images
var background;

var bulletArray = new Array(100);
var bulletDirectionArray = new Array(100);

var imgMonsterARun = new Image();
var imgHero = new Image();
var imgCoin = new Image();
var imgBullet = new Image();
var monsterArray = new Array(100);
var hero;
var coin;

//This records the direction the player was facing when a bullet was fired. This accounts for the player releasing the direction key before shooting.
var lastDirection;

//mouse coords
var shotAtX;
var shotAtY;

//Current score and hp values
var score;
var health;

//Difficulty Level
var difficulty;

//Level
var level;

//Player
var playerLocationX;
var playerLocationY;
var playerDirectionArray = new Array(20);
var attacking;

function init() {
    //level one is the start (obviously)
    level = 0;

    test = false;

    //No known direction
    lastDirection = 0;

    /*2D array
    var bulletArray = new Array(100);
    for (var i = 0; i < 10; i++) {
    bulletArray[i] = new Array(20);
    }
    */
    attacking = false;

    //Default difficulty (easy)
    difficulty = 0;

    //First Level
    level = 1;

    //Shot coordinates
    shotAtX = 0;
    shotAtY = 0;

    //Score and remaining bullets
    score = 0;
    health = 100;

    //The game has not yet started
    gameState = 1;

    //Set up canvas and stage
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    //Set up stage
    stage.canvas.width = (window.innerWidth - 25);
    stage.canvas.height = (window.innerHeight - 25);
    stage.enableMouseOver(20); // Enable mouse events

    //Set up button for start easy mode.
    easyButton.y = 500;
    easyButton.x = 250;
    easyButton.addEventListener('click', function (evt) {
        difficulty = 0;
        beginGame();
        health = 100;
    }, false);

    //Set up button for start medium mode.
    mediumButton.y = 500;
    mediumButton.x = 550;
    mediumButton.addEventListener('click', function (evt) {
        difficulty = 1;
        beginGame();
    }, false);

    //Set up button for start hard mode.
    hardButton.y = 500;
    hardButton.x = 850;
    hardButton.addEventListener('click', function (evt) {
        difficulty = 2;
        beginGame();
    }, false);

    loadSounds();

    stage.addChild(menu);

    stage.update();
}

function beginGame() {
    gameState = 2;
    score = 0;

    stage.removeAllChildren();
    stage.removeAllEventListeners();

    //Set up Ticker
    createjs.Ticker.addEventListener("tick", gameLoop);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(30);

    //Set up the Background
    background = new createjs.Bitmap("assets/images/background.jpg");
    background.scaleY = background.scaleX = 1.6;

    this.document.onkeydown = controls;
    this.document.onkeyup = offControls;

    //Add the background
    stage.addChild(background);

    //Load the enemies
    loadMonster((level * 5));

    //Load our hero
    loadPlayer();

    //TEMP
    loadCoin();

    //Set up ammo
    setHealth();

    //Update info
    updateInfo();

    createjs.Sound.play("sound_Monster");
}

function controls() {
    if (gameState != 4) {
        switch (event.keyCode) {
            case 38:
                playerDirectionArray[2] = true;
                lastDirection = 2;

                break;

            case 40:
                playerDirectionArray[1] = true;
                lastDirection = 3;

                break;

            case 39:
                playerDirectionArray[0] = true;
                lastDirection = 1;

                break;

            case 37:
                playerDirectionArray[3] = true;
                lastDirection = 4;

                break;

            case 32:
                createjs.Sound.play("sound_bang");
                loadBullet();
                break;
        }
    }
}

function offControls() {
    if (gameState != 4) {
        switch (event.keyCode) {
            case 38:
                playerDirectionArray[2] = false;

                break;

            case 40:
                playerDirectionArray[1] = false;

                break;

            case 39:
                playerDirectionArray[0] = false;

                break;

            case 37:
                playerDirectionArray[3] = false;

                break;
        }
    }
}

function gameLoop() {
    playerLocationX = hero.x;
    playerLocationY = hero.y;

    //Get how many bullets are currently in the array.
    var numBullets = bulletArray.filter(function (value) {
        return value !== undefined;
    }).length;

    if (gameState != 4) {
        //Get how many monsters are currently in the array.
        var numMobs = monsterArray.filter(function (value) {
            return value !== undefined;
        }).length;

        if (health <= 0) {
            gameState = 3;
            levelSplash();
        }

        if (numMobs == 0 && gameState == 2) {
            gameState = 3;
            levelSplash();
        }

        if (gameState == 2) {
            if (numBullets != 0)
                animateBullet();

            if (numMobs != 0) {
                targetPlayer();
                animatePlayer();
                checkHit();
            }
        }
        updateInfo();
        stage.update();
    }
}

function levelSplash() {
    //Get how many monsters are currently in the array.
    var numMobs = ((monsterArray.filter(function (value) {
        return value !== undefined;
    }).length));

    //They Won!
    if (gameState == 3 && numMobs == 0 && health > 0) {
        var postWinMessage = new createjs.Text("You Win! \n Ready for the next level?", "80px Arial", "#FF0000");
        var nextLevelButton = new createjs.Bitmap("assets/images/next_level.png");
        var menuButton = new createjs.Bitmap("assets/images/main_menu.png");

        stage.addChild(postWinMessage);
        stage.addChild(nextLevelButton);
        stage.addChild(menuButton);

        //Set up button for start next level
        nextLevelButton.y = 500;
        nextLevelButton.x = 850;
        nextLevelButton.addEventListener('click', function (evt) {
            level++;
            beginGame();
        }, false);

        //Set up the button for return to menu
        menuButton.y = 500;
        menuButton.x = 650;
        menuButton.addEventListener('click', function (evt) {
            stage.removeAllChildren();
            stage.removeAllEventListeners();
            init();
        }, false);

        gameState = 4;

        stage.update();
    }

    //They lost!
    if (gameState == 3 && health <= 0) {
        console.log("loose!" + "state+" + gameState + "mobs=" + numMobs + "health=" + health);

        //Set up the button for return to menu
        menuButton.y = 500;
        menuButton.x = 650;
        menuButton.addEventListener('click', function (evt) {
            stage.removeAllChildren();
            stage.removeAllEventListeners();
            init();
        }, false);

        //Center our message
        postLooseMessage.y = (window.innerHeight / 2);
        postLooseMessage.x = ((window.innerWidth / 2) - 100);

        gameState = 4;

        //createjs.Sound.play("sound_HDeath");
        stage.addChild(looseMessage);

        stage.update();
    }
}

//This function clears the screen of old values, and then replaces them with the new ones.
function updateInfo() {
    stage.removeChild(postHealth);
    postHealth = new createjs.Text("Health: " + health, "20px Consolas", "#FFFFFF");
    stage.addChild(postHealth);
    stage.removeChild(postScore);
    postScore = new createjs.Text("Score: " + score, "20px Consolas", "#FFFFFF");
    stage.addChild(postScore);
    stage.removeChild(postLevel);
    postLevel = new createjs.Text("Level: " + level, "20px Consolas", "#FFFFFF");
    stage.addChild(postLevel);
    stage.removeChild(postMobs);
    postMobs = new createjs.Text("Remaining Monsters: " + (monsterArray.filter(function (value) {
        return value !== undefined;
    }).length), "20px Consolas", "#FFFFFF");
    stage.addChild(postMobs);

    //Position the text
    postHealth.x = 10;
    postScore.x = 300;
    postLevel.x = 430;
    postMobs.x = 560;

    //Display bullets and score
    stage.addChild(postHealth);
    stage.addChild(postScore);
    stage.addChild(postLevel);
    stage.addChild(postMobs);
}

function checkHit() {
    //Get how many monsters are currently in the array.
    var numMobs = (monsterArray.filter(function (value) {
        return value !== undefined;
    }).length);

    //Get how many bullets are currently in the array.
    var numBullets = bulletArray.filter(function (value) {
        return value !== undefined;
    }).length;
    var hitSuccess;

    for (var mob = 0; mob < numMobs; mob++) {
        hitSuccess = hitTest(monsterArray[mob].x, monsterArray[mob].y, monsterArray[mob].getBounds().width, monsterArray[mob].getBounds().height, hero.x, hero.y);

        if (hitSuccess == true) {
            createjs.Sound.play("sound_Pain");
            health -= 2;
        }

        for (var bullets = 1; bullets <= numBullets; bullets++) {
            hitSuccess = hitTest(monsterArray[mob].x, monsterArray[mob].y, monsterArray[mob].getBounds().width, monsterArray[mob].getBounds().height, bulletArray[bullets].x, bulletArray[bullets].y);

            if (hitSuccess == true) {
                createjs.Sound.play("sound_MDeath");
                stage.removeChild(monsterArray[mob]);
                stage.removeChild(bulletArray[bullets]);

                monsterArray.splice(mob, 1);
                bulletArray.splice(bullets, 1);
                bulletDirectionArray.splice(bullets, 1);
            }
        }
    }

    //Check coin hit
    if (hitTest(coin.x, coin.y, coin.getBounds().width, coin.getBounds().height, hero.x, hero.y) == true) {
        score += 10;
        stage.removeChild(coin);
        loadCoin();
        console.log("Coin GET!!!!!");
        createjs.Sound.play("sound_coin");
    }

    //Clear the way
    stage.removeChild(postHealth);
    stage.removeChild(postScore);
    stage.update();

    postHealth = new createjs.Text("Health: " + health, "20px Consolas", "#FFFFFF");
    postScore = new createjs.Text("Score: " + score, "20px Consolas", "#FFFFFF");

    //Position the text!
    postHealth.x = 10;
    postScore.x = 300;

    stage.addChild(postHealth);
    stage.addChild(postScore);
}

function hitTest(x1, y1, w1, h1, x2, y2) {
    //x1, y1 = x and y coordinates of object 1
    //w1, h1 = width and height of object 1
    //x2, y2 = x and y coordinates of object 2 (usually midpt)
    if ((x1 <= x2 && x1 + w1 >= x2) && (y1 <= y2 && y1 + h1 >= y2))
        return true;
    else
        return false;
}
//# sourceMappingURL=game.js.map
