class SCNbootGame extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        
        this.load.spritesheet("spacen", "assets/Images/SpriteSheets/Spacen.png", {
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.spritesheet("background", "assets/Images/SpriteSheets/SpaceBC.png", {
            frameWidth: 247,
            frameHeight: 157
        });
        this.load.spritesheet("fadeout", "assets/Images/SpriteSheets/fadeout.png", {
            frameWidth: 1,
            frameHeight: 1
        });
        this.load.image("sCover", "assets/Images/Sprites/screenCover.png");
        this.load.image("sCover2", "assets/Images/Sprites/screenCover2.png");
        this.load.image("mCover", "assets/Images/Sprites/multiplyCover.png");
        this.load.image("spaceship", "assets/Images/Sprites/shipSmall.png");
        this.load.image("aura", "assets/Images/Sprites/spaceshipAura.png");
        this.load.image("bullet", "assets/Images/Sprites/bullet.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        
        this.anims.create({
            key: "jamming",
            frames: this.anims.generateFrameNumbers("spacen", { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("spacen", { start: 6, end: 8 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: "ryoukai",
            frames: this.anims.generateFrameNumbers("spacen", { start: 12, end: 16 }),
            frameRate: 8,
        });

        this.anims.create({
            key: "BC",
            frames: this.anims.generateFrameNumbers("background"),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "fadeout",
            frames: this.anims.generateFrameNumbers("fadeout"),
            frameRate: 12,
        });

        this.scene.start("startTestLevel");
    }
}