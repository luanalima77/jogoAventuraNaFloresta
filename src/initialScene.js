class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScene' }); //Chave da cena (a título de comparação, é como se fosse um id da cena).
    }

    
    preload() {
        //Carregando as imagens que serão usadas na tela de início do jogo.
        this.load.image('backgroundInitialScene', 'assets/background.png');
        this.load.image('startButton', 'assets/startButton.png');
    }

    create() {
        //Altura e largura do jogo.
        var gameWidth = 1200;
        var gameHeight = 800;    

        //Criando o background (fundo) do jogo: ajustando largura e altura.
        var initialSceneBackground = this.add.image(gameWidth/2, gameHeight/2, 'backgroundInitialScene');
        initialSceneBackground.setScale(gameWidth/initialSceneBackground.width, gameHeight/initialSceneBackground.height);
        this.add.text(gameWidth / 2, gameHeight / 2, "Forest Adventure", {
            fontSize: "4rem",
            color: "#FFFFFF",
            align: "center"
        }).setOrigin(0.5);

        //Criando o botão de start (início do jogo).
        var startButton = this.add.image(gameWidth/2, gameHeight/1.5, 'startButton').setScale(0.4).setInteractive();

        //Iniciando a cena de jogo quando o botão de start é clicado.
        startButton.on('pointerdown', () =>{
            this.scene.start('GameScene');
            console.log("Start button was clicked!") //Depurando se o botão de start foi realmente clicado.
        })
    }
}

