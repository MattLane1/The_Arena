
var winMessage = new createjs.Container();
var looseMessage = new createjs.Container();
var menu = new createjs.Container();
var easyButton;
var mediumButton;
var hardButton;
var postWinMessage;
var postLooseMessage;
var menuButton;
var nextLevelButton;



menu.addChild(
    new createjs.Bitmap("assets/images/Splash.png"),
    easyButton = new createjs.Bitmap("assets/images/easy.png"),
    mediumButton = new createjs.Bitmap("assets/images/Medium.png"),
    hardButton = new createjs.Bitmap("assets/images/Hard.png")
    );

winMessage.addChild(
    postWinMessage = new createjs.Text("You Win! \n Ready for the next level?", "80px Arial", "#FF0000"),
    nextLevelButton = new createjs.Bitmap("assets/images/next_level.png"),
    menuButton = new createjs.Bitmap("assets/images/main_menu.png")
    );

looseMessage.addChild(
    postLooseMessage = new createjs.Text("You Lost!", "80px Arial", "#FF0000"),
    menuButton = new createjs.Bitmap("assets/images/main_menu.png")
    );

