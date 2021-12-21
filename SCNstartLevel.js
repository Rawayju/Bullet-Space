class SCNstartLevel extends Phaser.Scene {
    constructor() {
        super("startLevel");
    }

    preload() {
        this.load.plugin('rextextplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextplayerplugin.min.js', true);
    }

    create() {
        this.mouse = this.input.mousePointer;
        this.click = 0;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.background = this.add.sprite(config.width / 2,config.height / 2,"background").setRotation(Math.PI);
        this.background.play("BC", true);
        this.background1 = this.add.sprite(config.width / 2,config.height / 2 - config.height,"background");
        this.background1.play("BC", true);

        this.screenCover = this.add.image(config.width / 2,config.height / 2,"sCover").setBlendMode(Phaser.BlendModes.SCREEN);
        this.screenCover2 = this.add.image(config.width / 2,config.height / 2 - config.height,"sCover2");
        
        this.multiplyCover = this.add.image(config.width / 2,config.height / 2,"mCover").setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.music = this.sound.add("cutscene");
        var musicConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0       
        }
        this.cameras.main.x = 1000;
        this.cameras.main.y = 1000;
        this.cameras.main.setBounds(0, 0, 1920, 1080);

        var text = this.add.rexTextPlayer(
            {
                x: config.width / 2 + 26, y: config.height / 2 + 50,
                width: 184, height: 50,

                background: {
                    stroke: 'orange',
                    cornerRadius: 6
                },

                innerBounds: {
                    stroke: 'white'
                },

                padding: 2,

                style: {
                    fontSize: '12px',
                    font: 'batang',
                    stroke: 'white',
                    strokeThickness: 3,

                    shadowColor: 'orange',
                    shadowOffsetX: 1,
                    shadowOffsetY: 0,
                    shadowBlur: 1
                },

                wrap: {
                    maxLines: 3,
                    padding: { bottom: 5 },
                },

                typing: {
                    speed: 40,
                },

                sprites: {
                    fade: 500
                }
            }
        )
        
        var content0 = `
        
`;

        var content1 = `
[camera.x=0]
[camera.y=0]
[camera.scroll=0,156]
[sprite.ship=spaceship][sprite.ship.x=123][sprite.ship.y=700][se=lightSpeed]
[sprite.ship.y.to=70,1000,Cubic]
[camera.scroll.to=0,0,2000,Cubic][wait=camera.scroll]
[camera.shake=300][camera.flash][se=breakAsteroid1][wait=se][se=moving1]
[sprite.spacen=spacen][sprite.spacen.x=30][sprite.spacen.y=128]
[wait=600][sprite.spacen.play=jamming][se=whiteNoise]
[shadow]
 ... ... ...[r][wait=600]
 ... ... ...[r][wait=600]
 ... ... ...[/shadow][wait=600]
[sprite.spacen.play=idle][wait=2000]
[sprite.spacen.play=ryoukai][se=speak1][wait=se][se=speak2][wait=500]
[sprite.spacen.play=idle]
`;

        var content2 = `
[shadow] I've[se=speak1] got [se=speak2]this[se=speak3].[r][/shadow]
`;

        var content3 = `
[shadow] First[se=speak1] day[se=speak2] at[se=speak3] work?[se=speak1][r][wait=600]
 I'll[se=speak1] outdo[se=speak2] myself[se=speak3][r] even[se=speak1] more[se=speak2] today[se=speak3]![/shadow]
`;

        var content4 = `
[shadow] Just[se=speak1] activate[se=speak2] the[se=speak3] [color=#4DFF73]field[se=speak1][r]
 of[se=speak2] return[se=speak3][/color] when[se=speak1] [color=#D75C00]debris[se=speak2][/color][r]
 come[se=speak3] near[se=speak1] and[se=speak2] shoot[se=speak3]![sprite.spacen.play=ryoukai][se=speak1][wait=se][se=speak2][wait=600]
 [sprite.spacen.play=idle][/shadow]
`;
        
        var content5 = `
[shadow] I'll[se=speak1] make[se=speak2] dad[se=speak3] proud[se=speak1].[r][wait=600]
 I'll[se=speak2] make [color=#5000FF][se=speak3]Lion[se=speak1][/color] [se=speak2]proud[r]
 too.[se=speak3][wait=600][/shadow]
`;

        var content6 = `
[shadow] I'll[se=speak1] get[se=speak2] to[se=speak3] see[se=speak1] his[se=speak2][r]
 smile...[se=speak3][sprite.spacen.play=ryoukai][se=speak1][wait=se][se=speak2][wait=600]
 [sprite.spacen.play=idle][/shadow]
`;

        var content7 = `
[shadow] Is[se=speak1] [se=speak2]that [se=speak3]what I[se=speak1][r]
 love[se=speak2] most[se=speak3] about[se=speak1] him?[se=speak2][wait=600][/shadow]
`;

        var content8 = `
[shadow] [se=speak1]G[se=speak1]e[se=speak1]e[se=speak2]z[se=speak3]...[r][wait=600]
[sprite.spacen.play=ryoukai][se=breakAsteroid1small][wait=se][se=breakAsteroid2small][wait=200]
[sprite.spacen.play=idle]
 Get[se=speak1] off[se=speak2] my[se=speak3] mind[se=speak1] now.[se=speak2][wait=200][/shadow]
[sprite.spacen.play=jamming][se=whiteNoise][wait=2000]
[camera.shake=2000,0.002][se=cosmosAmbience1][wait=camera.shake][camera.flash]
[camera.shake=2000,0.003][se=cosmosAmbience2][wait=camera.shake]
[camera.shake=1000,0.004][se=cosmosAmbience3][wait=camera.shake]
[camera.fadeout]
[sprite.ship.y.to=-600,700,Cubic][se=lightSpeed]
[camera.scroll.to=0,-500,1000,Cubic]
[wait=3000]
`;
        this.background.ewe = 0;
        this.music.play(musicConfig);
        this.cameras.main.x = 0;
        this.cameras.main.y = 0;
        text.playPromise(content0)
        .then(function () {
            text.playPromise(content1)
            .then(function () {
                text.playPromise(content2)
                .then(function () {
                    text.playPromise(content3)
                    .then(function () {
                        text.playPromise(content4)
                        .then(function () {
                            text.playPromise(content5)
                            .then(function () {
                                text.playPromise(content6)
                                .then(function () {
                                    text.playPromise(content7)
                                    .then(function () {
                                        text.playPromise(content8)
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    update() {
        if (this.background.ewe > 2400) {
            this.scene.start("playLevel");
            this.music.stop();
        } else {
            this.background.ewe += 1;
        }
        if (this.cursors.shift.isDown) {
            this.scene.start("playLevel");   
            this.music.stop();
        }
    }
}
