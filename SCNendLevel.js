class SCNendLevel extends Phaser.Scene {
    constructor() {
        super("endLevel");
    }

    preload() {
        this.load.plugin('rextextplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextplayerplugin.min.js', true);
    }

    create() {
        this.background = this.add.sprite(config.width / 2,config.height / 2,"die");
        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);
        this.cursors = this.input.keyboard.createCursorKeys();

        var text = this.add.rexTextPlayer(
            {
                x: config.width / 2 + 26, y: config.height / 2 + 50,
                width: 184, height: 50,

                background: {
                    stroke: 'purple',
                    cornerRadius: 6
                },

                innerBounds: {
                    stroke: 'gray'
                },

                padding: 2,

                style: {
                    fontSize: '12px',
                    font: 'batang',
                    stroke: 'white',
                    strokeThickness: 3,

                    shadowColor: 'purple',
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
[se=getHit][se=breakAsteroid2][wait=3000]
[sprite.ship=spaceship][sprite.ship.x=123][sprite.ship.y=70]
[camera.shake=300][sprite.explosion1=bullet][sprite.explosion1.x=126][sprite.explosion1.y=75][sprite.explosion1.play=shipExplode][se=breakAsteroid1][wait=100][se=breakAsteroid1small]
[camera.flash][wait=1000][sprite.explosion2=bullet][sprite.explosion2.x=120][sprite.explosion2.y=65][sprite.explosion2.play=shipExplode][se=breakAsteroid1medium][wait=200][se=breakAsteroid2medium]
[sprite.spacen=spacen2][sprite.spacen.x=30][sprite.spacen.y=128]
[wait=200][sprite.spacen.play=jamming2][se=whiteNoise]
[shadow]
 ... ... ...[r][wait=2200]
 ... ... ...[r][wait=2200]
 ... ... ...[/shadow][wait=2200]
[sprite.explosion=bullet][sprite.explosion.x=126][sprite.explosion.y=75][sprite.explosion.play=shipExplode][se=breakAsteroid2small][wait=200][se=breakAsteroid2]
[wait=2000]
`;

        var content2 = `
[shadow] That's...[se=speak1][wait=200] all[se=speak2] I...[se=speak3][r][sprite.explosion3=bullet][sprite.explosion3.x=126][sprite.explosion3.y=75][sprite.explosion3.play=shipExplode][se=breakAsteroid1medium][wait=300][se=breakAsteroid1]
[wait=1200] can[se=speak1] do[se=speak2] today[se=speak3]...[/shadow][camera.flash][wait=2200]
`;

        var content3 = `
[shadow] I[se=speak1] did[se=speak2] my[se=speak3] best.[se=speak1][r][wait=1200][se=breakAsteroid1small]
 They'll[se=speak1] be[se=speak2] happy.[se=speak3][/shadow][wait=2200]
`;

        var content4 = `
[shadow] I'll[se=speak1] ask[se=speak2] for[se=speak3][r][wait=1200][se=breakAsteroid1small]
 reinforcements[se=speak1] now.[se=speak2][/shadow][wait=2200]
`;
        
        var content5 = `
[shadow] I[se=speak1] made[se=speak2] dad[se=speak3] proud[se=speak1].[r][wait=2200]
 I[se=speak2] made[se=speak1] [color=#5000FF]Lion[se=speak2][/color] proud[se=speak3][r]
 too[se=speak1].[wait=2200][/shadow]
`;

        var content6 = `
[shadow] I'll[se=speak1] get[se=speak2] to[se=speak3] see[se=speak1] his[se=speak2][r]
 smile...[se=speak3][wait=2200][se=breakAsteroid1small]
[/shadow]
`;

        var content7 = `
[shadow] That's[se=speak1] what[se=speak2] I[se=speak3][r]
 love[se=speak1] most[se=speak2] about[se=speak3] him[se=speak1].[wait=2200][/shadow]
`;

        var content8 = `
[shadow] [se=speak1]G[se=speak1]e[se=speak1]e[se=speak2]z[se=speak3]...[r][wait=2200]
[sprite.spacen.play=ryoukai2][se=breakAsteroid1small][wait=se][se=breakAsteroid2small][wait=200]
[sprite.spacen.play=idle2]
 Get[se=speak1] off[se=speak2] my[se=speak3] mind[se=speak1] now.[se=speak2][wait=800][/shadow]
[sprite.spacen.play=jamming2][se=whiteNoise][wait=2000]
[camera.shake=2000,0.002][se=cosmosAmbience1][wait=camera.shake][camera.flash]
[camera.shake=2000,0.003][se=cosmosAmbience2][wait=camera.shake]
[camera.shake=1000,0.004][se=cosmosAmbience3][wait=camera.shake]
[camera.fadeout]
[sprite.ship.y.to=-2200,700,Cubic][se=lightSpeed]
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
        if (this.background.ewe > 3500) {
            this.scene.start("credits");
        } else {
            this.background.ewe += 1;
        }
        if (this.cursors.shift.isDown) {
            this.scene.start("credits");   
        }
    }
}
