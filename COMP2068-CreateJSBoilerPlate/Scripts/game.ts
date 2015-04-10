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
var postBullets;
var postScore;
var postTime;
var postLevel;
var postMobs;

var test;

//Images
var background: createjs.Bitmap;
var imgMonsterARun = new Image();
var monsterArray = new Array(100);
var hero;

//mouse coords
var shotAtX;
var shotAtY;

//Current score and hp values
var score;
var bullets;
var time;

//Difficulty Level
var difficulty;

//Level
var level;

//Player
var playerLocationX;
var playerLocationY;


function init() {
    //level one is the start (obviously)
    level = 0;

    test = false;

    //Default difficulty (easy)
    difficulty = 0;

    //Shot coordinates
    shotAtX = 0;
    shotAtY = 0;

    //Score and remaining bullets
    score = 0;
    bullets = 15;

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
    level = 0;
    gameState = 2;
    time = 60;

    stage.removeAllChildren();
    stage.removeAllEventListeners();

    //Add listener for mouse movement
    canvas.addEventListener('click', function (evt) {
        takeShot(evt);
    }, false);

    //Set up Ticker
    createjs.Ticker.addEventListener("tick", gameLoop);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(30);

    //Set up the Background
    background = new createjs.Bitmap("assets/images/background.jpg");
    background.scaleY = background.scaleX = 1.6;

    this.document.onkeydown = controls;

    //Add the background
    stage.addChild(background);

    //Load the enemies
    loadMonster(10);

    //Load our hero
    loadPlayer();

    //Set up ammo
    setAmmo();

    //Update info
    updateInfo();

}

function controls() {
    switch (event.keyCode) {
        case 38://right
            animatePlayer(0);
            break;

        case 40://down
            animatePlayer(1);
            break;

        case 39://up
            animatePlayer(2);
            break;

        case 37://left
            animatePlayer(3);
            break;
    }
}

function gameLoop() {

   

    if (gameState != 4) {

        //Get how many monsters are currently in the array. 
        var numMobs = monsterArray.filter(function (value) { return value !== undefined }).length;

        if (bullets == 0 || time == 0) {
            gameState = 3;
            levelSplash();
        }

        if (numMobs == 0 && gameState == 2) {
            gameState = 3;
            levelSplash();
        }

        if (gameState == 2) {

            updateInfo();

            if (numMobs != 0)
               //targetPlayer();
               animateMonsters();
                
            stage.update();
        }
    }
}

function levelSplash() {

    //Get how many monsters are currently in the array. 
    var numMobs = (monsterArray.filter(function (value) { return value !== undefined }).length);

    //They Won!
    if (gameState == 3 && numMobs == 0 && time != 0) {
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

        stage.addChild(winMessage);
    }

    //They lost!
    if (gameState == 3 && numMobs != 0 || bullets == 0 || time == 0) {
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

    stage.removeChild(postBullets);
    postBullets = new createjs.Text("Bullets Remaining : " + bullets, "20px Consolas", "#FFFFFF");
    stage.addChild(postBullets);
    stage.removeChild(postScore);
    postScore = new createjs.Text("Score: " + score, "20px Consolas", "#FFFFFF");
    stage.addChild(postScore);
    stage.removeChild(postTime);
    postTime = new createjs.Text("Time: " + time, "20px Consolas", "#FFFFFF");
    stage.addChild(postTime);
    stage.removeChild(postLevel);
    postLevel = new createjs.Text("Level: " + level, "20px Consolas", "#FFFFFF");
    stage.addChild(postLevel);
    stage.removeChild(postMobs);
    postMobs = new createjs.Text("Remaining Monsters: " + monsterArray.filter(function (value) { return value !== undefined }).length, "20px Consolas", "#FFFFFF");
    stage.addChild(postMobs);

    //Position the text
    postBullets.x = 10;
    postScore.x = 300;
    postTime.x = 430;
    postLevel.x = 560;
    postMobs.x = 690;


    //Display bullets and score
    stage.addChild(postBullets);
    stage.addChild(postScore);
    stage.addChild(postTime);
    stage.addChild(postLevel);
    stage.addChild(postMobs);
}

function takeShot(e) {
    //Off set for the width of the monsters
    shotAtX = event.clientX + (32);
    shotAtY = event.clientY + (32);
    playerLocationX = shotAtX;
    playerLocationY = shotAtY;

    if (gameState == 2)
        checkHit(shotAtX, shotAtY);

  //  console.log("Click at position x =" + playerPosX);
  //  console.log("Click at position y =" + playerPosY);
}

function checkHit(shotCoordsX, shotCoordsY) {
    //Get how many monsters are currently in the array. 
    var numMobs = (monsterArray.filter(function (value) { return value !== undefined }).length);
    var hitSuccess;

    bullets -= 1;

    for (var mob = 0; mob < numMobs; mob++) {
       
        hitSuccess = hitTest(monsterArray[mob].x, monsterArray[mob].y, monsterArray[mob].getBounds().width, monsterArray[mob].getBounds().height, shotCoordsX, shotCoordsY);

        // console.log("---------Monster Location Info Incoming---------");
        // console.log("Mob #" + mob + "at location: " + monsterArray[mob]);
        // console.log("------------------------------------------------");

        if (hitSuccess == true) {
            console.log("Hit on monster # " + mob);
            console.log("Array = " + monsterArray[mob]);
            stage.removeChild(monsterArray[mob]);

            //The monster is dead. RIP monster. He has shuffled off his mortal coil. He is no more. As such, let us remove him. 
            monsterArray.splice(mob, 1);
   
            //Increase score
            score += 10;

            break;
           
        }

        else
           console.log("Miss!");
    }
    //Clear the way
    stage.removeChild(postBullets);
    stage.removeChild(postScore);
    stage.update();

    postBullets = new createjs.Text("Bullets Remaining : " + bullets, "20px Consolas", "#FFFFFF");
    postScore = new createjs.Text("Score: " + score, "20px Consolas", "#FFFFFF");

    //Position the text!
    postBullets.x = 10;
    postScore.x = 300;

    stage.addChild(postBullets);
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
