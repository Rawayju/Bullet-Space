class CreateBig extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                var x = Phaser.Math.Between(0, game.config.width);
                var y = Phaser.Math.Between(5, 10);
                super(scene,x,y,"ASTbig");
            } else {
                var x = Phaser.Math.Between(0, game.config.width);
                var y = Phaser.Math.Between(game.config.height + 5, game.config.height + 10);
                super(scene,x,y,"ASTbig");
            }
        } else {
            if (Math.random() > 0.5) {
                var x = Phaser.Math.Between(5, 10);
                var y = Phaser.Math.Between(game.config.height, 0);
                super(scene,x,y,"ASTbig");
            } else {
                var x = Phaser.Math.Between(game.config.width + 5, game.config.width + 10);
                var y = Phaser.Math.Between(game.config.height, 0);
                super(scene,x,y,"ASTbig");
            }
        }
        scene.add.existing(this);
        scene.asteroids.add(this);

        scene.physics.world.enableBody(this);
        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(10, 30);
            this.body.velocity.x = randomX;
        } else {
            var randomX = Phaser.Math.Between(-30, -10);
            this.body.velocity.x = randomX;
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(10, 30);
            this.body.velocity.y = randomY;
        } else {
            var randomY = Phaser.Math.Between(-30, -10);
            this.body.velocity.y = randomY;
        }
        
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
        this.health = 208;
    }   

    update() {
        this.health -= 1;
        if (this.health <= 0) {
            this.destroy();
        }
    }
}
