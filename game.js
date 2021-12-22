var gameSettings = {
    shipSpeed: 0.475,
    shiftControl: 0.1,
    asteroidSpawnRate: 1200, // The less the harder
    levelAsteroids: {
        big: 999,
        medium: 999,
        small: 999,
    },
    levelDifficulty: 200, // The less the harder 
    handicap: 130, // The less the harder

    score: 0,
    money: 0,
    DMGsmall: 0,
    DMGsmallPrice: 250,
    DMGsmallInteres: 0.1,
    DMGmedium: 0,
    DMGmediumPrice: 125,
    DMGmediumInteres: 0.1,
    DMGbig: 0,
    DMGbigPrice: 70,
    DMGbigInteres: 0.1,
    DMGall: 0,
    DMGallPrice: 400,
    DMGallInteres: 0.1,
    firerate: 5,
    fireratePrice: 1890,
    firerateInteres: 0.1,
    shiftFireRate: 1,
    shiftFireRatePrice: 1200,
    shiftFireRateInteres: 0.1,
    fireSpeed: 300,
    fireSpeedPrice: 50,
    fireSpeedInteres: 0.1,
    health: false,
    healthPrice: 500,
    healthInteres: 0.1,

    sold1: false,
    sold2: false
}

var config = {
    type: Phaser.AUTO,
    width: 246,
    height: 156,
    scene: [SCNbootGame, SCNpreStartLevel, SCNstartLevel, SCNplayLevel, PauseShop, SCNendLevel, SCNcredits],
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