var gameSettings = {
    shipSpeed: 0.375,
    shiftControl: 0.5,
    fireRate: 3,
    fireSpeed: 200
}

var config = {
    type: Phaser.AUTO,
    width: 246,
    height: 156,
    scene: [SCNbootGame, SCNstartTestLevel, SCNplayTestLevel],
    pixelArt: true,
    render: {
        antialias: true,
        pixelArt: true,
        roundPixels: false
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);