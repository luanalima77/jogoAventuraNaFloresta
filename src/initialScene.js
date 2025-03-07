//Classe InitialScene.
class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScene' }); //Chave da cena inicial (a título de comparação, é como se fosse um id da cena).
    }

    preload() {
        //Carregando as imagens que serão usadas na tela de início do jogo.
        this.load.image('backgroundInitialScene', 'assets/background.jpg'); 
        this.load.image('startButton', 'assets/newStartButton.png');
        this.load.image('howToPlayButton', 'assets/howToPlayButton.png');
        this.load.image('gameName', 'assets/gameName.png');
    }


    create() {
        //Altura e largura do jogo.
        var gameWidth = 1200;
        var gameHeight = 800;    

        //Criando o background (fundo) do jogo: ajustando largura e altura.
        var initialSceneBackground = this.add.image(gameWidth/2, gameHeight/2, 'backgroundInitialScene');
        initialSceneBackground.setScale(gameWidth/initialSceneBackground.width, gameHeight/initialSceneBackground.height);

        this.add.image(gameWidth / 2, gameHeight / 2.8, 'gameName');

        //Criando o botão de start (início do jogo).
        var startButton = this.add.image(gameWidth/2, gameHeight/1.65, 'startButton').setScale(0.7).setInteractive();

        //Criando o botão para o tutorial ("como jogar").
        var howToPlayButton = this.add.image(gameWidth/2, gameHeight/1.4, 'howToPlayButton').setScale(0.7).setInteractive();

        //Iniciando a cena de jogo quando o botão de início é clicado.
        startButton.on('pointerdown', () =>{
            this.scene.start('GameScene');
            console.log("Start button was clicked!") //Depurando se o botão de start foi realmente clicado.
        })

        //Iniciando o tutorial quando o botão de "como jogar" é clicado.
        howToPlayButton.on('pointerdown', () =>{
            this.scene.start('Tutorial');
            console.log("How to play button was clicked!") //Depurando se o botão de como jogar foi realmente clicado.
        })
    }
}

