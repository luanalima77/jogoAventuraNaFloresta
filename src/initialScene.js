class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScene' });
    }

    preload() {
        this.load.image('backgroundInitialScene', 'assets/backgroundInitialScene.jpg');
    }

    create() {
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;    
        var initialSceneBackground = this.add.image(gameWidth/2, gameHeight/2, 'backgroundInitialScene');
        initialSceneBackground.setScale(gameWidth/initialSceneBackground.width, gameHeight/initialSceneBackground.height);
        this.add.text(gameWidth / 2, gameHeight / 2, "Aventura na floresta", {
            fontSize: "4rem",
            color: "#000000",
            fontFamily: "Arial",
            align: "center"
        }).setOrigin(0.5);
    }
}

const phaserConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [InitialScene]
};

const game = new Phaser.Game(phaserConfig);
