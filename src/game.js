class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'}); //Chave da cena (id).
    }

    //Carregando os elementos do jogo.
    preload(){
        this.load.spritesheet('player', 'assets/playerSpritesheet.png', {frameWidth: 91.26, frameHeight: 91});
        this.load.image('backgroundGameScene', 'assets/background.png');
        this.load.image('platform', 'assets/plataform.png');
        this.load.image('platform2', 'assets/platform2.png');
        this.load.spritesheet('coins', 'assets/Coin.png', {frameWidth: 10, frameHeight: 10});
    }

    create(){
        //Largura e altura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height; 
        this.physics.world.setBounds(0, 0, gameWidth * 2, gameHeight);


        //Adicionando o background.
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'backgroundGameScene');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0); //Mantém o background fixo na tela durante o efeito parallax.
        this.background.setDisplaySize(gameWidth * 2.5, gameHeight * 2.5); //Aumentando o tamanho do fundo.


        
        //Jogador.
        this.player = this.physics.add.sprite(100, 300, 'player').setScale(1);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gameWidth * 2, gameHeight);



        //***ANIMAÇÕES***/
        //Animação: jogador parado.
        this.anims.create({
            key: 'stopped',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9}),
            frameRate: 2,
            repeat: -1,
        })

        //Animação: jogador correndo.
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('player', {start: 10, end: 19}),
            frameRate: 15,
            repeat: -1,
        })

        //Animação: jogador pulando.
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player', {start: 20, end: 29}),
            frameRate: 15,
            repeat: -1,
        })

        this.player.anims.play('stopped', true); //O jogador inicia o jogo com a animação de parado.


        //Criando as plataformas.
        this.platforms = this.physics.add.staticGroup();
        var platformsList = ['platform', 'platform2', 'platform', 'platform2','platform', 'platform2','platform', 'platform2', 'platform', 'platform2'];
        var horizontalSpaceBetweenPlatforms = gameWidth * 4.5/platformsList.length;


        //Texto dos pontos.
        this.pointsText = this.add.text(50, 100, 'Points: ').setScrollFactor(0).setStyle({fontSize: '50px'});


        //Grupos das moedinhas da recompensa.
        this.coins = this.physics.add.group();
        

        // Laço de repetição para criar as plataformas e as moedinhas em cima delas.
        for (let i = 0; i < platformsList.length; i++) {
            let platformPositionX = horizontalSpaceBetweenPlatforms * i + Phaser.Math.Between(50, 75);
            let platformPositionY = Phaser.Math.Between(gameHeight / 2, gameHeight - 105);
            this.platforms.create(platformPositionX, platformPositionY, platformsList[i]).setScale(0.7).refreshBody();
            
            // Na primeira plataforma (posição 0), não aparece moeda.
            if (i === 0) {
                continue; // Usando o continue (lembrando dos autoestudos de computação da semana 2).
            }

            let coinPositionX = platformPositionX;
            let coinPositionY = platformPositionY - 200;

            // Posicionando as moedas nas plataformas (menos na primeira).
            this.coins.create(coinPositionX, coinPositionY, 'coins').setScale(3);
        }

         //Colentando as moedinhas e ganhando pontos.
         this.points = 0;
         this.physics.add.overlap(this.player, this.coins, function(player, coin){
            if(coin.active){
                coin.setVisible(false);
                coin.destroy();
                this.points = this.points + 1;
                this.pointsText.setText('Points: ' + this.points);
            }

            //Se o jogador coletar todos os pontos.
            if(this.points === 4){
                console.log("Você ganhou!");
            }
         }, null, this)


        //***COLISÕES***
        //Adicionando a colisão entre jogador e plataformas
        this.physics.add.collider(this.player, this.platforms);

        //Adicionando a colisão entre moedinhas e plataformas
        this.physics.add.collider(this.coins, this.platforms);

        //Habilitando a chamada dos inputs do teclado.
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(){
        this.background.tilePositionX = this.cameras.main.scrollX;

        //Movimento horizontal do jogador (direita e esquerda, respectivamente).
        if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
            this.player.anims.play('running', true).setFlip(false, false);
        }else if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('running', true).setFlip(true, false);
        }else{
            this.player.setVelocityX(0); //Se o jogador não está indo nem para a direita, nem para a esquerda, ele fica parado.
            this.player.anims.play('stopped', true);
        }

        //Movimento vertical do jogador (subindo)
        if(this.cursors.up.isDown){
            this.player.setVelocityY(-150);
            this.player.anims.play('jumping', true);
        }

        //O jogador morre se ele encostar no "chão" do fundo, a cena recomeça e os pontos retornam a 0.
        if(this.player.y + this.player.height >= this.scale.height ){
            this.killPlayer();
        }
    }

    
    //Função para matar o jogador se ele pisar no "chão" do fundo.
    killPlayer(){
        this.points = 0;
        this.pointsText.setText('Points:');
        this.scene.restart();
        console.log("Morreu");
    }
}




