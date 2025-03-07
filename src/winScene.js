//Classe WinScene.
class WinScene extends Phaser.Scene{
    constructor(){
        super({key: 'WinScene'}); //Chave da cena de vitória (id).
    }

    //Carregando as imagens da tela de vitória.
    preload(){
        this.load.image('background', 'assets/background.jpg');
        this.load.image('congratulationsMessage', 'assets/congratulationsMessage.png');
        this.load.image('playAgainButton', 'assets/playAgainButton.png');
        this.load.image('initialScreenButton', 'assets/initialScreenButton.png');
    }

    create(){
        //Altura e largura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;

        //Adicionando imagem de fundo à tela de vitória do joguinho.
        this.background = this.add.image(gameWidth/2, gameHeight/2, 'background');
        this.background.setDisplaySize(gameWidth, gameHeight);

        //Mensagem de vitória.
        this.congratulationsMessage = this.add.image(gameWidth/2, gameHeight/2.5, 'congratulationsMessage');

        //Botão de reiniciar.
        var restartButton = this.add.image(gameWidth / 2, gameHeight/1.45, 'playAgainButton').setScale(0.6).setInteractive();

        //Quando o botão de reiniciar é clicado, o jogador pode voltar ao jogo.
        restartButton.on("pointerdown", () => {
            this.scene.start("GameScene"); 
        });

        //Botão para voltar à tela inicial.
        this.initialScreenButton = this.add.image(gameWidth / 2, gameHeight/1.2, 'initialScreenButton').setScale(0.6).setInteractive();

        //Quando o botão "ir à tela inicial", o jogador volta à tela inicial.
        this.initialScreenButton.on("pointerdown", () => {
            this.scene.start("InitialScene"); 
        });
    }
}