var gameSettings = {
    shipSpeed: 0.475,
    shiftControl: 0.5,
    fireRate: 1.5,
    fireSpeed: 500,
    asteroidSpawnRate: 300,
    levelAsteroids: {
        big: 20,
        medium: 20,
        small: 20,
    },
    levelDifficulty: 100,
    handicap: 100
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