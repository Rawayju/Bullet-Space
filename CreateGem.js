class CreateGem extends Phaser.GameObjects.Sprite {
    constructor(scene, ax, ay) {

        if (Math.random() > 0.25) {
            super(scene,ax,ay,"gem");
        } else {
            super(scene,ax,ay,"gemBig");
            this.alpha = 0.9999;
        }
    
        scene.add.existing(this);
        scene.gems.add(this);

        scene.physics.world.enableBody(this);
        if (Math.random() > 0.5) {
            var randomX = Phaser.Math.Between(0, 100);
            this.body.velocity.x = randomX;
        } else {
            var randomX = Phaser.Math.Between(-100, 0);
            this.body.velocity.x = randomX;
        }
        if (Math.random() > 0.5) {
            var randomY = Phaser.Math.Between(0, 100);
            this.body.velocity.y = randomY;
        } else {
            var randomY = Phaser.Math.Between(-100, 0);
            this.body.velocity.y = randomY;
        }

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
    }
}
