class Fighter{
    constructor(x, y, color, htmlElement){

        this.x = x;
        this.y = y;
        this.radius = FIGHTERSSIZE;
        this.color = color;

        this.htmlElement = htmlElement;
    
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

    }

    keyMove()  {

        if (joy) {

            (joy.GetX() < 0) ? keysPressed["ArrowLeft"] = true : keysPressed["ArrowLeft"] = false;
            
            (joy.GetX() > 0) ? keysPressed["ArrowRight"] = true : keysPressed["ArrowRight"] = false;

            (joy.GetY() >= 100) ? keysPressed["ArrowUp"] = true : keysPressed["ArrowUp"] = false;

            // if(wasPressed('Space')){
            //     keysPressed['Space'] = false;
            //     this.sword.attack()
            // }

        } 


        if(wasPressed('ArrowLeft') || wasPressed('KeyA')){
            this.x -= this.speed;
            this.facing = "L"
            this.sword.initialtheta = 3.5;        
        }

        if(wasPressed('ArrowRight') || wasPressed('KeyD')){
            this.x += this.speed;
            this.facing = "R"
            this.sword.initialtheta = 5.8;
        }

        if(wasPressed('ArrowUp') || wasPressed('KeyW')){
            keysPressed['ArrowUp'] = false;
            keysPressed['KeyW'] = false;

            if(this.numJumps < 2){
                this.vel.y = -JUMP;
                this.y += this.vel.y
                this.numJumps++;
            }
        }

        if(wasPressed('Space')){
            keysPressed['Space'] = false;
            this.sword.attack()
        }
        
        
            
    }

    playAi(){}

    update() {        
        if(!this.disablemove){
            this.playAi();
        }

        this.keyMove();

        // if(this.kright){
        //     this.x += this.speed;
        // }
 
        // if(this.kleft){
        //     this.x -= this.speed;
        // }

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
                this.updateDPSpan();
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
        this.vel.y += GRAVITY; //gravity    
        this.x += this.vel.x;

        //tempo que fica translúcido
        if(this.ttr > TIMETORESPAWN*2){ 
            ctx.globalAlpha = 1;    
            this.ttr = 0
        };

        this.render();

        //update dos valores de sword
        this.sword.update();
    }

    updateDPSpan() {
        this.htmlElement.innerHTML = `${this.damagepoints}%`
    }
    //Função disparada pelo Sword do oponent
    getDammaged(dir) {

        this.updateDPSpan();
        //se não está no tempo de regeneração 
        if(this.ttr < TIMETORESPAWN){

            gSounds['jab'].currentTime = 0;
            gSounds['jab'].play();

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
    restart(num) {
        this.restarting = true;
        //numJumps > que 2 para não ficar pulando
        this.numJumps = 3;
        this.ttd = 0;
        this.disablemove = false;
        //animação da explosão
        explode(this.x, this.y, num, this.color);

    }

    render(){
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


class BotFighter extends Fighter{
    constructor(x, y, color, htmlElement){
        super(x, y, color, htmlElement);

        this.ttj = 0;
        this.jump =  Math.floor(Math.random() * 300)
        this.tta = 0;
        this.attack =  Math.floor(Math.random() * 300 )
    }


    keyMove(keyCode) {
        if(keyCode === 39 || keyCode === 68){
            this.vel.x += this.speed;
            this.facing = "R"
            this.sword.theta = 5.8;
        }

        if(keyCode === 37 || keyCode === 65){
            this.vel.x -= this.speed;
            this.facing = "L"
            this.sword.theta = 3.5;
        }
       
         
        if(keyCode === 38 || keyCode === 87){
            if(this.numJumps < 2){
                this.vel.y = -JUMP;
                this.y += this.vel.y
                this.numJumps++;
            }
        }

        if(keyCode === 32) this.sword.attack();
            
    }


    playAi(){
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


}