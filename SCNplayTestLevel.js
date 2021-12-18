class SCNplayTestLevel extends Phaser.Scene {
    constructor() {
        super("playTestLevel");
    }

    create() {
        this.background = this.add.sprite(config.width / 2,config.height / 2,"background");
        this.background.alpha = 0.8;
        this.background.play("BC", true);
        this.FoR = this.add.sprite(config.width / 2,config.height / 2,"FoR").setScale(1.1).setBlendMode(Phaser.BlendModes.ADD);
        this.FoR.play("FoR", true);
        this.pauseButton = this.add.sprite(config.width - 10,10,"pauseButton");
        this.pauseButton.setInteractive();
        this.pauseButton.alpha = 0.9;

        this.aura = this.physics.add.image(config.width / 2,config.height / 2, "aura").setBlendMode(Phaser.BlendModes.ADD);
        this.spaceship = this.physics.add.image(config.width / 2,config.height / 2, "spaceship");
        this.targetAnim = this.add.sprite(this.aura.x * 99,this.aura.y * 99,"aim").setScale(0);
        this.targetAnim.depth = -1;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys("W,A,S,D");
        this.mouse = this.input.mousePointer;

        this.spaceship.setCollideWorldBounds(true);
        this.spaceship.lastFired = 0;

        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);

        this.asteroids = this.physics.add.group();
        this.gems = this.physics.add.group();

        // Bullets group
        this.bullets = this.add.group();
        this.bullet = 0;
        // Add collisions
        this.physics.add.overlap(this.asteroids, this.bullets, this.bulletHit, null, this);
        this.physics.add.overlap(this.spaceship, this.gems, this.collectGem, null, this);

        this.input.on('gameobjectdown', this.createTarget, this);

        this.spaceship.depth = 50;
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
        this.target = this.spaceship;

        this.background.money = 0;
        this.fireRateLocal = gameSettings.fireRate;
        this.fireSpeedLocal = gameSettings.fireSpeed;
        this.a = 0;
        this.aC = 0;
    }

    update() {

        var angle = Phaser.Math.Angle.Between(this.spaceship.x,this.spaceship.y,this.mouse.x,this.mouse.y);
        this.a = angle + Math.PI/2;
        var angleClick = Phaser.Math.Angle.Between(this.spaceship.x,this.spaceship.y,this.target.x,this.target.y);
        this.aC = angleClick + Math.PI/2;
        this.targetAnim.x = this.target.x;
        this.targetAnim.y = this.target.y;
        if (this.target === this.spaceship) {
            this.targetAnim.depth = -99;
            this.targetAnim.alpha = 0;
        }

        gameSettings.asteroidSpawnRate = Phaser.Math.Between(50, 250);

        this.moveShip();
    
        this.spaceship.lastSpawnedBig += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedMedium += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedSmall += Phaser.Math.Between(0.50, 1.75);

        this.spaceship.lastFired += 1;

        this.createBullet();
        this.createAsteroids();
        this.difficulty();
    }

    moveShip() {
        this.trail = this.add.sprite(Phaser.Math.Between(this.spaceship.x - 3, this.spaceship.x + 3),Phaser.Math.Between(this.spaceship.y - 3, this.spaceship.y + 3),"trail").setBlendMode(Phaser.BlendModes.ADD);
        this.trail.depth = 1;
        this.trail.play('trail', false)
        this.trail.once('animationcomplete', () => {
            this.trail.destroy()
        });

        let vel = 250 * gameSettings.shipSpeed;
        
        if (this.cursors.shift.isDown) {
            vel *= gameSettings.shiftControl;
        }

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.spaceship.setVelocityX(-vel);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.spaceship.setVelocityX(vel);
        } else {
            this.spaceship.setVelocityX(0);
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.spaceship.setVelocityY(-vel);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.spaceship.setVelocityY(vel);
        } else {
            this.spaceship.setVelocityY(0);
        }

        this.aura.x = this.spaceship.x;
        this.aura.y = this.spaceship.y;
    }

    createBullet() {
        if (this.mouse.isDown != true) {
            if (this.cursors.shift.isDown) {
                this.fireRateLocal = gameSettings.fireRate * 0.15;
            } else {
                this.fireRateLocal = gameSettings.fireRate;
            }
            
            if (this.spaceship.lastFired > this.fireRateLocal) {
                if (this.cursors.shift.isDown) {
                    this.fireSpeedLocal = gameSettings.fireSpeed * 0.75;
                } else {
                    this.fireSpeedLocal = gameSettings.fireSpeed * 1.25;
                }
                if (this.bullets.getChildren().length < 200) {
                    if (this.target != this.spaceship) {
                        var bullet = new CreateBullet(this, true, false);
                        var bullet2 = new CreateBullet(this, true, true);
                    } else {
                        var bullet = new CreateBullet(this, false, false);
                        var bullet2 = new CreateBullet(this, false, true);
                    }
                }
            }
        }
        
        for (var i = 0; i < this.bullets.getChildren().length; i++) {
            var bulletHolder = this.bullets.getChildren()[i];
            bulletHolder.setBlendMode(Phaser.BlendModes.ADD);
            
            this.bullet = bulletHolder;
        }
    }

    configBullet(bullet, clickTargetting, tint) {
        if (clickTargetting === true) {
            if (this.target.alpha < 1) {
                this.target = this.spaceship;
                this.physics.moveTo(bullet,Phaser.Math.Between(this.mouse.x - 2, this.mouse.x + 2),Phaser.Math.Between(this.mouse.y - 1, this.mouse.y + 1),Phaser.Math.Between(this.fireSpeedLocal - 17, this.fireSpeedLocal + 17));
                bullet.setRotation(this.a);
            } else {
                this.physics.moveTo(bullet,Phaser.Math.Between(this.target.x - 2, this.target.x + 2),Phaser.Math.Between(this.target.y - 1, this.target.y + 1),Phaser.Math.Between(this.fireSpeedLocal - 17, this.fireSpeedLocal + 17));
                bullet.setRotation(this.aC);
            }
            this.spaceship.setRotation(this.aC);
            this.aura.setRotation(this.aC);
        } else {
            this.physics.moveTo(bullet,Phaser.Math.Between(this.mouse.x - 2, this.mouse.x + 2),Phaser.Math.Between(this.mouse.y - 1, this.mouse.y + 1),Phaser.Math.Between(this.fireSpeedLocal - 17, this.fireSpeedLocal + 17));
            bullet.setRotation(this.a);
            this.spaceship.setRotation(this.a);
            this.aura.setRotation(this.a);
        }

        if (tint === true) {
            var hex = Phaser.Math.Between(0, 666666);
            var hexN = "0x" + hex;
            bullet.setTint(hexN);
        }
        bullet.body.onWorldBounds = true;
        bullet.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.play("hit");
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.once('animationcomplete', () => {
                    this.destroy()
                });
            }
        }, bullet);

    }

    bulletHit(bullet, asteroid) {

        this.explosion = this.add.sprite(Phaser.Math.Between(bullet.x - 5, bullet.x + 5),Phaser.Math.Between(bullet.y - 5, bullet.y + 5),"bullet");
        this.explosion.play('hit', false)
        this.explosion.once('animationcomplete', () => {
            this.explosion.destroy()
        });
        bullet.destroy();
        asteroid.update();
        if (asteroid.alpha === 0) {
            var ASTmedium1 = new CreateMedium(this, asteroid.x, asteroid.y);
            var ASTmedium2 = new CreateMedium(this, asteroid.x, asteroid.y);
            asteroid.destroy();
        } else if (asteroid.alpha === 0.000001) {
            if (Math.random() > 0.5) {
                var ASTsmall1 = new CreateSmall(this, asteroid.x, asteroid.y);
                var ASTsmall2 = new CreateSmall(this, asteroid.x, asteroid.y);
                var ASTsmall3 = new CreateSmall(this, asteroid.x, asteroid.y);
            } else {
                var ASTsmall1 = new CreateSmall(this, asteroid.x, asteroid.y);
                var ASTsmall2 = new CreateSmall(this, asteroid.x, asteroid.y);
            }    
        } else if (asteroid.alpha === 0.0000000001) {
            if (Math.random() > 0.5) {
                var gem = new CreateGem(this, asteroid.x, asteroid.y);
                if (Math.random() > 0.5) {
                    var gem1 = new CreateGem(this, asteroid.x, asteroid.y);
                    if (Math.random() > 0.5) {
                        var gem11 = new CreateGem(this, asteroid.x, asteroid.y);
                        if (Math.random() > 0.5) {
                            var gem111 = new CreateGem(this, asteroid.x, asteroid.y);
                        } else if (Math.random() > 0.9) {
                            var gem1111 = new CreateGem(this, asteroid.x, asteroid.y);
                            var gem2 = new CreateGem(this, asteroid.x, asteroid.y);
                            var gem3 = new CreateGem(this, asteroid.x, asteroid.y);
                            var gem4 = new CreateGem(this, asteroid.x, asteroid.y);
                            var gem5 = new CreateGem(this, asteroid.x, asteroid.y);
                            var gem6 = new CreateGem(this, asteroid.x, asteroid.y);
                        }
                    }
                }
            } else {
                var gem = new CreateGem(this, asteroid.x, asteroid.y);
                var gem2 = new CreateGem(this, asteroid.x, asteroid.y);
            }    
            asteroid.destroy();
        }
    }

    createTarget(pointer, target) {
        if (target.alpha === 0.9) {
            this.scene.launch('pauseShop')
            this.scene.pause();
        } else {
            this.target = target;
            this.targetAnim.destroy();
            this.targetAnim.depth = 2;
            this.targetAnim.alpha = 1;
            this.targetAnim = this.add.sprite(target.x,target.y,"aim");
            this.targetAnim.play("aimStart", true);
            this.targetAnim.on('animationcomplete', function() {
                this.play("aimIdle");
            });
        }
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
        }

        if (this.ewe1 < gameSettings.levelAsteroids.medium) {
            if (this.spaceship.lastSpawnedMedium > gameSettings.asteroidSpawnRate) {
                var ASTmedium = new CreateMedium(this, 0, 0);
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 1);
                this.ewe1 += 1;
            }
        }

        if (this.ewe2 < gameSettings.levelAsteroids.small) {
            if (this.spaceship.lastSpawnedSmall > gameSettings.asteroidSpawnRate) {
                var ASTsmall = new CreateSmall(this, 0, 0);
                gameSettings.asteroidSpawnRate = Phaser.Math.Between(this.spawnRate1, this.spawnRate2);
                this.spaceship.lastSpawnedSmall -= Phaser.Math.Between(gameSettings.handicap * 4, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedBig -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.spaceship.lastSpawnedMedium -= Phaser.Math.Between(gameSettings.handicap * 1, gameSettings.handicap * 6);
                this.ewe2 += 1;
            }
        }
    }

    collectGem(ship, gem) {
        
        if (gem.alpha === 0.9999) {
            this.background.money += 10;
        } else {
            this.background.money += 5;
        }

        gem.destroy();
        console.log(this.background.money);
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
