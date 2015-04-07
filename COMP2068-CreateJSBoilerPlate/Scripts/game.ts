//Create stage and canvas
var canvas;
var stage: createjs.Stage;

//Set up bitmaps
var hero: createjs.Bitmap;
var background: createjs.Bitmap;
//var splashScreen: createjs.Bitmap;

//Set up enemy images
var enemyCarOne: createjs.Bitmap;
var enemyCarTwo: createjs.Bitmap;
var enemyCarThree: createjs.Bitmap;
var enemyCarFour: createjs.Bitmap;
var enemyCarFive: createjs.Bitmap;
var enemyCarSix: createjs.Bitmap;

//Coin imagew
var coin: createjs.Bitmap;

//Coin rect
var coinRect = new createjs.Rectangle();

//Player car rect
var carRect = new createjs.Rectangle();

//Enemy car rects
var enemyOneRect = new createjs.Rectangle();
var enemyTwoRect = new createjs.Rectangle();
var enemyThreeRect = new createjs.Rectangle();
var enemyFourRect = new createjs.Rectangle();
var enemyFiveRect = new createjs.Rectangle();
var enemySixRect = new createjs.Rectangle();

//The current position of each enemy and the coin
var posEnemyOne;
var posEnemyTwo;
var posEnemyThree;
var posEnemyFour;
var posEnemyFive;
var posEnemySix;
var posCoin;

//Flag section (is each enemy or coin, alive on screen? Is the game over?)
var gameOver;
var carOneAlive;
var carTwoAlive;
var carThreeAlive;
var carFourAlive;
var carFiveAlive;
var carSixAlive;
var coinAlive;

//Detection of collisions lasts as long as the images colide. We only need to register a hit once, so we set the flag as soon as damage is done. 
var carOneHit;
var carTwoHit;
var carThreeHit;
var carFourHit;
var carFiveHit;
var carSixHit;

//post variables are used to write words to the screen for the user
var postHP;
var postReset;
var postScore;
var postInstructions;
var postWinLoose;

//Current score and hp values
var score;
var hp;

//Sounds
var coinSound;

var imgMonsterARun = new Image();

var bmpAnimation = new Array(100);

function init() {

    //Set up canvas and stage
    canvas = document.getElementById("canvas");

    //Set up Canvas (Why do I need to reduce size?
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    //Set Up Stage
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events

    //find canvas and load images, wait for last image to load
    canvas = document.getElementById("testCanvas");

    //Set up the Background
    background = new createjs.Bitmap("assets/images/test.png");
    background.scaleY = background.scaleX = 1.3;

    //Enable Key events
    this.document.onkeydown = controls;

    //Add the background
    stage.addChild(background);

    createjs.Ticker.addEventListener("tick", gameLoop);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);


    loadMonster(10);
}

function gameLoop() {
    //Get how many monsters are currently in the array. 
    var numMobs = bmpAnimation.filter(function (value) { return value !== undefined }).length;

    if (numMobs != 0)
        animateMonsters();

    else
        console.log("You Win!!!");

    stage.update();
}

function controls() {
    // console.log("Bingo");
    // console.log("AHA!" + event.keyCode);

    switch (event.keyCode) {

        case 38://Up
            hero.y -= 15;
            break;

        case 40://Down
            hero.y += 15;
            break;

        case 39://Right
            hero.x += 15;
            break;

        case 37://Left
            hero.x -= 15;
            break;
    }
}
































