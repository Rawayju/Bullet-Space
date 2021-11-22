var gameSettings = {
    shipSpeed: 1.50,
    shiftControl: 0.55,
    fireRate: 3,
    fireSpeed: 600
}

var config = {
    type: Phaser.AUTO,
    width: 246 * 4,
    height: 156 *4,
    scene: [Scene1, Scene2],
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