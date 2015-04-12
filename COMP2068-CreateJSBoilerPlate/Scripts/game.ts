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
var stage: createjs.Stage;

//post variables are used to write words to the screen for the user
var postHealth;
var postScore;
var postLevel;
var postMobs;

var test;

//Images
var background: createjs.Bitmap;
var imgMonsterARun = new Image();
var imgHero = new Image();
var imgCoin = new Image();
var monsterArray = new Array(100);
var hero;
var coin;

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

    }, false)

    //Set up button for start medium mode.
    mediumButton.y = 500;
    mediumButton.x = 550;
    mediumButton.addEventListener('click', function (evt) {
        difficulty = 1;
        beginGame();

    }, false)

    //Set up button for start hard mode.
    hardButton.y = 500;
    hardButton.x = 850;
    hardButton.addEventListener('click', function (evt) {
        difficulty = 2;
        beginGame();

    }, false)

    stage.addChild(menu);

    stage.update();
}

function beginGame() {
   
    gameState = 2;

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

}

function controls() {
    switch (event.keyCode) {
        case 38://right
            playerDirectionArray[2] = true;
            break;

        case 40://down
            playerDirectionArray[1] = true;
            break;

        case 39://up
            playerDirectionArray[0] = true;
            break;

        case 37://left
            playerDirectionArray[3] = true;
            break;

        case 32://Attack!
           // attacking = true;
            break;

       
    }
}

function offControls() {
    switch (event.keyCode) {
        case 38://right
            playerDirectionArray[2] = false;
            break;

        case 40://down
            playerDirectionArray[1] = false;
            break;

        case 39://up
            playerDirectionArray[0] = false;
            break;

        case 37://left
            playerDirectionArray[3] = false;
            break;

        case 32://Attacking!
            attacking = false;
            break;
    }
}

function gameLoop() {

    playerLocationX = hero.x;
    playerLocationY = hero.y;

    if (gameState != 4) {

        //Get how many monsters are currently in the array. 
        var numMobs = monsterArray.filter(function (value) { return value !== undefined }).length;

        if (health == 0) {
            gameState = 3;
            levelSplash();
        }

        if (numMobs == 0 && gameState == 2) {
            gameState = 3;
            levelSplash();
        }

        if (gameState == 2) {

            updateInfo();

            if (numMobs != 0) {
                targetPlayer();
                animatePlayer();
                checkHit();
           

                stage.update();
            }
        }
    }
}

function levelSplash() {

    //Get how many monsters are currently in the array. 
    var numMobs = ((monsterArray.filter(function (value) { return value !== undefined }).length));

    console.log("CHECKING!" + "state+" + gameState + "mobs=" + numMobs + "health=" + health);

    //They Won!
    if (gameState == 3 && numMobs == 0 && health != 0) {
        console.log("WIN!" + "state+" + gameState + "mobs=" + numMobs + "health=" + health);
        //Set up button for start next level
        nextLevelButton.y = 500;
        nextLevelButton.x = 850;
        nextLevelButton.addEventListener('click', function (evt) {
            level++;
            beginGame();
        }, false)

    //Set up the button for return to menu
    menuButton.y = 500;
        menuButton.x = 850;
        menuButton.addEventListener('click', function (evt) {
            stage.removeAllChildren();
            stage.removeAllEventListeners();
            init();
        }, false)

        gameState = 4;

        stage.addChild(winMessage);

        stage.update();
    }

    //They lost!
    if (gameState == 3 && numMobs != 0 || health == 0) {

        console.log("loose!" + "state+" + gameState + "mobs=" + numMobs + "health=" + health);
        //Set up the button for return to menu
        menuButton.y = 500;
        menuButton.x = 650;
        menuButton.addEventListener('click', function (evt) {
            stage.removeAllChildren();
            stage.removeAllEventListeners();
            init();
        }, false)

        //Center our message
        postLooseMessage.y = (window.innerHeight / 2);
        postLooseMessage.x = ((window.innerWidth / 2) - 100);

        gameState = 4;

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
    postMobs = new createjs.Text("Remaining Monsters: " + (monsterArray.filter(function (value) { return value !== undefined }).length - 1), "20px Consolas", "#FFFFFF");
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
    var numMobs = (monsterArray.filter(function (value) { return value !== undefined }).length);
    var hitSuccess;

    for (var mob = 0; mob < numMobs; mob++) {
       
        hitSuccess = hitTest(monsterArray[mob].x, monsterArray[mob].y, monsterArray[mob].getBounds().width, monsterArray[mob].getBounds().height, hero.x, hero.y);

        // console.log("---------Monster Location Info Incoming---------");
        // console.log("Mob #" + mob + "at location: " + monsterArray[mob]);
        // console.log("------------------------------------------------");

        if (hitSuccess == true) {
 
            if (attacking == false)
                health--;

            if (attacking == true) {
                //Remove the monster
                stage.removeChild(monsterArray[mob]);
                //GIve them points!
                score += 100;
                //The monster is dead. RIP monster. He has shuffled off his mortal coil. He is no more. As such, let us remove him. 
                monsterArray.splice(mob, 1);
                //Increase score
                score += 10;
                break;
            }
           
        }
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
    if ((x1 <= x2 && x1 + w1 >= x2) &&
        (y1 <= y2 && y1 + h1 >= y2))
        return true;
    else
        return false;
}
