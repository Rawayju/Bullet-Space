class PauseShop extends Phaser.Scene {
    constructor() {
        super("pauseShop");
    }

    create() {
        this.boopie = this.add.sprite(config.width / 2,config.height / 2,"pauseScreen");
        this.returnButton = this.add.sprite(config.width - 10,10,"returnButton").setInteractive();

        this.moneyDisplay = this.add.bitmapText(83,54,"pix", 8);
        this.moneyDisplay.text = gameSettings.money;

        this.DMGsmall = this.add.sprite(90,80,"button");
        this.DMGsmall.setInteractive();
        this.DMGsmall.timer = 0;
        this.DMGsmallText = this.add.bitmapText(98,77,"pix", 8);
        this.DMGmedium = this.add.sprite(90,89,"button");
        this.DMGmedium.setInteractive();
        this.DMGmedium.timer = 0;
        this.DMGmediumText = this.add.bitmapText(98,86,"pix", 8);
        this.DMGbig = this.add.sprite(90,98,"button");
        this.DMGbig.setInteractive();
        this.DMGbig.timer = 0;
        this.DMGbigText = this.add.bitmapText(98,95,"pix", 8);
        this.DMGall = this.add.sprite((config.width / 2) + 10,127,"button");
        this.DMGall.setInteractive();
        this.DMGall.timer = 0;
        this.DMGallText = this.add.bitmapText((config.width / 2) + 18,124,"pix", 8);

        this.firerate = this.add.sprite(185,69,"button");
        this.firerate.setInteractive();
        this.firerate.timer = 0;
        this.firerateText = this.add.bitmapText(192,66,"pix", 7);
        this.firerateShift = this.add.sprite((config.width / 2) + 10,118,"button");
        this.firerateShift.setInteractive();
        this.firerateShift.timer = 0;
        this.firerateShiftText = this.add.bitmapText((config.width / 2) + 18,115,"pix", 7);
        this.fireSpeed = this.add.sprite(185,78,"button");
        this.fireSpeed.setInteractive();
        this.fireSpeed.timer = 0;
        this.fireSpeedText = this.add.bitmapText(192,75,"pix", 7);

        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);

        this.returnButton.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.DMGsmall.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.DMGmedium.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.DMGbig.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.DMGall.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.firerate.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.fireSpeed.on('pointerdown', function (pointer) {
            this.click = true;
        });
        this.firerateShift.on('pointerdown', function (pointer) {
            this.click = true;
        });
    }

    update() {
        if (this.returnButton.click === true) {
            this.scene.resume('playTestLevel');
            this.scene.stop();
        }

        this.DMGpurchase("big");
        this.DMGpurchase("medium");
        this.DMGpurchase("small");
        this.DMGpurchase("all");
        this.DMGpurchase("shiftFireRate");
        this.DMGpurchase("firerate");
        this.DMGpurchase("firespeed");
    }

    DMGpurchase(size) {
        if (size === "big") {
            var DMG = this.DMGbig;
            var gameDMG = gameSettings.DMGbig;
            var gameDMGPrice = gameSettings.DMGbigPrice;
            this.DMGbigText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.DMGbigInteres;
        } else if (size === "medium") {
            var DMG = this.DMGmedium;
            var gameDMG = gameSettings.DMGmedium;
            var gameDMGPrice = gameSettings.DMGmediumPrice;
            this.DMGmediumText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.DMGmediumInteres;
        } else if (size === "small") {
            var DMG = this.DMGsmall;
            var gameDMG = gameSettings.DMGsmall;
            var gameDMGPrice = gameSettings.DMGsmallPrice;
            this.DMGsmallText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.DMGsmallInteres;

        } else if (size === "shiftFireRate") {
            var DMG = this.firerateShift;
            var gameDMG = gameSettings.shiftFireRate;
            var gameDMGPrice = gameSettings.shiftFireRatePrice;
            this.firerateShiftText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.shiftFireRateInteres;
        } else if (size === "firerate") {
            var DMG = this.firerate;
            var gameDMG = gameSettings.firerate;
            var gameDMGPrice = gameSettings.fireratePrice;
            this.firerateText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.firerateInteres;
        } else if (size === "firespeed") {
            var DMG = this.fireSpeed;
            var gameDMG = gameSettings.fireSpeed;
            var gameDMGPrice = gameSettings.fireSpeedPrice;
            this.fireSpeedText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.fireSpeedInteres;

        } else {
            var DMG = this.DMGall;
            var gameDMG = gameSettings.DMGall;
            var gameDMGPrice = gameSettings.DMGallPrice;
            this.DMGallText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.DMGallInteres;
        }

        if (DMG.click === true) {
            if (gameSettings.money < gameDMGPrice) {
                DMG.setTint(0xFF0000); 
                if (DMG.timer > 20) {
                    DMG.setTint(0xFFFFFF);
                    DMG.timer = 0;
                    DMG.click = false;
                }
                DMG.timer += 1;
            } else {
                DMG.play("buttonPress");
                gameSettings.money = Phaser.Math.RoundTo(gameSettings.money - gameDMGPrice, 0);
                if (size === "firerate") {
                    if (gameSettings.fireratePrice > 2000) {
                        gameDMGPrice = 0;
                        DMG.destroy();
                    }
                    gameDMG -= 1;    
                } else if (size === "shiftFireRate") {
                    if (gameSettings.shiftFireRatePrice > 1600) {
                        gameDMGPrice = 0;
                        DMG.destroy();
                    }
                    gameDMG += 1;    
                } else if (size === "firespeed") {
                    gameDMG += 50;    
                } else {
                    gameDMG += 1;
                }
                DMG.click = false;
                gameDMGInteres += 0.05;
                gameDMGPrice = Phaser.Math.RoundTo(gameDMGPrice * (1.50 + gameDMGInteres), 0);
            }
        }

        if (size === "big") {
            gameSettings.DMGbig = gameDMG;
            gameSettings.DMGbigPrice = gameDMGPrice;
            gameSettings.DMGbigInteres = gameDMGInteres;
        } else if (size === "medium") {
            gameSettings.DMGmedium = gameDMG;
            gameSettings.DMGmediumPrice = gameDMGPrice;
            gameSettings.DMGmediumInteres = gameDMGInteres;
        } else if (size === "small") {
            gameSettings.DMGsmall = gameDMG;
            gameSettings.DMGsmallPrice = gameDMGPrice;
            gameSettings.DMGsmallInteres = gameDMGInteres;

        } else if (size === "shiftFireRate") {
            gameSettings.shiftFireRate = gameDMG;
            gameSettings.shiftFireRatePrice = gameDMGPrice;
            gameSettings.shiftFireRateInteres = gameDMGInteres;
        } else if (size === "firerate") {
            gameSettings.firerate = gameDMG;
            gameSettings.fireratePrice = gameDMGPrice;
            gameSettings.firerateInteres = gameDMGInteres;
        } else if (size === "firespeed") {
            gameSettings.fireSpeed = gameDMG;
            gameSettings.fireSpeedPrice = gameDMGPrice;
            gameSettings.fireSpeedInteres = gameDMGInteres;

        } else {
            gameSettings.DMGall = gameDMG;
            gameSettings.DMGallPrice = gameDMGPrice;
            gameSettings.DMGallInteres = gameDMGInteres;
        }
    }
}
