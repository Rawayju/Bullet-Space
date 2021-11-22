class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.spritesheet("background", "assets/SpaceAnim/BCSpriteSheet.png", {
            frameWidth: 247,
            frameHeight: 157
        });
        this.load.image("spaceship", "assets/shipSmall.png");
        this.load.image("aura", "assets/spaceshipAura.png");
        this.load.image("bullet", "assets/bullet.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        
        this.anims.create({
            key: "BC",
            frames: this.anims.generateFrameNumbers("background"),
            frameRate: 8,
            repeat: -1
        });

        this.scene.start("playGame");
    }
}