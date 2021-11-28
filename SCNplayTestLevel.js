class SCNplayTestLevel extends Phaser.Scene {
    constructor() {
        super("playTestLevel");
    }

    create() {
        this.background = this.add.sprite(config.width / 2,config.height / 2,"background");
        this.background.play("BC", true);

        this.aura = this.physics.add.image(config.width / 2,config.height / 2, "aura").setBlendMode(Phaser.BlendModes.ADD);
        this.spaceship = this.physics.add.image(config.width / 2,config.height / 2, "spaceship");

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys("W,A,S,D");
        this.mouse = this.input.mousePointer;

        this.spaceship.setCollideWorldBounds(true);
        this.spaceship.lastFired = 0;

        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);
    }

    update() {
        var angle = Phaser.Math.Angle.Between(this.spaceship.x,this.spaceship.y,this.mouse.x,this.mouse.y);
        this.spaceship.setRotation(angle + Math.PI/2);
        this.aura.setRotation(angle + Math.PI/2);

        this.moveShip();
        this.spaceship.lastFired += 1;
        this.createBullet(angle);
    }

    moveShip() {
        let vel = 250 * gameSettings.shipSpeed;
        
        if (this.cursors.shift.isDown) {
            vel *= gameSettings.shiftControl;
        }

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.spaceship.setVelocityX(-vel);
        }else if(this.cursors.right.isDown || this.wasd.D.isDown) {
            this.spaceship.setVelocityX(vel);
        }else{
            this.spaceship.setVelocityX(0);
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.spaceship.setVelocityY(-vel);
        }else if(this.cursors.down.isDown || this.wasd.S.isDown) {
            this.spaceship.setVelocityY(vel);
        }else{
            this.spaceship.setVelocityY(0);
        }

        this.aura.x = this.spaceship.x;
        this.aura.y = this.spaceship.y;
    }

    createBullet(angle) {
        if (this.mouse.isDown != true) {
            var fireSpeedLocal = gameSettings.fireSpeed
            if (this.spaceship.lastFired > gameSettings.fireRate)
            {
                if (this.cursors.shift.isDown) {
                    fireSpeedLocal = gameSettings.fireSpeed;
                }
                else {
                    fireSpeedLocal = gameSettings.fireSpeed * 1.25;
                }

                this.spaceship.lastFired = 0;
                this.bullet = this.physics.add.sprite(this.spaceship.x,this.spaceship.y,"bullet").setBlendMode(Phaser.BlendModes.ADD);
                this.physics.moveTo(this.bullet,this.mouse.x,this.mouse.y,fireSpeedLocal);
                this.bullet.setRotation(angle + Math.PI/2);

                this.bullet.setCollideWorldBounds(true);
                this.bullet.body.onWorldBounds = true;
                this.bullet.body.world.on('worldbounds', function(body) {
                    if (body.gameObject === this) {
                        this.destroy();
                    }
                }, this.bullet);
            }
        }
    }
}
