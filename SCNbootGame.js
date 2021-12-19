class SCNbootGame extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        this.load.bitmapFont("pix", "assets/bitmap/j_0.png", "assets/bitmap/j.xml")
        
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
        this.load.spritesheet("FoR", "assets/Images/SpriteSheets/FieldOfReturn.png", {
            frameWidth: 247,
            frameHeight: 157
        });
        this.load.image("gem", "assets/Images/Sprites/gem.png");
        this.load.image("gemBig", "assets/Images/Sprites/gemBig.png");
        this.load.image("shop", "assets/Images/Sprites/shop.png");
        this.load.image("sCover", "assets/Images/Sprites/screenCover.png");
        this.load.image("sCover2", "assets/Images/Sprites/screenCover2.png");
        this.load.image("mCover", "assets/Images/Sprites/multiplyCover.png");
        this.load.image("spaceship", "assets/Images/Sprites/shipSmall.png");
        this.load.image("aura", "assets/Images/Sprites/spaceshipAura.png");
        this.load.image("bullet", "assets/Images/Sprites/bullet.png");
        this.load.image("ASTbig", "assets/Images/Sprites/ASTbig.png");
        this.load.spritesheet("ASTmedium", "assets/Images/SpriteSheets/ASTmedium.png", {
            frameWidth: 20,
            frameHeight: 20
        });
        this.load.spritesheet("ASTsmall", "assets/Images/SpriteSheets/ASTsmall.png", {
            frameWidth: 10,
            frameHeight: 10
        });

        this.load.spritesheet("aim", "assets/Images/SpriteSheets/bulletAim.png", {
            frameWidth: 38,
            frameHeight: 38
        });
        this.load.spritesheet("bulletHit", "assets/Images/SpriteSheets/bulletExplode.png", {
            frameWidth: 5,
            frameHeight: 5
        });

        this.load.spritesheet("trail", "assets/Images/SpriteSheets/trail.png", {
            frameWidth: 11,
            frameHeight: 11
        });

        this.load.image("pauseButton", "assets/Images/Sprites/Pause Screen/pauseButton.png");
        this.load.image("returnButton", "assets/Images/Sprites/Pause Screen/returnButton.png");
        this.load.image("pauseScreen", "assets/Images/Sprites/Pause Screen/pauseScreen.png");
        this.load.image("button", "assets/Images/Sprites/Pause Screen/button.png");
        this.load.spritesheet("buttonAnim", "assets/Images/Sprites/Pause Screen/buttonPress.png", {
            frameWidth: 9,
            frameHeight: 9
        });
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        
        this.anims.create({
            key: "buttonPress",
            frames: this.anims.generateFrameNumbers("buttonAnim"),
            frameRate: 15,
        });

        this.anims.create({
            key: "aimStart",
            frames: this.anims.generateFrameNumbers("aim", { start: 0, end: 3 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "aimIdle",
            frames: this.anims.generateFrameNumbers("aim", { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: "hit",
            frames: this.anims.generateFrameNumbers("bulletHit"),
            frameRate: 14,
            hideOnComplete: true
        });

        this.anims.create({
            key: "trail",
            frames: this.anims.generateFrameNumbers("trail"),
            frameRate: 14,
            hideOnComplete: true
        });

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

        this.anims.create({
            key: "FoR",
            frames: this.anims.generateFrameNumbers("FoR"),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "medium1",
            frames: this.anims.generateFrameNumbers("ASTmedium", { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "medium2",
            frames: this.anims.generateFrameNumbers("ASTmedium", { start: 1, end: 1 }),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "medium3",
            frames: this.anims.generateFrameNumbers("ASTmedium", { start: 2, end: 2 }),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "medium4",
            frames: this.anims.generateFrameNumbers("ASTmedium", { start: 3, end: 3 }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: "small1",
            frames: this.anims.generateFrameNumbers("ASTsmall", { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "small2",
            frames: this.anims.generateFrameNumbers("ASTsmall", { start: 1, end: 1 }),
            frameRate: 0,
            repeat: -1
        });

        this.scene.start("startTestLevel");
    }
}
