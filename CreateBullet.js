class CreateBullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        super(scene,scene.spaceship.x,scene.spaceship.y,"bullet");
        scene.add.existing(this);

        scene.spaceship.lastFired = 0;

        scene.physics.world.enableBody(this);
        
        this.body.setCollideWorldBounds(true);
        
        scene.configBullet(this);

        scene.bullets.add(this);
    }   
}
