
//This function changes the initial amount of ammo the player has, depending on their chosen difficulty setting. 
function setAmmo() {

    //Get how many monsters are currently in the array. 
    var numMobs = monsterArray.filter(function (value) { return value !== undefined }).length;

    //Set monster speed randomly, based on the difficulty
    switch (difficulty) {

        //Easy
        case 0:
            bullets = (numMobs + 10);
            break;
        //Medium
        case 1:
            bullets = (numMobs + 5);
            break;

        //Hard
        case 2:
            bullets = (numMobs + 1);
            break;
    }
}

function loadPlayer() {

    //  imgMonsterARun.onload = handleImageLoad;
    //  imgMonsterARun.onerror = handleImageError;
    imgMonsterARun.src = "assets/images/MonsterARun.png";

    // create spritesheet and assign the associated data.
    var spriteSheet = new createjs.SpriteSheet({
        // image to use
        images: [imgMonsterARun],
        // width, height & registration point of each sprite
        frames: { width: 64, height: 64, count: 10, regX: 32, regY: 32 },
        animations: {
            walk: [0, 9, "walk"]
        }
    });

    var speed;
    var y;
    var floor;

    //Set monster speed randomly, based on the difficulty
    switch (difficulty) {

        //Easy
        case 0:
            speed = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            break;
        //Medium
        case 1:
            speed = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            break;

        //Hard
        case 2:
            speed = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
            break;
    }

    /*Floor Y Coords
     * First: 110
     * Second: 280
     * Third: 450
     * Fourth: 620
     * Fifth: 790
     */

    //Pick a floor for the monster to be on at random. (Between 1 and 5)
    floor = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    switch (floor) {

        case 1:
            y = 110;
            break;

        case 2:
            y = 280;
            break;

        case 3:
            y = 450;
            break;

        case 4:
            y = 620;
            break;

        case 5:
            y = 790;
            break;
    }



    //y = 280;//Math.floor(Math.random() * ((window.innerHeight - 50) - 1 + 1)) + 1;


    console.log("Mob created! Speed = " + speed);

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    hero = new createjs.Sprite(spriteSheet);

    // start playing the first sequence:
    hero.gotoAndPlay("walk");     //animate

   // hero.shadow = new createjs.Shadow("#454", 0, 5, 4);
    hero.name = "Hero";
    hero.direction = 90;

    console.log("Hero Created!");

    //Speed
    hero.vX = 8;
    //X Plane (Starting pos)
    hero.x = 10;
    //Y Plane (Run on this line)
    hero.y = 50;
    //Left or Right
    hero.scaleX = 1;
    //Start at frame one
    hero.currentFrame = 0;

    stage.addChild(hero);
    stage.update();
}

function animatePlayer(direction) {
    console.log("movement!" + direction);

    if (direction == 2) {//right
        if (hero.x <= window.innerWidth - 50) {
            hero.scaleX = -1;
            hero.x += hero.vX;
        }
    }

    if (direction == 3) {//left
        if (hero.x >= 36) {
            hero.scaleX = 1;
            hero.x -= hero.vX;
        }
    }

    if (direction == 0) {//up
        if (hero.y >= 36) {
            hero.y -= hero.vX;
        }
    }

    if (direction == 1) {//down
        if (hero.y <= window.innerHeight - 50) {
            hero.y += hero.vX;
        }
    }

    // update the stage:
    stage.update();
}