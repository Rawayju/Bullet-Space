class PauseShop extends Phaser.Scene {
    constructor() {
        super("pauseShop");
    }

    create() {
        this.boopie = this.add.sprite(config.width / 2,config.height / 2,"pauseScreen");
        this.returnButton = this.add.sprite(config.width - 10,10,"returnButton").setInteractive();

        this.moneyDisplay = this.add.bitmapText(83,54,"pix", 8);

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

        this.firerateShift = this.add.sprite((config.width / 2) + 10,118,"button");
        this.firerateShift.setInteractive();
        this.firerateShift.timer = 0;
        this.firerateShiftText = this.add.bitmapText((config.width / 2) + 18,115,"pix", 7);
        this.firerate = this.add.sprite(185,69,"button");
        this.firerate.setInteractive();
        this.firerate.timer = 0;
        this.firerateText = this.add.bitmapText(192,66,"pix", 7);
        this.fireSpeed = this.add.sprite(185,78,"button");
        this.fireSpeed.setInteractive();
        this.fireSpeed.timer = 0;
        this.fireSpeedText = this.add.bitmapText(192,75,"pix", 7);
        this.health = this.add.sprite(185,87,"button");
        this.health.setInteractive();
        this.health.timer = 0;
        this.healthText = this.add.bitmapText(192,84,"pix", 7);

        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);

        // Tips
        var random = Math.random();
        if (random < 0.25) {
            this.tip = this.add.sprite(config.width / 2,config.height / 2,"tip1");
        } else if (random < 0.50) {
            this.tip = this.add.sprite(config.width / 2,config.height / 2,"tip2");
        } else if (random < 0.75) {
            this.tip = this.add.sprite(config.width / 2,config.height / 2,"tip3");
        } else {
            this.tip = this.add.sprite(config.width / 2,config.height / 2,"tip4");
        }

        // Sounds
        this.buy = this.sound.add("buy");
        this.superBuy = this.sound.add("breakAsteroid1small");
        this.menuing = this.sound.add("menuing");
        this.shop = this.sound.add("shop", {volume: 2});
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0       
        }
        this.shop.play(musicConfig);

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
        this.health.on('pointerdown', function (pointer) {
            this.click = true;
        });
    }

    update() {
        if (this.returnButton.click === true) {
            this.shop.pause();
            this.scene.resume('playTestLevel');
            this.scene.stop();
        }

        if (gameSettings.sold1 === true) {
            this.firerate.setAlpha(0);
            this.firerateText.text = 0;
        }
        if (gameSettings.sold2 === true) {
            this.firerateShift.setAlpha(0);
            this.firerateShiftText.text = 0;
        }
        this.DMGpurchase("big");
        this.DMGpurchase("medium");
        this.DMGpurchase("small");
        this.DMGpurchase("all");
        this.DMGpurchase("shiftFireRate");
        this.DMGpurchase("firerate");
        this.DMGpurchase("firespeed");
        this.DMGpurchase("health");
        this.moneyDisplay.text = gameSettings.money;
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
        } else if (size === "health") {
            var DMG = this.health;
            var gameDMG = gameSettings.health;
            var gameDMGPrice = gameSettings.healthPrice;
            this.healthText.text = gameDMGPrice;
            var gameDMGInteres = gameSettings.healthInteres;

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
                this.menuing.play();
                if (DMG.timer > 20) {
                    DMG.setTint(0xFFFFFF);
                    DMG.timer = 0;
                    DMG.click = false;
                }
                DMG.timer += 1;
            } else {
                DMG.play("buttonPress");
                gameSettings.money = Phaser.Math.RoundTo(gameSettings.money - gameDMGPrice, 0);
                if (size === "firerate" && DMG.alpha != 0) {
                    if (gameSettings.fireratePrice > 2000) {
                        gameDMGPrice = 0;
                        gameSettings.sold1 = true;
                        this.superBuy.play();
                    }
                    gameDMG -= 1;    
                } else if (size === "shiftFireRate" && DMG.alpha != 0) {
                    if (gameSettings.shiftFireRatePrice > 1600) {
                        gameDMGPrice = 0;
                        gameSettings.sold2 = true;
                        this.superBuy.play();
                    }
                    gameDMG += 1;    
                } else if (size === "firespeed") {
                    gameDMG += 50;  
                } else if (size === "health") {
                    gameDMG = true; 
                    DMG.destroy();
                    this.healthText.setAlpha(0);
                    this.superBuy.play();
                } else {
                    gameDMG += 1;
                }
                this.buy.play();
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
        } else if (size === "health") {
            gameSettings.health = gameDMG;
            gameSettings.healthPrice = gameDMGPrice;
            gameSettings.healthInteres = gameDMGInteres;

        } else {
            gameSettings.DMGall = gameDMG;
            gameSettings.DMGallPrice = gameDMGPrice;
            gameSettings.DMGallInteres = gameDMGInteres;
        }
    }
}
