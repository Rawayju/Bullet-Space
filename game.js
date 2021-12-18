var gameSettings = {
    shipSpeed: 0.475,
    shiftControl: 0.1,
    fireRate: 1,
    fireSpeed: 500,
    asteroidSpawnRate: 1000, // The less the harder
    levelAsteroids: {
        big: 99,
        medium: 99,
        small: 99,
    },
    levelDifficulty: 150, // The less the harder 
    asteroidSpeedBoost: 0, // To do
    handicap: 100, // The less the harder

    DMGsmall: 0,
    DMGmedium: 0,
    DMGbig: 0
}

var config = {
    type: Phaser.AUTO,
    width: 246,
    height: 156,
    scene: [SCNbootGame, SCNstartTestLevel, SCNplayTestLevel, PauseShop],
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