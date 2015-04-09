
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