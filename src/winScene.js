class WinScene extends Phaser.Scene{
    constructor(){
        super({key: 'WinScene'}); //Chave da cena de vitória (id).
    }

    //Carregando a imagem do fundo.
    preload(){
        this.load.image('background', 'assets/background.png');
    }

    create(){
        //Altura e largura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;

        //Adicionando imagem de fundo à tela de vitória do joguinho.
        this.background = this.add.image(gameWidth/2, gameHeight/2, 'background');
        this.background.setDisplaySize(gameWidth, gameHeight);

        //Textos da tela de vitória.
        this.add.text(gameWidth / 2, gameHeight / 2 - 10, "PARABÉNS!", {fontSize: "80px", color: "#ffffff"}).setOrigin(0.5);
        this.add.text(gameWidth / 2, gameHeight / 2 + 50, "Você coletou as 4 moedas com bravura", {fontSize: "30px", color: "#ffffff"}).setOrigin(0.5);
        this.add.text(gameWidth / 2, gameHeight / 2 + 100, "e superou os pássaros da floresta", {fontSize: "30px",color: "#ffffff"}).setOrigin(0.5);

        //Botão de reiniciar
        var restartButton = this.add.text(gameWidth / 2, gameHeight / 2 + 150, "Jogue novamente!", {fontSize: "30px", backgroundColor: "#2A5A39", padding: { left: 10, right: 10, top: 5, bottom: 5}}).setOrigin(0.5).setInteractive();

        //Quando o botão de reiniciar é clicado, o jogador pode voltar ao jogo.
        restartButton.on("pointerdown", () => {
            this.scene.start("GameScene"); 
        });
    }
}