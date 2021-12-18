class PauseShop extends Phaser.Scene {
    constructor() {
        super("pauseShop");
    }

    create() {
        this.background = this.add.sprite(config.width / 2,config.height / 2,"pauseScreen");
        this.returnButton = this.add.sprite(config.width - 10,10,"returnButton").setInteractive();
        this.DMGsmall = this.add.sprite(96,80,"button");
        this.DMGsmall.setInteractive();

        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);

        this.returnButton.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.DMGsmall.on('pointerdown', function (pointer) {
            this.click = true;
        });
    }

    update() {
        if (this.returnButton.click === true) {
            this.scene.resume('playTestLevel');
            this.scene.stop();
        }
        if (this.DMGsmall.click === true) {
            this.DMGsmall.play("buttonPress");
            gameSettings.DMGsmall += 1;
            this.DMGsmall.click = false;
            console.log(gameSettings.DMGsmall);
        }
    }
}