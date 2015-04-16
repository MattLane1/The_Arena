
function loadSounds() {
    createjs.Sound.registerSound({ id: "sound_bang", src: "assets/audio/bang.wav" });
    createjs.Sound.registerSound({ id: "sound_coin", src: "assets/audio/coin.wav" });
    createjs.Sound.registerSound({ id: "sound_HDeath", src: "assets/audio/heroDeath.wav" });
    createjs.Sound.registerSound({ id: "sound_MDeath", src: "assets/audio/mobDeath.wav" });
    createjs.Sound.registerSound({ id: "sound_Monster", src: "assets/audio/monster.wav" });
    createjs.Sound.registerSound({ id: "sound_Pain", src: "assets/audio/Pain.wav" });
}

function handleFileLoad(event) {
    // A sound has been preloaded.
    console.log("Preloaded:", event.id, event.src);
}