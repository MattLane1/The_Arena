function loadCoin() {

    //  imgMonsterARun.onload = handleImageLoad;
    //  imgMonsterARun.onerror = handleImageError;
    imgCoin.src = "assets/images/coin.png";

    // create spritesheet and assign the associated data.
    var spriteSheet = new createjs.SpriteSheet({
        // image to use
        images: [imgCoin],
        // width, height & registration point of each sprite
        frames: { width: 40, height: 43, regX: 20, regY: 20 },
        animations: {
            spin: [0, 4, "spin"]
        }
    });

    //Player movement speed
    var speed = 10;

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    coin = new createjs.Sprite(spriteSheet);

    // start playing the first sequence:
    coin.gotoAndPlay("spin");     //animate

    //Hero name and default starting direction
    coin.name = "Coin";
    coin.direction = -90;

    //Speed
    coin.vX = speed;
    //x plane for coin to appear on
    coin.x = Math.floor(Math.random() * (1000 - 20 + 20)) + 20;
    //Y plane for coin to appear on
    coin.y = Math.floor(Math.random() * (600 - 20 + 20)) + 20;
    //Left or Right
    coin.scaleX = 1;
    //Start at frame one
    coin.currentFrame = 0;

    stage.addChild(coin);
} 