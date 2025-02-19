class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScene' });
    }

    
    preload() {
        //Carregando as imagens que serão usadas na tela de início do jogo.
        this.load.image('backgroundInitialScene', 'assets/backgroundInitialScene.jpg');
        this.load.image('startButton', 'assets/startButton.png');
    }


    create() {
        //Altura e largura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;    

        //Criando o background do jogo: ajustando largura e altura.
        var initialSceneBackground = this.add.image(gameWidth/2, gameHeight/2, 'backgroundInitialScene');
        initialSceneBackground.setScale(gameWidth/initialSceneBackground.width, gameHeight/initialSceneBackground.height);
        this.add.text(gameWidth / 2, gameHeight / 2, "Aventura na floresta", {
            fontSize: "4rem",
            color: "#000000",
            fontFamily: "Arial",
            align: "center"
        }).setOrigin(0.5);

        //Criando o botão de start (início do jogo)
        var startButton = this.add.image(gameWidth/2, gameHeight/1.5, 'startButton').setScale(0.4).setInteractive();
        startButton.on('pointerdown', () =>{
            this.scene.start('InitialScene');
        })
    }
}

const phaserConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [InitialScene]
};

const game = new Phaser.Game(phaserConfig);
