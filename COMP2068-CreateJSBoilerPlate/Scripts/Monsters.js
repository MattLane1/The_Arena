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
    var floor;

    for (var mob = 0; mob < numMonsters; mob++) {
        //default floor
        y = 110;

        switch (difficulty) {
            case 0:
                speed = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                break;

            case 1:
                speed = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                break;

            case 2:
                speed = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
                break;
        }

        console.log("Mob created! Speed = " + speed);

        // create a BitmapAnimation instance to display and play back the sprite sheet:
        monsterArray[mob] = new createjs.Sprite(spriteSheet);

        // start playing the first sequence:
        monsterArray[mob].gotoAndPlay("walk"); //animate

        // monsterArray[mob].shadow = new createjs.Shadow("#454", 0, 5, 4);
        monsterArray[mob].name = "monster1";
        monsterArray[mob].direction = 90;

        console.log("Mob Created!");

        //Speed
        monsterArray[mob].vX = speed;

        //X Plane (Starting pos)
        monsterArray[mob].x = Math.floor(Math.random() * (window.innerWidth - 40 + 40) + 40);
        ;

        //Y Plane (Run on this line)
        monsterArray[mob].y = Math.floor(Math.random() * (window.innerHeight - 40 + 40) + 40);
        ;

        //Left or Right
        monsterArray[mob].scaleX = 90;

        //Start at frame one
        monsterArray[mob].currentFrame = 0;

        stage.addChild(monsterArray[mob]);
    }

    stage.update();
}

function targetPlayer() {
    //Get how many monsters are currently in the array.
    var numMobs = monsterArray.filter(function (value) {
        return value !== undefined;
    }).length;

    for (var mob = 0; mob < numMobs; mob++) {
        // Move Monster to players X
        if (monsterArray[mob].x > playerLocationX) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            monsterArray[mob].scaleX = 1;
            monsterArray[mob].direction = -90;
        }

        if (monsterArray[mob].x < playerLocationX) {
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

        //Move monster to players Y
        if (monsterArray[mob].y > playerLocationY) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            monsterArray[mob].direction = -80;
        }

        if (monsterArray[mob].y < playerLocationY) {
            // We've reached the left side of our screen
            // We need to walk right now
            monsterArray[mob].direction = 80;
        }

        // Moving the sprite based on the direction & the speed
        if (monsterArray[mob].direction == -80) {
            monsterArray[mob].y -= monsterArray[mob].vX;
        } else {
            monsterArray[mob].y += monsterArray[mob].vX;
        }
    }

    // update the stage:
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
