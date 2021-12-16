class SCNplayTestLevel extends Phaser.Scene {
    constructor() {
        super("playTestLevel");
    }

    create() {
        this.background = this.add.sprite(config.width / 2,config.height / 2,"background");
        this.background.play("BC", true);
        this.FoR = this.add.sprite(config.width / 2,config.height / 2,"FoR").setScale(1.1).setBlendMode(Phaser.BlendModes.ADD);
        this.FoR.play("FoR", true);

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

        this.asteroids = this.physics.add.group();

        // Bullets group
        this.bullets = this.add.group();
        this.bullet = 0;
        // Add collisions
        this.physics.add.overlap(this.asteroids, this.bullets, function(bullet, asteroid) {
            bullet.destroy();
            asteroid.update();
        });

        this.spaceship.lastSpawnedBig = 0;
        this.spaceship.lastSpawnedMedium = 0;
        this.spaceship.lastSpawnedSmall = 0;
        this.ewe = 0;
        this.ewe1 = 0;
        this.ewe2 = 0;
        this.dif = 0;
        this.speedTick = 0;
        this.spawnRate1 = 150;
        this.spawnRate2 = 500;

        this.fireRateLocal = gameSettings.fireRate;
        this.fireSpeedLocal = gameSettings.fireSpeed;
        this.a = 0;
    }

    update() {

        var angle = Phaser.Math.Angle.Between(this.spaceship.x,this.spaceship.y,this.mouse.x,this.mouse.y);
        this.a = angle + Math.PI/2;
        gameSettings.asteroidSpawnRate = Phaser.Math.Between(50, 250);
        this.spaceship.setRotation(this.a);
        this.aura.setRotation(this.a);

        this.moveShip();
    
        this.spaceship.lastSpawnedBig += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedMedium += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedSmall += Phaser.Math.Between(0.50, 1.75);

        this.spaceship.lastFired += 1;

        // Create bullet
        if (this.mouse.isDown != true) {
            if (this.cursors.shift.isDown) {
                this.fireRateLocal = gameSettings.fireRate * 1.45;
            } else {
                this.fireRateLocal = gameSettings.fireRate;
            }
            
            if (this.spaceship.lastFired > this.fireRateLocal) {
                if (this.cursors.shift.isDown) {
                    this.fireSpeedLocal = gameSettings.fireSpeed;
                } else {
                    this.fireSpeedLocal = gameSettings.fireSpeed * 1.25;
                }
                if (this.bullets.getChildren().length < 30) {
                    var bullet = new CreateBullet(this);
                }
            }
        }
        
        for (var i = 0; i < this.bullets.getChildren().length; i++) {
            var bulletHolder = this.bullets.getChildren()[i];
            bulletHolder.setBlendMode(Phaser.BlendModes.ADD);
            
            this.bullet = bulletHolder;
        }
        
        // Manage asteroids
        this.createAsteroids();
        this.difficulty();
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

    configBullet(bullet) {
        this.physics.moveTo(bullet,this.mouse.x,this.mouse.y,this.fireSpeedLocal);
        bullet.setRotation(this.a);

        bullet.body.onWorldBounds = true;
        bullet.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.destroy();
            }
        }, bullet);

    }

    createAsteroids() {
        if (this.ewe < gameSettings.levelAsteroids.big) {
            if (this.spaceship.lastSpawnedBig > gameSettings.asteroidSpawnRate) {
                var ASTbig = new CreateBig(this);

                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.ewe += 1;
            } 
        } else {
            console.log("big complete!");
        }

        if (this.ewe1 < gameSettings.levelAsteroids.medium) {
            if (this.spaceship.lastSpawnedMedium > gameSettings.asteroidSpawnRate) {
                var ASTmedium = new CreateMedium(this);
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.ewe1 += 1;
            }
        } else {
            console.log("medium complete!");
        }

        if (this.ewe2 < gameSettings.levelAsteroids.small) {
            if (this.spaceship.lastSpawnedSmall > gameSettings.asteroidSpawnRate) {
                var ASTsmall = new CreateSmall(this);
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.ewe2 += 1;
            }
        } else {
            console.log("small complete!");
        }
    }

    destroyedBig() {
        var ASTmedium1 = new CreateMedium(this);
        var ASTmedium2 = new CreateMedium(this);
    }

    difficulty() {
        this.dif += 1;
        this.speedTick += 1;
        if (gameSettings.handicap > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 200) {
                gameSettings.handicap -= 2;
                this.dif = 0;
            } else {
                gameSettings.handicap -= 1;
                this.dif = 0;
            }
        }

        if (gameSettings.asteroidSpawnRate > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 200) {
                gameSettings.asteroidSpawnRate -= 2;
                this.dif = 0;
            } else {
                gameSettings.asteroidSpawnRate -= 1;
                this.dif = 0;
            }
        }

        if (this.speedTick > gameSettings.levelDifficulty * 4) {
            gameSettings.asteroidSpeedBoost += 1;
            this.speedTick = 0;
        }
    }
}
