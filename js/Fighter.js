function Fighter(x, y, color, ai=false){
    this.x = x;
    this.y = y;
    this.radius = FIGHTERSSIZE;
    this.color = color;

    this.vel = {x: 0, y:0};
    this.speed = SPEED;

    //para calcular o número de jumps
    this.numJumps = 0;

    //lado que está virado (R/L) -> para Sword
    this.facing = "R";

    //Weapon
    this.sword = new Sword(this);

    this.restarting = false;
    //Time to restart
    this.ttr=0;

    //quanto mais, maior o coice
    this.damagepoints = 0;
    this.damaged = false;
    //Time to damage: Até qnt tempo ele pode ficar sem se mover
    this.ttd = 0;

    //Evitar de mover com o teclado durante o coice
    this.disablemove = false;

    this.keyMove = (keyCode) => {
       
        switch(keyCode){
            case 39:
                //right
                this.vel.x = this.speed;
                this.facing = "R"
                this.sword.theta = 5.8;
                break;
            
            case 37:
                //left
                this.vel.x = -this.speed;
                this.facing = "L"
                this.sword.theta = 3.5;
                break;
                
            case 38:
                //up
                if(this.numJumps < 2){
                    this.vel.y = -JUMP;
                    this.y += this.vel.y
                    this.numJumps++;
                }
                break;

            case 32:
                this.sword.attack();
                break;
            
        }
    }

    //Apenas para Robozinho
    if(ai){
        this.ttj = 0;
        this.jump =  Math.floor(Math.random() * 300)
        this.tta = 0;
        this.attack =  Math.floor(Math.random() * 300 )
    }

    //Apenas para Robozinho
    this.playAi = () =>{
        this.tta++;
        this.ttj++;

        if(this.tta > 20 && !player.restarting){
            if(player.x > this.x + this.radius*2){
                this.keyMove(39)
            } 
            
            if(player.x < this.x - this.radius*2){
                this.keyMove(37)
            }
        }

        this.vel.x *= 0.3;

        if(this.ttj > this.jump && this.y > canvas.height/3){
            this.keyMove(38)
            this.jump =  Math.floor(Math.random() * 100)
            this.ttj = 0;
        }

        if(this.tta > this.attack){
            this.keyMove(32)
            this.attack =  Math.floor(Math.random() * 100)
            this.tta = 0;
        }
    }

    this.update = () => {        
        if(ai && !this.disablemove){
            this.playAi();
        } 

        //Checar colisão com o chão
        if(touchGround(this.x, this.y, this.vel, this.radius)){
            //Zerar os valores de velocidade e numJumps
            this.vel.y = 0;
            this.numJumps = 0;
        }

        //Se morreu, fica de fora um tempo
        if(this.restarting){
            this.ttr++;
            //Boneco parado
            this.vel.y = 0;
            this.vel.x = 0;
            
            //Se o cronometro passou da hora é hora de voltar para o mapa
            if(this.ttr > TIMETORESPAWN){
                //Respawn no céu
                this.y = -canvas.height/30;
                this.x = canvas.width/2;
                this.damagepoints = 0;
                this.restarting = false;
            }
        } else {
            //Checar se saiu dos limites do mapa

            //Por que no else? Porque só conta se o player não estiver morto.
            //Só tenta tirar para ver
            let x = getOutOfBounds(this.x, this.y)
            if(x) this.restart(x);

        }

        
        //Garante que não mova durante o coice
        if(this.disablemove){
            this.ttd ++
            if (this.ttd > 10){
                this.ttd = 0;
                this.vel.x = 0;
                this.disablemove=false;
            };
        }

        //incrementa gravidade e speed
        this.y += this.vel.y;
        this.vel.y += 0.5; //gravity    
        this.x += this.vel.x;

        //tempo que fica translúcido
        if(this.ttr > TIMETORESPAWN*2){ 
            ctx.globalAlpha = 1;    
            this.ttr = 0
        };

        this.draw();

        //update dos valores de sword
        this.sword.update();
    }

    //Função disparada pelo Sword do oponent
    this.getDammaged = (dir) => {
        //se não está no tempo de regeneração 
        if(this.ttr < TIMETORESPAWN){

            jab.play();

            //dir determina a direção do coice
            if(dir === "R"){
                this.vel.x += Math.floor(this.damagepoints/6);
            } else{
                this.vel.x -= Math.floor(this.damagepoints/6);
            }

            //coice só para a cima
            this.vel.y -= Math.floor(this.damagepoints/10);

            //aumentar o dano
            this.damagepoints += 6;
            this.damaged = false;
            this.disablemove = true;
        
        }
    }

    //Se tocou nos limites
    this.restart = (num) => {
        this.restarting = true;
        //numJumps > que 2 para não ficar pulando
        this.numJumps = 3;
        this.ttd = 0;
        this.disablemove = false;
        //animação da explosão
        explode(this.x, this.y, num, this.color);

    }


    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color
        //Se regenerando
        if(this.ttr > TIMETORESPAWN){
            this.ttr++;
            ctx.save()
            ctx.globalAlpha = 0.5;    
        } 
        ctx.fill();    
        ctx.restore()
        ctx.closePath();
    }
}