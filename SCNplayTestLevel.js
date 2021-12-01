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
        this.spaceship.lastSpawnedBig = 0;
        this.spaceship.lastSpawnedMedium = 0;
        this.spaceship.lastSpawnedSmall = 0;
        this.ewe = 0;
        this.ewe1 = 0;
        this.ewe2 = 0;
        gameSettings.asteroidSpawnRate = Phaser.Math.Between(50, 250);
        this.dif = 0;
        this.speedTick = 0;
        this.spawnRate1 = 150;
        this.spawnRate2 = 500;
    }

    update() {
        var angle = Phaser.Math.Angle.Between(this.spaceship.x,this.spaceship.y,this.mouse.x,this.mouse.y);
        this.spaceship.setRotation(angle + Math.PI/2);
        this.aura.setRotation(angle + Math.PI/2);

        this.moveShip();
    
        this.spaceship.lastSpawnedBig += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedMedium += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedSmall += Phaser.Math.Between(0.50, 1.75);
        this.createAsteroids();

        this.spaceship.lastFired += 1;
        this.createBullet(angle);
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

    createAsteroids() {
        if (this.ewe < gameSettings.levelAsteroids.big) {
            if (this.spaceship.lastSpawnedBig > gameSettings.asteroidSpawnRate) {
                this.createBig();
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.ewe += 1;
            }
        }

        if (this.ewe1 < gameSettings.levelAsteroids.medium) {
            if (this.spaceship.lastSpawnedMedium > gameSettings.asteroidSpawnRate) {
                this.createMedium();
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.ewe1 += 1;
            }
        }

        if (this.ewe2 < gameSettings.levelAsteroids.small) {
            if (this.spaceship.lastSpawnedSmall > gameSettings.asteroidSpawnRate) {
                this.createSmall();
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.ewe2 += 1;
            }
        }
    }

    createBig() {
        
        var big = this.physics.add.image(16, 16, "ASTbig");
        this.asteroids.add(big);
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                big.setRandomPosition(0, 5, game.config.width, 10);
            } else {
                big.setRandomPosition(0, game.config.height + 5, game.config.width, game.config.height + 10);
            }
        } else {
            if (Math.random() > 0.5) {
                big.setRandomPosition(5, game.config.height, 10, 0);
            } else {
                big.setRandomPosition(game.config.width + 5, game.config.height, game.config.width + 10, 0);
            }
        }

        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(10, 30);
        } else {
            var randomX = Phaser.Math.Between(-30, -10);
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(10, 30);
        } else {
            var randomY = Phaser.Math.Between(-30, -10);
        }
        big.setVelocity(randomX, randomY);
        big.setCollideWorldBounds(true);
        big.setBounce(1);
    }

    createMedium() {
        
        var medium = this.physics.add.sprite(16, 16, "ASTmedium");
        this.asteroids.add(medium);
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                medium.setRandomPosition(0, 5, game.config.width, 10);
            } else {
                medium.setRandomPosition(0, game.config.height + 5, game.config.width, game.config.height + 10);
            }
        } else {
            if (Math.random() > 0.5) {
                medium.setRandomPosition(5, 0, 10, game.config.height);
            } else {
                medium.setRandomPosition(game.config.width + 5, 0, game.config.width + 10, game.config.height);
            }
        }
    
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                medium.play("medium1");
            } else {
                medium.play("medium2");
            }
        } else {
            if (Math.random() > 0.5) {
                medium.play("medium3");
            } else {
                medium.play("medium4");
            }
        }

        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(15, 50);
        } else {
            var randomX = Phaser.Math.Between(-50, -15);
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(15, 50);
        } else {
            var randomY = Phaser.Math.Between(-50, -15);
        }
        medium.setVelocity(randomX, randomY);
        medium.setCollideWorldBounds(true);
        medium.setBounce(1);
    }

    createSmall() {

        var small = this.physics.add.sprite(16, 16, "ASTsmall");
        this.asteroids.add(small);
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                small.setRandomPosition(0, 5, game.config.width, 10);
            } else {
                small.setRandomPosition(0, game.config.height + 5, game.config.width, game.config.height + 10);
            }
        } else {
            if (Math.random() > 0.5) {
                small.setRandomPosition(5, game.config.height, 10, 0);
            } else {
                small.setRandomPosition(game.config.width + 5, game.config.height, game.config.width + 10, 0);
            }
        }
    
        if (Math.random() > 0.5) {
            small.play("small1");
        } else {
            small.play("small2");
        }

        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(20, 60);
        } else {
            var randomX = Phaser.Math.Between(-60, -20);
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(20, 60);
        } else {
            var randomY = Phaser.Math.Between(-60, -20);
        }
        small.setVelocity(randomX, randomY);
        small.setCollideWorldBounds(true);
        small.setBounce(1);
    }

    difficulty() {
        this.dif += 1;
        this.speedTick += 1;
        if (gameSettings.handicap > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 50) {
                gameSettings.handicap -= 2;
                this.dif = 0;
            } else {
                gameSettings.handicap -= 1;
                this.dif = 0;
            }
        }

        if (gameSettings.asteroidSpawnRate > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 50) {
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
