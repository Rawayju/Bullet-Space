class SCNpreStartLevel extends Phaser.Scene {
    constructor() {
        super("preStartLevel");
    }

    create() {
        this.clickhere = this.add.image(config.width / 2,config.height / 2,"click");
        this.clickhere.depth = 100;
        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        
        this.mouse = this.input.mousePointer;
        this.titleScreen = this.add.image(config.width / 2,config.height / 2,"titleScreen");
        this.titleScreen2 = this.add.image(config.width / 2,config.height / 2,"titleScreen2");
        this.introduction = this.add.image(config.width / 2,config.height / 2 + 40,"introduction");
        this.introduction.setInteractive();
        this.input.on('gameobjectdown', this.click, this);
        this.cameras.main.startFollow(this.titleScreen2);
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
        this.clickN = 0;
    }

   update() {
        if (this.mouse.isDown) {
            this.clickhere.setAlpha(0);
            this.fadeout.play("fadeout", true);
        }

        this.tick += 1;
        if (this.tick === 50) {
        this.titleScreen2.y -= 1;
        this.introduction.y += 1;
        } else if (this.tick === 80) {
        this.titleScreen2.y -= 1;
        this.introduction.y -= 1;
        } else if (this.tick === 90) {
        this.titleScreen2.y -= 1;
        this.introduction.y -= 1;
        } else if (this.tick === 150) {
        this.titleScreen2.y += 1;
        this.introduction.y -= 1;
        } else if (this.tick === 170) {
        this.titleScreen2.y += 1;
        this.introduction.y += 1;
        } else if (this.tick === 180) {
        this.titleScreen2.y += 1;
        this.introduction.y += 1;
        this.tick = 0;
        }
    }

    
    click() {
        this.titleScreen2.destroy();
        this.titleScreen.destroy();
        this.introduction.destroy();
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
