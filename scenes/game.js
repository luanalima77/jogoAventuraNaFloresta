//Classe GameScene (referente à cena de jogar).
class GameScene extends Phaser.Scene{
    //Método construtor.
    constructor(){
        super({key: 'GameScene'}); //Chave da cena de jogo (id).
    }

    //Carregando os elementos visuais do jogo (imagens, spritesheets e fonte).
    preload(){
        this.load.spritesheet('player', 'assets/completePlayerSpritesheet.png', {frameWidth: 152, frameHeight: 129}); //***REQUISITO DA ATIVIDADE: USO DE SPRITESHEET (JOGADOR).
        this.load.spritesheet('birdEnemy', 'assets/completeBirdSpritesheet.png', {frameWidth: 179,  frameHeight: 181}); //***REQUISITO DA ATIVIDADE: USO DE SPRITESHEET (PÁSSARO INIMIGO).
        this.load.image('backgroundGameScene', 'assets/background.jpg'); //***REQUISITO DA ATIVIDADE: CENÁRIO.
        this.load.image('platform', 'assets/plataform.png'); //***REQUISITO DA ATIVIDADE: PLATAFORMA.
        this.load.image('platform2', 'assets/platform2.png'); //***REQUISITO DA ATIVIDADE: PLATAFORMA.
        this.load.image('gems', 'assets/gem.png');
        let poppins = new FontFace('Poppins', 'url(assets/Poppins-Bold.ttf)');
            poppins.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
        });
    }


    create(){
        //Largura e altura do jogo.
        var gameWidth = this.scale.width;
        var gameHeight = this.scale.height; 

        //Definindo os limites físicos do mundo do jogo.
        this.physics.world.setBounds(0, 0, gameWidth * 2, gameHeight); 

        //Adicionando o background -> REQUISITO DA ATIVIDADE: CENÁRIO.
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'backgroundGameScene');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0); //Mantém o background fixo na tela durante o efeito parallax.
        this.background.setDisplaySize(gameWidth, gameHeight); //Tamanho do fundo.


        //Criando o jogador -> REQUISITO DA ATIVIDADE: USO DE SPRITESHEET (JOGADOR).
        this.player = this.physics.add.sprite(100, 200, 'player').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gameWidth * 2, gameHeight);


        //***ANIMAÇÕES DO JOGADOR -> REQUISITO DA ATIVIDADE: USO DE SPRITESHEET (JOGADOR).***/
        //Animação: jogador parado.
        this.anims.create({
            key: 'stopped',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9}),
            frameRate: 30,
            repeat: -1,
        })

        //Animação: jogador correndo.
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('player', {start: 10, end: 19}),
            frameRate: 30,
            repeat: -1,
        })

        //Animação: jogador pulando.
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player', {start: 20, end: 27}),
            frameRate: 30,
            repeat: -1,
        });


        //O jogador inicia o jogo com a animação de parado.
        this.player.anims.play('stopped', true); 

         //Criando as plataformas -> REQUISITOS DA ATIVIDADE: PLATAFORMA E LISTA.
         this.platforms = this.physics.add.staticGroup();
         var platformsList = ['platform', 'platform2', 'platform', 'platform2','platform', 'platform2','platform', 'platform2', 'platform', 'platform2'];
         var horizontalSpaceBetweenPlatforms = gameWidth * 4.5/platformsList.length;


        //Texto dos pontos -> REQUISITO DA ATIVIDADE: PLACAR.
        this.pointsText = this.add.text(100, 100, 'Pedras preciosas: 0').setScrollFactor(0).setStyle({fontSize: '40px', fontFamily: "Poppins"});


        //Grupos das pedras preciosas da recompensa.
        this.gems = this.physics.add.group();


        // Laço de repetição para criar as plataformas e as pedras preciosas em cima delas -> REQUISITO DA ATIVIDADE: ESTRUTURA DE REPETIÇÃO.
        for (let i = 0; i < platformsList.length; i++) {
            let platformPositionX = horizontalSpaceBetweenPlatforms * i + Phaser.Math.Between(50, 75);
            var platformPositionY = Phaser.Math.Between(gameHeight / 2, gameHeight - 105);
            this.platforms.create(platformPositionX, platformPositionY, platformsList[i]).setScale(0.7).refreshBody();
            

            // Na primeira plataforma (posição 0), não aparece pedra preciosa -> REQUISITO DA ATIVIDADE: ESTRUTURA DE DECISÃO.
            if (i === 0) {
                continue; // Usando o continue (lembrando dos autoestudos de computação da semana 2).
            }

            //Posição das pedras preciosas alinhada com a da plataforma.
            let gemPositionX = platformPositionX;
            let gemPositionY = platformPositionY - 200;

            // Posicionando as pedras preciosas nas plataformas (menos na primeira).
            this.gems.create(gemPositionX, gemPositionY, 'gems').setScale(0.07);
        }


         //Quando o jogador coleta as pedras preciosas, ele ganha pontos -> REQUISITO DA ATIVIDADE: PLACAR (PONTUAÇÃO).
         this.points = 0;


         //REQUISITO DA ATIVIDADE: RECURSOS DE OVERLAP OU COLISÃO -> OVERLAP 1: jogador e pedra preciosa.
         this.physics.add.overlap(this.player, this.gems, function(player, gem){
            if(gem.active){
                gem.setVisible(false);
                gem.destroy();
                this.points = this.points + 1;
                this.pointsText.setText('Pedras preciosas: ' + this.points); //Aqui, há a atualização do placar quando o jogador pega uma pedra preciosa.
            }


            //Se o jogador coletar todas as pedras preciosas, ele é direcionado à cena de vitória -> REQUISITO DA ATIVIDADE: ESTRUTURA DE DECISÃO.
            if(this.points === 4){
                this.scene.start("WinScene");
            }
         }, null, this)



        //*** PÁSSAROS: INIMIGOS -> O JOGADOR NÃO PODE ENCOSTAR NELES -> REQUISITO DA ATIVIDADE: USO DE SPRITESHEET (PÁSSARO INIMIGO)***/
        //Pássaros.
        this.birds = this.physics.add.group({key: 'birdEnemy'});

        //Animação do pássaro.
        this.anims.create({
            key: 'flyBird',
            frames: this.anims.generateFrameNumbers('birdEnemy', {start: 0, end: 7}),
            frameRate: 12,
            repeat: -1
        })

        //Temporizador para chamar os pássaros.
        this.time.addEvent({
            delay: 3000, 
            callback: this.spawnBird,
            callbackScope: this,
            loop: true
        });


        //***COLISÕES -> REQUISITO DA ATIVIDADE: RECURSOS DE OVERLAP OU COLISÃO***
        //Adicionando a colisão entre jogador e plataformas.
        this.physics.add.collider(this.player, this.platforms);

        //Adicionando a colisão entre as pedras preciosas e plataformas.
        this.physics.add.collider(this.gems, this.platforms);

        //Adicionando o overlap entre o jogador e o pássaro, chamando a função hitPlayer -> OVERLAP 2: jogador e pássaro inimigo.
        this.physics.add.overlap(this.player, this.birds, this.hitPlayer, null, this);

        //Habilitando a chamada dos inputs do teclado.
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(){
        this.background.tilePositionX = this.cameras.main.scrollX; //O background acompanha o andar do jogador.

        //Movimento horizontal do jogador (direita e esquerda, respectivamente) -> REQUISITO DA ATIVIDADE: ESTRUTURA DE DECISÃO.
        if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
            this.player.anims.play('running', true).setFlip(false, false); //Animação de correr é ativada.
        }else if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('running', true).setFlip(true, false); //Animação de correr é ativada (aqui, a posição horizontal é invertida porque o personagem vai para a esquerda).
        }else{
            this.player.setVelocityX(0); //Se o jogador não está indo nem para a direita, nem para a esquerda, ele fica parado.
            this.player.anims.play('stopped', true); //Animação de parado é ativada.
        }

        //Movimento vertical do jogador (subindo) -> seta para cima.
        if(this.cursors.up.isDown){
            this.player.setVelocityY(-150);
            this.player.anims.play('jumping', true);
        }

        //O jogador perde se ele encostar no "chão" do fundo e a cena de derrota é aberta por meio da função killPlayer.
        if(this.player.y + this.player.height >= this.scale.height ){
            this.killPlayer();
        }
        
        //Eliminando os pássaros quando eles saem da tela.
        this.birds.children.each((bird) => {
            if (bird.active && bird.x < bird.width - 50) {
                bird.destroy();
            }
        });
        
    }

    //Função para fazer os pássaros aparecem na tela de forma animada, vindo da direita para a esquerda -> REQUISITO DA ATIVIDADE: USO DE FUNÇÃO.
    spawnBird() {
        //Posição horizontal do pássaro inimigo (eixo x).
        var birdPositionX = Phaser.Math.Between(this.scale.width, this.scale.width * 2); 

        //Delimitando a posição vertical do pássaro, com base na plataforma.
        var birdPositionY;
        var platformY; 
        var randomPlatform = Phaser.Math.Between(0, this.platforms.getChildren().length - 1);


        //Escolhendo uma plataforma qualquer para associar ao pássaro.
        platformY = this.platforms.getChildren()[randomPlatform].y;


        //Com este laço de repetição, o pássaro não passa tão perto da plataforma, mas nem tão longe também -> REQUISITO DA ATIVIDADE: ESTRUTURA DE REPETIÇÃO.
        do {
            birdPositionY = Phaser.Math.Between(200, this.scale.height / 3);
        } while (Math.abs(birdPositionY - platformY) < 100); 
        

        //Criando o pássaro no grupo de pássaros: posição, tamanho (escala), velocidade horizontal, área delimitada, gravidade e animação (respectivamente).
        var bird = this.birds.create(birdPositionX, birdPositionY, 'birdEnemy');
        bird.setScale(0.5);
        bird.setVelocityX(Phaser.Math.Between(50, 100) * -1); 
        bird.setCollideWorldBounds(true);
        bird.body.allowGravity = false;
        bird.anims.play('flyBird', true);
        
        //Animando o movimento do pássaro inimigo.
        this.tweens.add({
            targets: bird,
            x: -100, 
            duration: Phaser.Math.Between(5000, 7000), 
            ease: 'Sine.easeInOut',
            repeat: 0
        });
    }
    
    
    //Quando o jogador encosta no pássaro, ele morre -> REQUISITO DA ATIVIDADE: USO DE FUNÇÃO.
    hitPlayer(player, bird){
        this.killPlayer();
    }

    //Função para matar o jogador se ele pisar no "chão" do fundo -> REQUISITO DA ATIVIDADE: USO DE FUNÇÃO.
    killPlayer(){
        this.scene.start('GameOverScene', { points: this.points });
        console.log("Player is dead!");
    }
}




