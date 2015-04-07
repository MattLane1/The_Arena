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
        speed = Math.floor(Math.random() * (8 - 1 + 1)) + 1;

        //Set a random Y axis
        y = Math.floor(Math.random() * ((window.innerHeight - 50) - 1 + 1)) + 1;

        console.log("Mob created! Speed = " + speed);

        // create a BitmapAnimation instance to display and play back the sprite sheet:
        bmpAnimation[mob] = new createjs.Sprite(spriteSheet);

        // start playing the first sequence:
        bmpAnimation[mob].gotoAndPlay("walk"); //animate

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated rats if you disabled the shadow.
        bmpAnimation[mob].shadow = new createjs.Shadow("#454", 0, 5, 4);
        bmpAnimation[mob].name = "monster1";
        bmpAnimation[mob].direction = 90;

        console.log("Mob Created!");

        //Speed
        bmpAnimation[mob].vX = speed;

        //X Plane (Starting pos)
        bmpAnimation[mob].x = 0;

        //Y Plane (Run on this line)
        bmpAnimation[mob].y = y;

        //Left or Right
        bmpAnimation[mob].scaleX = 90;

        //Start at frame one
        bmpAnimation[mob].currentFrame = 0;

        stage.addChild(bmpAnimation[mob]);
    }

    stage.update();
}

function animateMonsters() {
    var playerLocation = findPlayer();

    //Get how many monsters are currently in the array.
    var numMobs = bmpAnimation.filter(function (value) {
        return value !== undefined;
    }).length;

    for (var mob = 0; mob < numMobs; mob++) {
        // Hit testing the screen width, otherwise our sprite would disappear
        if (bmpAnimation[mob].x >= window.innerWidth - 36) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            bmpAnimation[mob].scaleX = 1;
            bmpAnimation[mob].direction = -90;
        }

        if (bmpAnimation[mob].x < 16) {
            // We've reached the left side of our screen
            // We need to walk right now
            bmpAnimation[mob].scaleX = -1;
            bmpAnimation[mob].direction = 90;
        }

        // Moving the sprite based on the direction & the speed
        if (bmpAnimation[mob].direction == 90) {
            bmpAnimation[mob].x += bmpAnimation[mob].vX;
        } else {
            bmpAnimation[mob].x -= bmpAnimation[mob].vX;
        }
    }

    // update the stage:
    stage.update();
}
//# sourceMappingURL=Monsters.js.map
