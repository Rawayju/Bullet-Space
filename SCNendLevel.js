class SCNendLevel extends Phaser.Scene {
    constructor() {
        super("endLevel");
    }

    preload() {
        this.load.plugin('rextextplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextplayerplugin.min.js', true);
    }

    create() {
        this.mouse = this.input.mousePointer;

        this.background = this.add.sprite(config.width / 2,config.height / 2,"background").setRotation(Math.PI);
        this.background.play("BC", true);
        this.background1 = this.add.sprite(config.width / 2,config.height / 2 - config.height,"background");
        this.background1.play("BC", true);

        this.screenCover = this.add.image(config.width / 2,config.height / 2,"sCover").setBlendMode(Phaser.BlendModes.SCREEN);
        this.screenCover2 = this.add.image(config.width / 2,config.height / 2 - config.height,"sCover2");
        
        this.multiplyCover = this.add.image(config.width / 2,config.height / 2,"mCover").setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.multiplyCover2 = this.add.image(config.width / 2,config.height / 2,"mCover").setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.multiplyCover3 = this.add.image(config.width / 2,config.height / 2,"mCover").setBlendMode(Phaser.BlendModes.MULTIPLY);

        this.death1 = this.sound.add("death1", {volume: 0.5});
        this.death2 = this.sound.add("death2");

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
        
        var content = `
[camera.scroll=0,156]
[sprite.ship=spaceship][sprite.ship.x=123][sprite.ship.y=700]
[sprite.ship.y.to=70,1000,Cubic]
[camera.scroll.to=0,0,2000,Cubic][wait=camera.scroll]
[camera.shake=300][camera.flash][wait=1000]
[sprite.spacen=spacen][sprite.spacen.x=30][sprite.spacen.y=128]
[wait=600][sprite.spacen.play=jamming]
[shadow]
 ... ... ...[r][wait=600]
 ... ... ...[r][wait=600]
 ... ... ...[/shadow][wait=600]
[sprite.spacen.play=idle][wait=2000]
[sprite.spacen.play=ryoukai][wait=500]
[sprite.spacen.play=idle]
`;

        var content2 = `
[shadow] I've got this.[r][/shadow]
`;

        var content3 = `
[shadow] First day at work?[r][wait=600]
 I'll outdo myself[r] even more today![/shadow]
`;

        var content4 = `
[shadow] Just activate the [color=#4DFF73]field[r]
 of return[/color] when [color=#D75C00]debris[/color][r]
 come near and shoot![sprite.spacen.play=ryoukai][wait=600]
 [sprite.spacen.play=idle][/shadow]
`;
        
        var content5 = `
[shadow] I'll make dad proud.[r][wait=600]
 I'll make [color=#5000FF]Lion[/color] proud[r]
 too.[wait=600][/shadow]
`;

        var content6 = `
[shadow] I'll get to see his[r]
 smile...[sprite.spacen.play=ryoukai][wait=600]
 [sprite.spacen.play=idle][/shadow]
`;

        var content7 = `
[shadow] Is that what I[r]
 love most about him?[wait=600][/shadow]
`;

        var content8 = `
[shadow] Geez...[r][wait=600]
[sprite.spacen.play=ryoukai][wait=200]
[sprite.spacen.play=idle]
 Get off my mind now.[wait=200][/shadow]
[sprite.spacen.play=jamming][wait=2000]
[camera.shake=2000,0.002][wait=camera.shake][camera.flash]
[camera.shake=2000,0.003][wait=camera.shake]
[camera.shake=1000,0.004][wait=camera.shake]
[camera.fadeout]
[sprite.ship.y.to=-600,700,Cubic]
[camera.scroll.to=0,-500,1000,Cubic]
[wait=3000]
`;

        text.playPromise(content)
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

        this.background.ewe = 0;
    }

    update() {
        if (this.background.ewe > 2400) {
            this.scene.start("playTestLevel");
        } else {
            this.background.ewe += 1;
        }

        if (this.mouse.isDown === true) {
            this.scene.start("playTestLevel");
        }
    }
}
