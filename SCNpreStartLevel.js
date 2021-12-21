class SCNpreStartLevel extends Phaser.Scene {
    constructor() {
        super("preStartLevel");
    }

    create() {
        this.mouse = this.input.mousePointer;
        this.introduction = this.add.image(config.width / 2,config.height / 2,"introduction");
    }

    update() {
        if (this.mouse.isDown) {
            this.scene.start("startLevel"); 
            this.scene.stop();
        }
    }
}
