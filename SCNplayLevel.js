class SCNplayLevel extends Phaser.Scene {
    constructor() {
        super("playLevel");
    }

    create() {
        // Background
        this.background = this.add.sprite(config.width / 2,config.height / 2,"background");
        this.background.alpha = 0.8;
        this.background.play("BC", true);
        this.FoR = this.add.sprite(config.width / 2,config.height / 2,"FoR").setScale(1.1).setBlendMode(Phaser.BlendModes.ADD);
        this.FoR.play("FoR", true);
        this.pauseButton = this.add.sprite(15,10,"pauseButton");
        this.pauseButton.setInteractive();
        this.pauseButton.alpha = 0.9;
        this.pauseButton.depth = 95;
        this.moneyDisplay = this.add.bitmapText(25,5,"pix", 8);
        this.moneyDisplay.depth = 97;
        this.shopIcon = this.add.sprite(16,23,"shop");
        this.shopIcon.depth = 96;
        this.fadeout = this.add.sprite(config.width / 2,config.height / 2,"fadeout").setScale(500).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.fadeout.depth = 99;
        this.fadeout.play("fadeout", true);

        // Player
        this.aura = this.physics.add.image(config.width / 2,config.height / 2, "aura").setBlendMode(Phaser.BlendModes.ADD);
        this.spaceship = this.physics.add.image(config.width / 2,config.height / 2, "spaceship");
        this.spaceship.setCollideWorldBounds(true);
        this.spaceship.lastFired = 0;
        this.spaceship.health = 12;
        this.spaceship.depth = 50;
        this.spaceship.lastSpawnedBig = 0;
        this.spaceship.lastSpawnedMedium = 0;
        this.spaceship.lastSpawnedSmall = 0;
        this.hurtBox = this.physics.add.image(this.spaceship.x, this.spaceship.y, "hurtBox");
        this.hurtBox.a = 0;

        this.targetAnim = this.add.sprite(this.aura.x * 99,this.aura.y * 99,"aim").setScale(0);
        this.targetAnim.depth = -1;
        this.target = this.spaceship;
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys("W,A,S,D");
        this.mouse = this.input.mousePointer;
        this.input.on('gameobjectdown', this.createTarget, this);

        // Groups
        this.asteroids = this.physics.add.group();
        this.gems = this.physics.add.group();
        this.bullets = this.add.group();
        this.bullet = 0;

        // Collisions
        this.physics.add.overlap(this.asteroids, this.bullets, this.bulletHit, null, this);
        this.physics.add.overlap(this.spaceship, this.gems, this.collectGem, null, this);
        this.physics.add.overlap(this.hurtBox, this.asteroids, this.damageShip, null, this);

        // Variables
        this.addSoundsHealth();
        this.ewe = 0;
        this.ewe1 = 0;
        this.ewe2 = 0;
        this.dif = 0;
        this.speedTick = 0;
        this.spawnRate1 = 150;
        this.spawnRate2 = 500;
        this.cosmosTick = 0;
        this.bulletTime = 0;  
        this.musicTick = 0;
        this.invencibilidadTick = 0;
        this.invencibilidad1 = false;
        this.invencibilidad2 = false;
        this.fireRateLocal = gameSettings.firerate;
        this.fireSpeedLocal = gameSettings.fireSpeed;
        this.a = 0;
        this.aC = 0;
    }

    addSoundsHealth() {
        this.breakAsteroid1 = this.sound.add("breakAsteroid1");
        this.breakAsteroid1medium = this.sound.add("breakAsteroid1medium");
        this.breakAsteroid1small = this.sound.add("breakAsteroid1small");
        this.breakAsteroid2 = this.sound.add("breakAsteroid2");
        this.breakAsteroid2medium = this.sound.add("breakAsteroid2medium");
        this.breakAsteroid2small = this.sound.add("breakAsteroid2small");
        this.cosmosAmbience1 = this.sound.add("cosmosAmbience1");
        this.cosmosAmbience2 = this.sound.add("cosmosAmbience2");
        this.cosmosAmbience3 = this.sound.add("cosmosAmbience3");
        this.hittingAsteroid = this.sound.add("hittingAsteroid");
        this.menuing = this.sound.add("menuing", {volume: 1.5});
        this.moneyGrab = this.sound.add("moneyGrab");
        this.moving1 = this.sound.add("moving1");
        this.moving2 = this.sound.add("moving2");
        this.shooting1 = this.sound.add("shooting1", {volume: 0.3});
        this.shooting2 = this.sound.add("shooting2", {volume: 0.3});
        this.shooting3 = this.sound.add("shooting3", {volume: 0.3});
        this.shooting4 = this.sound.add("shooting4", {volume: 0.3});
        this.getHit = this.sound.add("getHit", {volume: 1.5});

        this.music = this.sound.add("gameplay");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0       
        }
        this.music.play(musicConfig);

        this.healthBars = this.physics.add.group();
        this.healthBars[0] = this.add.image(config.width - 38,config.height - 6,"health0").setAlpha(0).setDepth(94);
        this.healthBars[1] = this.add.image(config.width - 38,config.height - 6,"health1").setAlpha(0).setDepth(94);
        this.healthBars[2] = this.add.image(config.width - 38,config.height - 6,"health2").setAlpha(0).setDepth(94);
        this.healthBars[3] = this.add.image(config.width - 38,config.height - 6,"health3").setAlpha(0).setDepth(94);
        this.healthBars[4] = this.add.image(config.width - 38,config.height - 6,"health4").setAlpha(0).setDepth(94);
        this.healthBars[5] = this.add.image(config.width - 38,config.height - 6,"health5").setAlpha(0).setDepth(94);
        this.healthBars[6] = this.add.image(config.width - 38,config.height - 6,"health6").setAlpha(0).setDepth(94);
        this.healthBars[7] = this.add.image(config.width - 38,config.height - 6,"health7").setAlpha(0).setDepth(94);
        this.healthBars[8] = this.add.image(config.width - 38,config.height - 6,"health8").setAlpha(0).setDepth(94);
        this.healthBars[9] = this.add.image(config.width - 38,config.height - 6,"health9").setAlpha(0).setDepth(94);
        this.healthBars[10] = this.add.image(config.width - 38,config.height - 6,"health10").setAlpha(0).setDepth(94);
        this.healthBars[11] = this.add.image(config.width - 38,config.height - 6,"health11").setAlpha(0).setDepth(94);
        this.healthBars[12] = this.add.image(config.width - 38,config.height - 6,"health12").setAlpha(1).setDepth(94);
        this.healthBars[13] = this.add.image(config.width - 38,config.height - 6,"healthStrike").setAlpha(0).setDepth(94);
    }

    update() {
        
        this.music.resume();

        this.randomAmbientNoisesManager();

        // Declare more variables
        this.moneyDisplay.text = gameSettings.money;
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

        // Check for ship's status
        if (this.invencibilidad1 === true) {
            this.invencibilidadTick += 1;
            if (this.invencibilidadTick > 100) {
                this.invencibilidadTick = 0;
                this.spaceship.setTint(0xFFFFFF);
                this.invencibilidad1 = false;
            }
            if (this.invencibilidadTick > 53) {
                this.healthBars[this.spaceship.health].setTint(0xFFFFFF);
            }
        }
        
        this.invencibilidadTick2 += 1;
        if(gameSettings.health===true){this.damageShip(this.spaceship, this.asteroids, true);}
        this.moveShip();
        this.createBullet();
        this.createAsteroids();
        this.difficulty();
    }

    moveShip() {
        this.hurtBox.x = this.spaceship.x;
        this.hurtBox.y = this.spaceship.y;
        this.trail = this.add.sprite(Phaser.Math.Between(this.spaceship.x - 3, this.spaceship.x + 3),Phaser.Math.Between(this.spaceship.y - 3, this.spaceship.y + 3),"trail").setBlendMode(Phaser.BlendModes.ADD);
        this.trail.depth = 1;
        this.trail.play('trail', false)
        this.trail.once('animationcomplete', () => {
            this.trail.destroy()
            if (Math.random() < 0.5) {
                this.moving1.play();
            } else {
                this.moving2.play();
            }
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
                this.fireRateLocal = gameSettings.firerate - gameSettings.shiftFireRate;

                this.damageLocalBig = gameSettings.DMGbig + gameSettings.DMGall;
                this.damageLocalMedium = gameSettings.DMGmedium + gameSettings.DMGall;
                this.damageLocalSmall = gameSettings.DMGsmall + gameSettings.DMGall;

            } else {
                this.fireRateLocal = gameSettings.firerate;

                this.damageLocalBig = gameSettings.DMGbig;
                this.damageLocalMedium = gameSettings.DMGmedium;
                this.damageLocalSmall = gameSettings.DMGsmall;
            }
            
            if (this.spaceship.lastFired > this.fireRateLocal) {
                if (this.cursors.shift.isDown) {
                    this.fireSpeedLocal = gameSettings.fireSpeed //* 0.75;
                } else {
                    this.fireSpeedLocal = gameSettings.fireSpeed //* 1.25;
                }
                if (this.bullets.getChildren().length < 200) {
                    if (this.target != this.spaceship) {
                        var bullet = new CreateBullet(this, true, false);
                        var bullet2 = new CreateBullet(this, true, true);
                    } else {
                        var bullet = new CreateBullet(this, false, false);
                        var bullet2 = new CreateBullet(this, false, true);
                    }
                    this.bulletTime += 1;
                    if (this.bulletTime > 2){
                        var random = Math.random();
                        if (random < 0.25) {
                            this.shooting1.play();
                        } else if (random < 0.50) {
                            this.shooting2.play();
                        } else if (random < 0.75) {
                            this.shooting3.play();
                        } else {
                            this.shooting4.play();
                        }
                        this.bulletTime = 0;    
                    }
                }
            }
        }
        
        for (var i = 0; i < this.bullets.getChildren().length; i++) {
            var bulletHolder = this.bullets.getChildren()[i];
            bulletHolder.setBlendMode(Phaser.BlendModes.ADD);
            
            this.bullet = bulletHolder;
        }
        this.spaceship.lastFired += 1;
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

        this.hittingAsteroid.play();
        this.explosion = this.add.sprite(Phaser.Math.Between(bullet.x - 5, bullet.x + 5),Phaser.Math.Between(bullet.y - 5, bullet.y + 5),"bullet");
        this.explosion.play('hit', false)
        this.explosion.once('animationcomplete', () => {
            this.explosion.destroy()
        });
        bullet.destroy();
        asteroid.update(this.damageLocalBig, this.damageLocalMedium, this.damageLocalSmall);
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

    damageShip(ship, asteroid, health) {
        if (health === true) {
            this.spaceship.health = 12;
            for (var i = 0; i < this.healthBars.getChildren().length; i++) {
                this.healthBars[i].alpha = 0;
            }
            this.healthBars[this.spaceship.health].alpha = 1;
            gameSettings.health = false;
        } else {
            
            if (this.invencibilidad1 === false) {
                this.healthBars[this.spaceship.health].alpha = 0;
                this.getHit.play();
                this.fadeout.play("fadeout", { frameRate: 180, alpha: 0.5 });
                if (asteroid.size === "big") {
                    this.spaceship.health -= 3;    
                } else if (asteroid.size === "medium") {
                    this.spaceship.health -= 2;    
                } else {
                    this.spaceship.health -= 1;
                }
                if (this.spaceship.health < 1) {
                    this.scene.start("endLevel");
                    this.music.stop();
                    this.scene.stop("playLevel");
                } else {
                    this.spaceship.setTint(0xFF0000);
                    console.log(this.spaceship.health)
                    this.healthBars[this.spaceship.health].alpha = 1;
                    this.healthBars[this.spaceship.health].setTint(0xFF0000);
                    this.invencibilidad1 = true;
                }
            }
            ship.a += 1;
        }
    }

    createTarget(pointer, target) {
        if (target.alpha === 0.9) {
            this.music.pause();
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
        this.menuing.play();
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
            gameSettings.money += 97;
            gameSettings.score += 97;
        } else {
            gameSettings.money += 45;
            gameSettings.score += 45;
        }

        gem.destroy();
        this.moneyGrab.play();
        // console.log(gameSettings.money);
    }

    randomAmbientNoisesManager() {
        if (this.cosmosTick > 20000) {
            var random = Phaser.Math.Between(1, 3);
            if (random === 1) {
                this.cosmosAmbience1.play();
            } else if (random === 2) {
                this.cosmosAmbience2.play();
            } else if (random === 3) {
                this.cosmosAmbience3.play();
            }
            this.cosmosTick = 0;
        } else {
            this.cosmosTick += Phaser.Math.Between(1, 3);
        }
    }

    difficulty() {
        gameSettings.asteroidSpawnRate = Phaser.Math.Between(50, 250);

        this.spaceship.lastSpawnedBig += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedMedium += Phaser.Math.Between(0.50, 1.75);
        this.spaceship.lastSpawnedSmall += Phaser.Math.Between(0.50, 1.75);

        this.dif += 1;
        this.speedTick += 1;
        if (gameSettings.handicap > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 1200) {
                gameSettings.handicap -= 3;
                this.dif = 0;
            } else if (gameSettings.levelDifficulty > 600) {
                gameSettings.handicap -= 2;
                this.dif = 0;
            } else {
                gameSettings.handicap -= 1;
                this.dif = 0;
            }
        }

        if (gameSettings.asteroidSpawnRate > 2 && this.dif > gameSettings.levelDifficulty) {
            if (gameSettings.levelDifficulty > 1200) {
                gameSettings.asteroidSpawnRate -= 3;
                this.dif = 0;
            } else if (gameSettings.levelDifficulty > 600) {
                gameSettings.asteroidSpawnRate -= 2;
                this.dif = 0;
            } else {
                gameSettings.asteroidSpawnRate -= 1;
                this.dif = 0;
            }
        }
    }
}
