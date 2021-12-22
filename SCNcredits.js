class SCNcredits extends Phaser.Scene {
    constructor() {
        super("credits");
    }

    preload() {
        this.load.plugin('rextextplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextplayerplugin.min.js', true);
    }

    create() {
        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);
        
        this.mouse = this.input.mousePointer;
        this.creditsScreen = this.add.image(config.width / 2,config.height / 2,"credits");
        this.creditsScreen2 = this.add.image(config.width / 2,config.height / 2,"creditsWords");
        this.creditsScreen3 = this.add.image(config.width / 2,config.height / 2,"creditsCosmos");
        this.playAgain = this.add.image(config.width - 35,config.height - 10,"creditsPlay");
        this.playAgain.setInteractive();
        this.input.on('gameobjectdown', this.click, this);
        this.tick = 0;
        this.music = this.sound.add("titleScreen");
        var musicConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0       
        }
        this.music.play(musicConfig);
        this.score = this.add.bitmapText(133,27,"pix", 8);
        this.score.text = gameSettings.score;
    }

   update() {

        this.tick += 1;
        if (this.tick === 50) {
        this.playAgain.y -= 1;
        this.creditsScreen3.y += 1;
        } else if (this.tick === 80) {
        this.playAgain.y -= 1;
        this.creditsScreen3.y -= 1;
        } else if (this.tick === 90) {
        this.playAgain.y -= 1;
        this.creditsScreen3.y -= 1;
        } else if (this.tick === 150) {
        this.playAgain.y += 1;
        this.creditsScreen3.y -= 1;
        } else if (this.tick === 170) {
        this.playAgain.y += 1;
        this.creditsScreen3.y += 1;
        } else if (this.tick === 180) {
        this.playAgain.y += 1;
        this.creditsScreen3.y += 1;
        this.tick = 0;
        }
    }

    
    click() {
        this.creditsScreen2.destroy();
        this.creditsScreen3.destroy();
        this.creditsScreen.destroy();
        this.score.destroy();
        this.playAgain.destroy();
        this.music.stop(); 
        this.time.addEvent({
            delay: 1750,
            callback: ()=>{
                this.scene.start("startLevel");
                this.scene.stop();
            },
        })
    }
}
