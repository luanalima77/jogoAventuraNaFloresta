class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'}); //Chave da cena (id).
    }

    //Carregando os elementos do jogo.
    preload(){
        this.load.spritesheet('player', 'assets/playerSpritesheet.png', {frameWidth: 91.26, frameHeight: 91});
        this.load.image('backgroundGameScene', 'assets/background.png');
        this.load.image('plataform', 'assets/plataform.png');
    }

    create(){
        //Largura e altura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height; 
        
        //Adicionando o background.
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'backgroundGameScene');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0); //Mantém o background fixo na tela durante o efeito parallax.
        this.background.setDisplaySize(gameWidth * 2.5, gameHeight * 2.5); //Aumentando o tamanho do fundo.

        this.physics.world.setBounds(0, 0, gameWidth * 2, gameHeight);
        
        //Criando as plataformas.
        this.platforms = this.physics.add.staticGroup();
        var numberOfPlatforms = 10;
        var horizontalSpaceBetweenPlatforms = gameWidth * 4.5/numberOfPlatforms;
         for (let i = 0; i < numberOfPlatforms; i++) {
             let positionX = horizontalSpaceBetweenPlatforms * i + Phaser.Math.Between(50, 75);
             let positionY = Phaser.Math.Between(gameHeight / 2, gameHeight - 105);
             this.platforms.create(positionX, positionY, 'plataform').setScale(0.7).refreshBody();
         }


        //Jogador.
        this.player = this.physics.add.sprite(100, 300, 'player').setScale(1.5);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gameWidth * 2, gameHeight);
        
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


        //Adicionando a colisão entre jogador e plataformas
        this.physics.add.collider(this.player, this.platforms);

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
    }
}

