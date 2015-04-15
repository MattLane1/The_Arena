
function loadBullet() {

    //Get how many bullets are currently in the array. 
    var numBullets = bulletArray.filter(function (value) { return value !== undefined }).length;

    if (numBullets < 100) {
        bulletArray[(numBullets + 1)] = new createjs.Bitmap("assets/images/bullet.png");
        bulletArray[(numBullets + 1)].x = hero.x;
        bulletArray[(numBullets + 1)].y = hero.y;

        //Record which direction the hero was facing when the bullet was fired. Since, you know, bullets go straight. 
        if (playerDirectionArray[0] == true)//right
            bulletDirectionArray[(numBullets + 1)] = 2;

        
        if (playerDirectionArray[1] == true)//down
            bulletDirectionArray[(numBullets + 1)] = 3;

     
        if (playerDirectionArray[2] == true)//up
            bulletDirectionArray[(numBullets + 1)] = 1;

     
        if (playerDirectionArray[3] == true)//left
            bulletDirectionArray[(numBullets + 1)] = 4;

        stage.addChild(bulletArray[(numBullets + 1)]);
    }

    stage.update();
}

function animateBullet() {

    //Get how many bullets are currently in the array. 
    var numBullets = bulletArray.filter(function (value) { return value !== undefined }).length;

    console.log("bullet direction array 0 = " + bulletDirectionArray[0]);
    console.log("bullet direction array 1 = " + bulletDirectionArray[1]);
    console.log("bullet direction array 2 = " + bulletDirectionArray[2]);
    console.log("bullet direction array 3 = " + bulletDirectionArray[3]);

    for (var bullets = 0; bullets <= numBullets; bullets++) {

        if (bulletDirectionArray[bullets] == 2) {//right
            if (bulletArray[bullets].x <= window.innerWidth - 50) {
                bulletArray[bullets].scaleX = 1;
                bulletArray[bullets].x += 30;
                console.log("bullet go right!!");
            }
            else {
                console.log("bullet desolved 1");
                stage.removeChild(bulletArray[bullets]);
                bulletArray.splice(bullets, 1);
                bulletDirectionArray.splice(bullets, 1);
               // bulletArray[bullets] = undefined;
               // bulletDirectionArray[bullets] = undefined;
            }

        }

        if (bulletDirectionArray[bullets] == 4) {//left
            if (bulletArray[bullets].x >= 36) {
                bulletArray[bullets].scaleX = -1;
                bulletArray[bullets].x -= 30;
                console.log("bullet go left!!");
            }
            else {
                console.log("bullet desolved 2");
                stage.removeChild(bulletArray[bullets]);
                bulletArray.splice(bullets, 1);
                bulletDirectionArray.splice(bullets, 1);
               // bulletArray[bullets] = undefined;
                //bulletDirectionArray[bullets] = undefined;
            }
        }

        if (bulletDirectionArray[bullets] == 1) {//up
            if (bulletArray[bullets].y >= 36) {
                bulletArray[bullets].scaleY = 1;
                bulletArray[bullets].y -= 30;
                console.log("bullet go up!!");
            }
            else {
                console.log("bullet desolved 3");
                stage.removeChild(bulletArray[bullets]);
                bulletArray.splice(bullets, 1);
                bulletDirectionArray.splice(bullets, 1);
               // bulletArray[bullets] = undefined;
               // bulletDirectionArray[bullets] = undefined;
            }
        }

        if (bulletDirectionArray[bullets] == 3) {//down
            if (bulletArray[bullets].y <= window.innerHeight - 50) {
                bulletArray[bullets].y += 30;
                bulletArray[bullets].scaleY = -1;
                console.log("bullet go down!!");
            }
            else {
                console.log("bullet desolved 4");
                stage.removeChild(bulletArray[bullets]);
                bulletArray.splice(bullets, 1);
                bulletDirectionArray.splice(bullets, 1);
               // bulletArray[bullets] = undefined;
              //  bulletDirectionArray[bullets] = undefined;
            }
        }
    }
 
    // update the stage:
    stage.update();
}