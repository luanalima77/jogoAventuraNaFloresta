//Classe GameOverScene.
class GameOverScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameOverScene'}); //Chave da cena de vitória (id).
    }

    //Carregando as imagens da tela de derrota, além da fonte Poppins.
    preload(){
        this.load.image('background', 'assets/background.jpg');
        this.load.image('defeatMessage', 'assets/defeatMessage.png');
        let poppins = new FontFace('Poppins', 'url(assets/Poppins-Bold.ttf)');
            poppins.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
        });

        this.load.image('playAgainButton', 'assets/playAgainButton.png');
    }

    //Parâmetro data: está servindo para passar os pontos da tela de game para a de gameover.
    create(data){
        //Altura e largura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height;

        //Adicionando imagem de fundo à tela de derrota do joguinho.
        this.background = this.add.image(gameWidth/2, gameHeight/2, 'background');
        this.background.setDisplaySize(gameWidth, gameHeight);

        //Mensagem de derrota.
        this.defeatMessage = this.add.image(gameWidth/2, gameHeight/2.5, 'defeatMessage');

        //Mostrando quantas moedas o jogador coletou.
        this.add.text(gameWidth / 2, gameHeight /1.5, `Moedas coletadas: ${data.points}`, {fontSize: "25px",fontFamily: "Poppins", color: "#ffffff"}).setOrigin(0.5);
        
        //Botão de reiniciar da tela de derrota
        var restartButton = this.add.image(gameWidth / 2, gameHeight/1.3, 'playAgainButton').setScale(0.7).setInteractive();

        //Quando o botão de reiniciar é clicado, o jogador pode voltar ao jogo.
        restartButton.on("pointerdown", () => {
            this.scene.start("GameScene"); 
        });
    }
}