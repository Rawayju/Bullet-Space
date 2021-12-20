var gameSettings = {
    shipSpeed: 0.475,
    shiftControl: 0.1,
    asteroidSpawnRate: 1000, // The less the harder
    levelAsteroids: {
        big: 99,
        medium: 99,
        small: 99,
    },
    levelDifficulty: 150, // The less the harder 
    asteroidSpeedBoost: 0, // To do
    handicap: 100, // The less the harder

    money: 999990,
    DMGsmall: 0,
    DMGsmallPrice: 250,
    DMGsmallInteres: 0,
    DMGmedium: 0,
    DMGmediumPrice: 125,
    DMGmediumInteres: 0,
    DMGbig: 0,
    DMGbigPrice: 70,
    DMGbigInteres: 0,
    DMGall: 0,
    DMGallPrice: 400,
    DMGallInteres: 0,
    firerate: 5,
    fireratePrice: 1890,
    firerateInteres: 0,
    shiftFireRate: 1,
    shiftFireRatePrice: 1200,
    shiftFireRateInteres: 0,
    fireSpeed: 300,
    fireSpeedPrice: 50,
    fireSpeedInteres: 0,
    health: false,
    healthPrice: 500,
    healthInteres: 0,

    sold1: false,
    sold2: false
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