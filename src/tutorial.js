//Classe Tutorial.
class Tutorial extends Phaser.Scene{
    constructor(){
        super({key: 'Tutorial'}); //Chave da cena de tutorial.
    }

    //Carregando as imagens a serem usadas na tela de tutorial.
    preload(){
        this.load.image('tutorialBackground', 'assets/howToPlayBackground.png');
        this.load.image('comeBackButton', 'assets/comeBackButton.png')
    }

    create(){
        //Largura e altura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;

        //Imagem de fundo do tutorial.
        this.background = this.add.image(gameWidth/2, gameHeight/2, 'tutorialBackground');
        this.background.setDisplaySize(gameWidth, gameHeight);

        //Botão de voltar (para a tela inicial).
        this.comeBackButton = this.add.image(100, 200,'comeBackButton').setScale(0.4).setInteractive();
        this.comeBackButton.on('pointerdown', () =>{
            this.scene.start('InitialScene');
        })
    }
}
