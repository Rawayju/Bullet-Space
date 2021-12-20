class SCNbootGame extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        // bitmap
        this.load.bitmapFont("pix", "assets/bitmap/j_0.png", "assets/bitmap/j.xml")
        
        // sound files
        this.load.audio("breakAsteroid1", ["assets/sound/effects/breakAsteroid1.ogg", "assets/sound/effects/breakAsteroid1.mp3"]);
        this.load.audio("breakAsteroid1medium", ["assets/sound/effects/breakAsteroid1medium.ogg", "assets/sound/effects/breakAsteroid1medium.mp3"]);
        this.load.audio("breakAsteroid1small", ["assets/sound/effects/breakAsteroid1small.ogg", "assets/sound/effects/breakAsteroid1small.mp3"]);
        this.load.audio("breakAsteroid2", ["assets/sound/effects/breakAsteroid2.ogg", "assets/sound/effects/breakAsteroid2.mp3"]);
        this.load.audio("breakAsteroid2medium", ["assets/sound/effects/breakAsteroid2medium.ogg", "assets/sound/effects/breakAsteroid2medium.mp3"]);
        this.load.audio("breakAsteroid2small", ["assets/sound/effects/breakAsteroid2small.ogg", "assets/sound/effects/breakAsteroid2small.mp3"]);
        this.load.audio("buy", ["assets/sound/effects/buy.ogg", "assets/sound/effects/buy.mp3"]);
        this.load.audio("cosmosAmbience1", ["assets/sound/effects/cosmosAmbience1.ogg", "assets/sound/effects/cosmosAmbience1.mp3"]);
        this.load.audio("cosmosAmbience2", ["assets/sound/effects/cosmosAmbience2.ogg", "assets/sound/effects/cosmosAmbience2.mp3"]);
        this.load.audio("cosmosAmbience3", ["assets/sound/effects/cosmosAmbience3.ogg", "assets/sound/effects/cosmosAmbience3.mp3"]);
        this.load.audio("death1", ["assets/sound/effects/death1.ogg", "assets/sound/effects/death1.mp3"]);
        this.load.audio("death2", ["assets/sound/effects/death2.ogg", "assets/sound/effects/death2.mp3"]);
        this.load.audio("getHit", ["assets/sound/effects/getHit.ogg", "assets/sound/effects/getHit.mp3"]);
        this.load.audio("hitFoR", ["assets/sound/effects/hitFoR.ogg", "assets/sound/effects/hitFoR.mp3"]);
        this.load.audio("hittingAsteroid", ["assets/sound/effects/hittingAsteroid.ogg", "assets/sound/effects/hittingAsteroid.mp3"]);
        this.load.audio("lightSpeed", ["assets/sound/effects/lightSpeed.ogg", "assets/sound/effects/lightSpeed.mp3"]);
        this.load.audio("menuing", ["assets/sound/effects/menuing.ogg", "assets/sound/effects/menuing.mp3"]);
        this.load.audio("moneyGrab", ["assets/sound/effects/moneyGrab.ogg", "assets/sound/effects/moneyGrab.mp3"]);
        this.load.audio("moving1", ["assets/sound/effects/moving.ogg", "assets/sound/effects/moving.mp3"]);
        this.load.audio("moving2", ["assets/sound/effects/moving2.ogg", "assets/sound/effects/moving2.mp3"]);
        this.load.audio("shooting1", ["assets/sound/effects/shooting1.ogg", "assets/sound/effects/shooting1.mp3"]);
        this.load.audio("shooting2", ["assets/sound/effects/shooting2.ogg", "assets/sound/effects/shooting2.mp3"]);
        this.load.audio("shooting3", ["assets/sound/effects/shooting3.ogg", "assets/sound/effects/shooting3.mp3"]);
        this.load.audio("shooting4", ["assets/sound/effects/shooting4.ogg", "assets/sound/effects/shooting4.mp3"]);
        this.load.audio("speak1", ["assets/sound/effects/speak1.ogg", "assets/sound/effects/speak1.mp3"]);
        this.load.audio("speak2", ["assets/sound/effects/speak2.ogg", "assets/sound/effects/speak2.mp3"]);
        this.load.audio("speak3", ["assets/sound/effects/speak3.ogg", "assets/sound/effects/speak3.mp3"]);
        this.load.audio("whiteNoise", ["assets/sound/effects/whiteNoise.ogg", "assets/sound/effects/whiteNoise.mp3"]);

        this.load.audio("cutscene", ["assets/sound/music/cutscene.ogg", "assets/sound/music/cutscene.mp3"]);
        this.load.audio("gameplay", ["assets/sound/music/gameplay.ogg", "assets/sound/music/gameplay.mp3"]);
        this.load.audio("shop", ["assets/sound/music/shop.ogg", "assets/sound/music/shop.mp3"]);
        
        // images
        this.load.image("tip1", "assets/Images/Sprites/Pause Screen/tip1.png");
        this.load.image("tip2", "assets/Images/Sprites/Pause Screen/tip2.png");
        this.load.image("tip3", "assets/Images/Sprites/Pause Screen/tip3.png");
        this.load.image("tip4", "assets/Images/Sprites/Pause Screen/tip4.png");

        this.load.image("health12", "assets/Images/Sprites/Health/health12.png");
        this.load.image("health11", "assets/Images/Sprites/Health/health11.png");
        this.load.image("health10", "assets/Images/Sprites/Health/health10.png");
        this.load.image("health9", "assets/Images/Sprites/Health/health9.png");
        this.load.image("health8", "assets/Images/Sprites/Health/health8.png");
        this.load.image("health7", "assets/Images/Sprites/Health/health7.png");
        this.load.image("health6", "assets/Images/Sprites/Health/health6.png");
        this.load.image("health5", "assets/Images/Sprites/Health/health5.png");
        this.load.image("health4", "assets/Images/Sprites/Health/health4.png");
        this.load.image("health3", "assets/Images/Sprites/Health/health3.png");
        this.load.image("health2", "assets/Images/Sprites/Health/health2.png");
        this.load.image("health1", "assets/Images/Sprites/Health/health1.png");
        this.load.image("health0", "assets/Images/Sprites/Health/health0.png");
        this.load.image("healthStrike", "assets/Images/Sprites/Health/healthStrike.png");

        this.load.image("hurtBox", "assets/Images/Sprites/hurtBox.png");
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
        this.load.image("pauseButton", "assets/Images/Sprites/Pause Screen/pauseButton.png");
        this.load.image("returnButton", "assets/Images/Sprites/Pause Screen/returnButton.png");
        this.load.image("pauseScreen", "assets/Images/Sprites/Pause Screen/pauseScreen.png");
        this.load.image("button", "assets/Images/Sprites/Pause Screen/button.png");

        // sprite sheets
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
        this.load.spritesheet("buttonAnim", "assets/Images/Sprites/Pause Screen/buttonPress.png", {
            frameWidth: 9,
            frameHeight: 9
        });
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        
        // create animations
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
