class Sword{
    constructor(owner){
        //Valores para mudar o ângulo da espada
        this.theta = 5;
        this.x = this.x0;
        this.y = this.y0;
        
        this.x0 = owner.x;
        this.y0 = owner.y;
    
        this.length = SWORDLEN;
    
        this.attacking = false;
        // time to attack
        this.tta = 0;
        //para voltar no theta inicial depois do attack
        this.initialtheta = 5;
    
        // dono
        this.owner = owner;
    }

    update(){ 
        //garante que a espada fique sempre colada ao Fighter
        this.x0 = this.owner.x;
        this.y0 = this.owner.y;

        //Muda os valores do ângulo
        this.x = this.x0 + this.length * Math.cos(this.theta);
        this.y = this.y0 + this.length * Math.sin(this.theta);

        //Se clicou SPACE
        if(this.attacking){

            //A espada só aparece no attack
            this.render();
            
            //Direção do player determina o ângulo
            if(this.owner.facing === "R"){
                this.theta += 0.2;
            } else {
                this.theta -= 0.2;
            }

            this.others.forEach(other => {
                if( 
                    this.owner.sword.x <= other.x + other.radius &&
                    this.owner.sword.x >= other.x - other.radius &&
                    this.owner.sword.y >= other.y - other.radius &&
                    this.owner.sword.y <= other.y + other.radius 
                    ){
                        //Disparar a funcão que será ouvida lá no Fighter
                        other.getDammaged(this.owner.facing);
    

                }
                
            });
            //se encostou no player


            this.tta ++;
            //Se o tempo de attack acabar
            if(this.tta > 10){
                this.theta = this.initialtheta;
                this.tta = 0;
                this.attacking = false;
            }
        }


    }
    
    render(){
        ctx.beginPath();
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = Math.floor(FIGHTERSSIZE/8);
        ctx.strokeStyle = 'red';

        //Desenhinho besta de espada
        ctx.moveTo(this.x0 - Math.floor(FIGHTERSSIZE/5), this.y0-Math.floor(FIGHTERSSIZE/5));    
        ctx.lineTo(this.x, this.y)
        
        ctx.moveTo(this.x0 +Math.floor(FIGHTERSSIZE/5), this.y0-Math.floor(FIGHTERSSIZE/5));    
        ctx.lineTo(this.x, this.y)

    
        ctx.stroke()
        ctx.closePath()
    }

    //disparada ao clicar SPACE
    attack() {
        this.attacking = true;
        this.theta = this.initialtheta;
    }
}