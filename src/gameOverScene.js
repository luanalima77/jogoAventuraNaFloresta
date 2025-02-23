class GameOverScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameOverScene'}); //Chave da cena de vitória (id).
    }

    //Carregando a imagem do fundo.
    preload(){
        this.load.image('background', 'assets/background.png');
    }

    //Parâmetro data: está servindo para passar os pontos da tela de game para a de gameover.
    create(data){
        //Altura e largura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;

        //Adicionando imagem de fundo à tela de derrota do joguinho.
        this.background = this.add.image(gameWidth/2, gameHeight/2, 'background');
        this.background.setDisplaySize(gameWidth, gameHeight);

        //Textos da tela de derrota.
        this.add.text(gameWidth / 2, gameHeight / 2 - 10, "QUE PENA!", {fontSize: "80px", color: "#ffffff"}).setOrigin(0.5);
        this.add.text(gameWidth / 2, gameHeight / 2 + 50, "Tome mais cuidado com os pássaros", {fontSize: "30px", color: "#ffffff"}).setOrigin(0.5);
        this.add.text(gameWidth / 2, gameHeight / 2 + 100, "e com o chão da floresta", {fontSize: "30px",color: "#ffffff"}).setOrigin(0.5);
        this.add.text(gameWidth / 2, gameHeight / 2 + 150, `Moedas coletadas: ${data.points}`, {fontSize: "30px", color: "#ffffff"}).setOrigin(0.5);

        //Botão de reiniciar da tela de derrota
        var restartButton = this.add.text(gameWidth / 2, gameHeight / 2 + 200, "Jogue novamente!", {fontSize: "30px", backgroundColor: "#2A5A39", padding: { left: 10, right: 10, top: 5, bottom: 5}}).setOrigin(0.5).setInteractive();

        //Quando o botão de reiniciar é clicado, o jogador pode voltar ao jogo.
        restartButton.on("pointerdown", () => {
            this.scene.start("GameScene"); 
        });
    }
}