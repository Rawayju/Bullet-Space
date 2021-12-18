class CreateBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, bool) {

        super(scene,scene.spaceship.x,scene.spaceship.y,"bullet");
        scene.add.existing(this);

        scene.spaceship.lastFired = 0;

        scene.physics.world.enableBody(this);
        
        this.body.setCollideWorldBounds(true);
        
        if (bool === true) {
            scene.configBullet(this, true);
            // console.log("fire me to target pls");
        } else {
            scene.configBullet(this, false);
            // console.log("fire me to target pls");
        }

        scene.bullets.add(this);
    }   
}
