var first = true;

//This function changes the initial amount of ammo the player has, depending on their chosen difficulty setting.
function setHealth() {
    //Get how many monsters are currently in the array.
    var numMobs = monsterArray.filter(function (value) {
        return value !== undefined;
    }).length;

    switch (difficulty) {
        case 0:
            health = 150;
            break;

        case 1:
            health = 100;
            break;

        case 2:
            health = 50;
            break;
    }
}

function loadPlayer() {
    //  imgMonsterARun.onload = handleImageLoad;
    //  imgMonsterARun.onerror = handleImageError;
    imgHero.src = "assets/images/heroWalk.png";

    // create spritesheet and assign the associated data.
    var spriteSheet = new createjs.SpriteSheet({
        // image to use
        images: [imgHero],
        // width, height & registration point of each sprite
        frames: { width: 46, height: 50, regX: 23, regY: 25 },
        animations: {
            walk: [0, 7, "walk"]
        }
    });

    //Player movement speed
    var speed = 10;

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    hero = new createjs.Sprite(spriteSheet);

    // start playing the first sequence:
    //  if (first == false)
    hero.gotoAndPlay("walk");

    //Hero name and default starting direction
    hero.name = "Hero";
    hero.direction = -90;

    //Speed
    hero.vX = speed;

    //X Plane (Starting pos)
    hero.x = (window.innerWidth / 2);

    //Y Plane (Run on this line)
    hero.y = (window.innerHeight / 2);

    //Left or Right
    hero.scaleX = 1;

    //Start at frame one
    hero.currentFrame = 0;

    stage.addChild(hero);
    stage.update();
}

function animatePlayer() {
    // console.log("movement!" + direction);
    if (playerDirectionArray[0] == true) {
        if (hero.x <= window.innerWidth - 50) {
            hero.scaleX = 1;
            hero.x += hero.vX;
        }
    }

    if (playerDirectionArray[3] == true) {
        if (hero.x >= 36) {
            hero.scaleX = -1;
            hero.x -= hero.vX;
        }
    }

    if (playerDirectionArray[2] == true) {
        if (hero.y >= 36) {
            hero.y -= hero.vX;
        }
    }

    if (playerDirectionArray[1] == true) {
        if (hero.y <= window.innerHeight - 50) {
            hero.y += hero.vX;
        }
    }

    // update the stage:
    stage.update();
}
//# sourceMappingURL=player.js.map