/*
//Main
function main() {
    //Set up canvas and stage
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    //Set up stage
    stage.canvas.width = (window.innerWidth - 25);
    stage.canvas.height = (window.innerHeight - 25);
    stage.enableMouseOver(20); // Enable mouse events

    //Add listener for mouse movement
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        movePlayer(mousePos);
    }, false);

    //Inital health and score
    hp = 200;
    score = 0;

    //Flag defaults
    carOneAlive = false;
    carTwoAlive = false;
    carThreeAlive = false;
    carFourAlive = false;
    carFiveAlive = false;
    carSixAlive = false;
    carOneHit = false;
    carTwoHit = false;
    carThreeHit = false;
    carFourHit = false;
    carFiveHit = false;
    carSixHit = false;
    coinAlive = false;
    gameOver = false;

    //Define ticker
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    //Add sound
    coinSound = new Audio('coin.aiff');

    //Create player controlled car
    car = new createjs.Bitmap("assets/images/car.png");
    car.scaleX = .5;
    car.scaleY = .5;
    car.y = (480 - car.y);

    //Hide the car on the splash screen
    car.visible = false;

    //Prepare the enemy cars
    loadEnemyCars();

    //Set up the splash screen
    splashScreen = new createjs.Bitmap("assets/images/Splash.png");
    splashScreen.x = 0;
    splashScreen.y = 0;
    splashScreen.scaleX = 2.1;
    splashScreen.scaleY = 1.5;

    //Add a listener to the splash screen
    splashScreen.addEventListener("click", beginGame, false);
    
    //Display the splash
    stage.addChild(splashScreen);
 
    //Update the stage
    stage.update();
}

//This function resets the game so the user can play again. This is only called when the user restarts the game. 
function resetGame() {
    //Reset all inital values
    hp = 200;
    score = 0;

    //Default the flags
    carOneAlive = false;
    carTwoAlive = false;
    carThreeAlive = false;
    carFourAlive = false;
    carFiveAlive = false;
    carSixAlive = false;
    carOneHit = false;
    carTwoHit = false;
    carThreeHit = false;
    carFourHit = false;
    carFiveHit = false;
    carSixHit = false;
    coinAlive = false;
    gameOver = false;

    //Remove the listener we added when the game ended (for restarting)
    background.addEventListener("click", null);

    //Clear the stage so we start off fresh each time
    stage.removeAllChildren();

    //Begin!
    beginGame();
}

//This function starts the game. It loads enemies, the background etc. 
function beginGame() {
    //Add in the background
    background = new createjs.Bitmap("assets/images/road.jpg");
    background.scaleX = background.scaleY = 3.3;

    //Clear the splash screen
    stage.removeChild(splashScreen);
    stage.addChild(background);

    //The players car can now be seen and used.
    car.visible = true;

    //Spawn us some enemies!
    newEnemy(1);
    newEnemy(3);
    newEnemy(5);

    //Post current health and score
    updateHealthOrScore();
}

//The Game Loop, called every tick. 
function gameLoop() {
    //Hide the cursor (we don't need it)
    stage.canvas.style.cursor = "none";

    //We win!
    if (score >= 200) {
        //Post win message
        postWinLoose = new createjs.Text("CONGRADULATIONS, YOU WIN!!", "80px Consolas", "#FFFFFF");
        postWinLoose.x = 140;

        //Inform how to reset the game
        postReset = new createjs.Text("Click anywhere on the screen to play again!", "30px Consolas", "#FFFFFF");
        postReset.x = 180;
        postReset.y = 200;

        //The game is over!
        gameOver = true;

        //Wait for reset 
        background.addEventListener("click", resetGame, false);

        //Display!
        stage.addChild(postReset);
        stage.addChild(postWinLoose);
        stage.update();
    }

    //We loose!
    if (hp <= 0) {
        //Post win message
        postWinLoose = new createjs.Text("TRY AGAIN, YOU LOOSE!!", "80px Consolas", "#FFFFFF");
        postWinLoose.x = 140;

        //Inform how to reset the game
        postReset = new createjs.Text("Click anywhere on the screen to play again!", "30px Consolas", "#FFFFFF");
        postReset.x = 140;
        postReset.y = 200;

        //The game is over!
        gameOver = true;

        //Wait for reset
        background.addEventListener("click", resetGame, false);

        //Display!
        stage.addChild(postReset);
        stage.addChild(postWinLoose);
        stage.update();
    }

    //The game is on!
    if (gameOver == false) {
        //Move cars and money toward the player
        manageEnemiesAndCoins();

        //Check if anything has been hit
        manageColisions();

        //Set up and display the current stage
        setStage();
    }
}

//This function loads images to the stage. It prepares the stage to host the game. 
function setStage() {
    //Clear the stage first
    stage.clear();

    //Add the background 
    stage.addChild(background);

    //Add the player
    stage.addChild(car);

    //Add living enemies
    if (carOneAlive == true)
        stage.addChild(enemyCarOne);

    if (carTwoAlive == true)
        stage.addChild(enemyCarTwo);

    if (carThreeAlive == true)
        stage.addChild(enemyCarThree);

    if (carFourAlive == true)
        stage.addChild(enemyCarFour);

    if (carFiveAlive == true)
        stage.addChild(enemyCarFive);

    if (carSixAlive == true)
        stage.addChild(enemyCarSix);

    //If there is a coin, add it too. 
    if (coinAlive == true)
        stage.addChild(coin);

    //Add the score and hp to the stage
    stage.addChild(postHP);
    stage.addChild(postScore);
    stage.update(); // Refreshes our stage
}

//This function checks for collisions. 
function manageColisions() {
    //Get player location
    carRect = car.getTransformedBounds();

    //Get enemy locations
    enemyOneRect = enemyCarOne.getTransformedBounds();
    enemyTwoRect = enemyCarTwo.getTransformedBounds();
    enemyThreeRect = enemyCarThree.getTransformedBounds();
    enemyFourRect = enemyCarFour.getTransformedBounds();
    enemyFiveRect = enemyCarFive.getTransformedBounds();
    enemySixRect = enemyCarSix.getTransformedBounds();

    //Get coins location
    coinRect = coin.getTransformedBounds();

    //Picked up a coin?
    if (carRect.x < coinRect.x + coinRect.width &&
        carRect.x + carRect.width > coinRect.x &&
        carRect.y < coinRect.y + coinRect.height &&
        carRect.height + carRect.y > coinRect.y && coinAlive == true) {
       //Coin picked up, thats 25 points
        score += 25;
        //Update their score
        updateHealthOrScore();
        //Coin is no longer in play
        coinAlive = false;
        coin.y = -200;
        //Play the sound clip
        coinSound.play();
    }

    //Car one collision detection
    if (carRect.x < enemyOneRect.x + enemyOneRect.width &&
        carRect.x + carRect.width > enemyOneRect.x &&
        carRect.y < enemyOneRect.y + enemyOneRect.height &&
        carRect.height + carRect.y > enemyOneRect.y && carOneHit == false) {
        //Car hit, they loose 25 hp
        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carOneHit = true;
    }

    //Car Two collision detection
    if (carRect.x < enemyTwoRect.x + enemyTwoRect.width &&
        carRect.x + carRect.width > enemyTwoRect.x &&
        carRect.y < enemyTwoRect.y + enemyTwoRect.height &&
        carRect.height + carRect.y > enemyTwoRect.y && carTwoHit == false) {
         //Car hit, they loose 25 hp

        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carTwoHit = true;
    }

    //Car Three collision detection
    if (carRect.x < enemyThreeRect.x + enemyThreeRect.width &&
        carRect.x + carRect.width > enemyThreeRect.x &&
        carRect.y < enemyThreeRect.y + enemyThreeRect.height &&
        carRect.height + carRect.y > enemyThreeRect.y && carThreeHit == false) {
         //Car hit, they loose 25 hp

        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carThreeHit = true;
    }

    //Car Four collision detection
    if (carRect.x < enemyFourRect.x + enemyFourRect.width &&
        carRect.x + carRect.width > enemyFourRect.x &&
        carRect.y < enemyFourRect.y + enemyFourRect.height &&
        carRect.height + carRect.y > enemyFourRect.y && carFourHit == false) {
        //Car hit, they loose 25 hp

        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carFourHit = true;
    }

    //Car Five collision detection
    if (carRect.x < enemyFiveRect.x + enemyFiveRect.width &&
        carRect.x + carRect.width > enemyFiveRect.x &&
        carRect.y < enemyFiveRect.y + enemyFiveRect.height &&
        carRect.height + carRect.y > enemyFiveRect.y && carFiveHit == false) {
       //Car hit, they loose 25 hp

        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carFiveHit = true;
    }

    //Car Six collision detection
    if (carRect.x < enemySixRect.x + enemySixRect.width &&
        carRect.x + carRect.width > enemySixRect.x &&
        carRect.y < enemySixRect.y + enemySixRect.height &&
        carRect.height + carRect.y > enemySixRect.y && carSixHit == false) {
        //Car hit, they loose 25 hp

        hp -= 25;
        updateHealthOrScore();
        //This flag stops the enemy doing damage until they leave the area, they should only do damage once. 
        carSixHit = true;
    }
}

//This function tests if there is a collision, and returns true or false. 
function hitTestPoint(x1, y1, w1, h1, x2, y2) {
        if ((x1 <= x2 && x1 + w1 >= x2) &&
            (y1 <= y2 && y1 + h1 >= y2))
            return true;
        else
            return false;
}

//This function gets and returns the position of the mouse
function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}

//This function loads, sizes and positions the enemy cars
function loadEnemyCars() {
    //Create enemy one
    enemyCarOne = new createjs.Bitmap("assets/images/enemyOne.png");
    enemyCarOne.scaleX = .6;
    enemyCarOne.scaleY = .6;
    enemyCarOne.y = 0;

    //Create enemy two
    enemyCarTwo = new createjs.Bitmap("assets/images/enemyTwo.png");
    enemyCarTwo.scaleX = .6;
    enemyCarTwo.scaleY = .6;
    enemyCarTwo.y = 0;

    //Create enemy three
    enemyCarThree = new createjs.Bitmap("assets/images/enemyThree.png");
    enemyCarThree.scaleX = .6;
    enemyCarThree.scaleY = .6;
    enemyCarThree.y = 0;

    //Create enemy four
    enemyCarFour = new createjs.Bitmap("assets/images/enemyFour.png");
    enemyCarFour.scaleX = .6;
    enemyCarFour.scaleY = .6;
    enemyCarFour.y = 0;

    //Create enemy five
    enemyCarFive = new createjs.Bitmap("assets/images/enemyFive.png");
    enemyCarFive.scaleX = .6;
    enemyCarFive.scaleY = .6;
    enemyCarFive.y = 0;

    //Create enemy Six
    enemyCarSix = new createjs.Bitmap("assets/images/enemySix.png");
    enemyCarSix.scaleX = .6;
    enemyCarSix.scaleY = .6;
    enemyCarSix.y = 0;

    //Create coin
    coin = new createjs.Bitmap("assets/images/coin.png");
    coin.scaleX = .5;
    coin.scaleY = .5;
    coin.y = 0;
    
}

//This function moves the players character with the mouse
function movePlayer(mousePos) {
    //Hide the mouse, it isn't needed for this game. 
    stage.canvas.style.cursor = "none";

    //DO BOUNDING
    car.x = (mousePos.x - 40); 
    car.y = (480 - car.image.height()); 
}

//This function sets and displays the strings for HP and Score. 
function updateHealthOrScore() {

    //Display health
    postHP = new createjs.Text("HP:" + hp, "20px Consolas", "#FFFFFF");
    postHP.x = 0;
    postHP.y = 0;

    //Display score
    postScore = new createjs.Text("Score:" + score, "20px Consolas", "#FFFFFF");
    postScore.x = 90;
    postScore.y = 0;
}

//This function generates new enemies at random locations along the x plane, to "attack" the player, car 3 is special, because it also spawns a coin. 
function newEnemy(whichCar) {
    //Clear the stage for the next load
    stage.clear();
    //"whichCar" is used to tell this function which enemy is to be loaded. Each car has its own speed and colour. 
    if (whichCar == 1) {
        //The car is new, so it hasn't been hit
        carOneHit = false;
        //The car is alive
        carOneAlive = true;
        enemyCarOne.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemyOne = Math.floor((Math.random() * 1260) + 1);
     
        stage.addChild(enemyCarOne);
    }

    if (whichCar == 2) {
        //The car is new, so it hasn't been hit
        carTwoHit = false;
        //The car is alive
        carTwoAlive = true;
        enemyCarTwo.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemyTwo = Math.floor((Math.random() * 1260) + 1);

        stage.addChild(enemyCarTwo);
    }

    if (whichCar == 3) {
        //The car is new, so it hasn't been hit
        carThreeHit = false;
        //The car is alive
        carThreeAlive = true;
        enemyCarThree.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemyThree = Math.floor((Math.random() * 1260) + 1);

        coin.y = 0;
        //Spawn it at a random x at the top of the screen.
        posCoin = Math.floor((Math.random() * 1260) + 1);
        //The coin is alive
        coinAlive = true;
        
        stage.addChild(coin);
        stage.addChild(enemyCarThree);
    }

    if (whichCar == 4) {
        //The car is new, so it hasn't been hit
        carFourHit = false;
        //The car is alive
        carFourAlive = true;
        enemyCarFour.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemyFour = Math.floor((Math.random() * 1260) + 1);

        stage.addChild(enemyCarFour);
    }

    if (whichCar == 5) {
        //The car is new, so it hasn't been hit
        carFiveHit = false;
        //The car is alive
        carFiveAlive = true;
        enemyCarFive.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemyFive = Math.floor((Math.random() * 1260) + 1);

        stage.addChild(enemyCarFive);
    }

    if (whichCar == 6) {
        //The car is new, so it hasn't been hit
        carSixHit = false;
        //The car is alive
        carSixAlive = true;
        enemyCarSix.y = 0;
        //Spawn it at a random x at the top of the screen.
        posEnemySix = Math.floor((Math.random() * 1260) + 1);

        stage.addChild(enemyCarSix);
    }

    //Set the car to 0 so this function doesn't trigger again until there is a new car needed
    whichCar = 0;
}

//This function moves the enemies (and coin) down the road toward the player and when they are off screen (dead), it spawns the next enemy in line. 
function manageEnemiesAndCoins() {

    //Create new enemies as others "die"
    if (enemyCarOne.y >= 600) {
        newEnemy(2);
        enemyCarOne.y = -200;
        carOneAlive = false;
    }

    if (enemyCarTwo.y >= 600) {
        newEnemy(3);
        enemyCarTwo.y = -200;
        carTwoAlive = false;
    }

    if (enemyCarThree.y >= 600) {
        newEnemy(4);
        enemyCarThree.y = -200;
        carThreeAlive = false;
    }

    if (enemyCarFour.y >= 600) {
        newEnemy(5);
        enemyCarFour.y = -200;
        carFourAlive = false;
    }

    if (enemyCarFive.y >= 600) {
        newEnemy(6);
        enemyCarFive.y = -200;
        carFiveAlive = false;
    }

    if (enemyCarSix.y >= 500) {
        newEnemy(1);
        enemyCarSix.y = -200;
        carSixAlive = false;
    }

    //Move the coin
    if (coin.y >= 500) {
        coin.y = -200;
        coinAlive = false;
    }

    //Move the "living" enemies down the road
    if (carOneAlive == true) {
        enemyCarOne.y += 9;
        enemyCarOne.x = posEnemyOne;
    }

    if (carTwoAlive == true) {
        enemyCarTwo.y += 12;
        enemyCarTwo.x = posEnemyTwo;
    }

    if (carThreeAlive == true) {
        enemyCarThree.y += 14;
        enemyCarThree.x = posEnemyThree;
    }

    if (carFourAlive == true) {
        enemyCarFour.y += 11;
        enemyCarFour.x = posEnemyFour;
    }

    if (carFiveAlive == true) {
        enemyCarFive.y += 17;
        enemyCarFive.x = posEnemyFive;
    }

    if (carSixAlive == true) {
        enemyCarSix.y += 10;
        enemyCarSix.x = posEnemySix;
    }

    //move the "living" coin
    if (coinAlive == true) {
        coin.y += 15;
        coin.x = posCoin;
    }
}
*/

