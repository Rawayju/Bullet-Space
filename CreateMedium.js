class CreateMedium extends Phaser.GameObjects.Sprite {
    constructor(scene, ax, ay) {

        if (ax === 0 & ay === 0) {
            if (Math.random() > 0.5) {
                if (Math.random() > 0.5) {
                    var x = Phaser.Math.Between(0, game.config.width);
                    var y = Phaser.Math.Between(5, 10);
                    super(scene,x,y,"ASTmedium");
                } else {
                    var x = Phaser.Math.Between(0, game.config.width);
                    var y = Phaser.Math.Between(game.config.height + 5, game.config.height + 10);
                    super(scene,x,y,"ASTmedium");
                }
            } else {
                if (Math.random() > 0.5) {
                    var x = Phaser.Math.Between(5, 10);
                    var y = Phaser.Math.Between(game.config.height, 0);
                    super(scene,x,y,"ASTmedium");
                } else {
                    var x = Phaser.Math.Between(game.config.width + 5, game.config.width + 10);
                    var y = Phaser.Math.Between(game.config.height, 0);
                    super(scene,x,y,"ASTmedium");
                }
            }
        } else { 
            super(scene,ax,ay,"ASTmedium");
        }
        
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                this.play("medium1");
            } else {
                this.play("medium2");
            }
        } else {
            if (Math.random() > 0.5) {
                this.play("medium3");
            } else {
                this.play("medium4");
            }
        }
    
        scene.add.existing(this);
        scene.asteroids.add(this);

        scene.physics.world.enableBody(this);
        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(15, 50);
            this.body.velocity.x = randomX;
        } else {
            var randomX = Phaser.Math.Between(-50, -15);
            this.body.velocity.x = randomX;
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(15, 50);
            this.body.velocity.y = randomY;
        } else {
            var randomY = Phaser.Math.Between(-50, -15);
            this.body.velocity.y = randomY;
        }
        
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
        this.setInteractive();
        this.health = 52 * 2;
        this.size = "medium";
        this.breakAsteroid1 = scene.breakAsteroid1medium;
        this.breakAsteroid2 = scene.breakAsteroid2medium;
    }

    update(no, all, nope) {
        // console.log(all);
        this.health -= all;
        this.health -= 1;
        if (this.health <= 0) {
            this.alpha = 0.000001;
            if (Math.random() > 0.5) {
                this.breakAsteroid1.play();
            } else {
                this.breakAsteroid2.play();
            }
            gameSettings.score += 70;
            this.destroy();
        }
    }
}
