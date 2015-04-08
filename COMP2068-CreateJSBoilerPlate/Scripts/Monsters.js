function loadMonster(numMonsters) {
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

    for (var mob = 0; mob < numMonsters; mob++) {
        //Set monster speed
        speed = 1; //Math.floor(Math.random() * (8 - 1 + 1)) + 1;

        //Set a random Y axis
        /*Floor Y Coords
        * First: 110
        * Second: 280
        */
        y = 110;

        //y = 280;//Math.floor(Math.random() * ((window.innerHeight - 50) - 1 + 1)) + 1;
        if (mob == 1)
            y = 110;

        if (mob == 2)
            y = 280;

        if (mob == 3)
            y = 450;

        if (mob == 4)
            y = 620;

        if (mob == 5)
            y = 790;

        console.log("Mob created! Speed = " + speed);

        // create a BitmapAnimation instance to display and play back the sprite sheet:
        monsterArray[mob] = new createjs.Sprite(spriteSheet);

        // start playing the first sequence:
        monsterArray[mob].gotoAndPlay("walk"); //animate

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated rats if you disabled the shadow.
        monsterArray[mob].shadow = new createjs.Shadow("#454", 0, 5, 4);
        monsterArray[mob].name = "monster1";
        monsterArray[mob].direction = 90;

        console.log("Mob Created!");

        //Speed
        monsterArray[mob].vX = speed;

        //X Plane (Starting pos)
        monsterArray[mob].x = 0;

        //Y Plane (Run on this line)
        monsterArray[mob].y = y;

        //Left or Right
        monsterArray[mob].scaleX = 90;

        //Start at frame one
        monsterArray[mob].currentFrame = 0;

        stage.addChild(monsterArray[mob]);
    }

    stage.update();
}

function animateMonsters() {
    //Get how many monsters are currently in the array.
    var numMobs = monsterArray.filter(function (value) {
        return value !== undefined;
    }).length;

    for (var mob = 0; mob < numMobs; mob++) {
        // Hit testing the screen width, otherwise our sprite would disappear
        if (monsterArray[mob].x >= window.innerWidth - 36) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            monsterArray[mob].scaleX = 1;
            monsterArray[mob].direction = -90;
        }

        if (monsterArray[mob].x < 16) {
            // We've reached the left side of our screen
            // We need to walk right now
            monsterArray[mob].scaleX = -1;
            monsterArray[mob].direction = 90;
        }

        // Moving the sprite based on the direction & the speed
        if (monsterArray[mob].direction == 90) {
            monsterArray[mob].x += monsterArray[mob].vX;
        } else {
            monsterArray[mob].x -= monsterArray[mob].vX;
        }
    }

    // update the stage:
    stage.update();
}
//# sourceMappingURL=Monsters.js.map
