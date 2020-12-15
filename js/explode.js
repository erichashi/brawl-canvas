function Particle(x, y, radius, color, vel){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = vel;

    //time to live
    this.ttl =0;

    this.update = function(){
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.ttl++;
        this.draw();
    }

    this.draw = () => {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

}

//Algoritmo não ideal para explosão
//TODO: deixar o algoritmo mais leve
function explode(x, y, num, color){
    explosion.play();
    applause.play();

    //Fatores para incrementar no random
    let fact1 = 0
    let fact2 = 0
    let fact3 = 0
    let fact4 = 0
    
    switch(num){
        case 1:
            fact1=-0.5
            fact2=0.5;
            fact3=2;
            fact4=9;
            ;
            break;
        case 2:
            fact1=1;
            fact2=9;
            fact3=-0.5;
            fact4=0.5;
            break;
        case 3:
            fact1=-0.5;
            fact2=0.5;
            fact3=-1;
            fact4=-9;
            break;
        case 4:
            fact1=-1;
            fact2=-9;
            fact3=-0.2;
            fact4=0.2;
            break;
        case 5:
            fact1=3;
            fact2=9;
            fact3=3;
            fact4=9;
            break;
        case 6:
            fact1=-3;
            fact2=-9;
            fact3=3;
            fact4=9;
            break;
        case 7:
            fact1=-3;
            fact2=-9;
            fact3=-3;
            fact4=-9;
            break;
        case 8:
            fact1=3;
            fact2=9;
            fact3=-3;
            fact4=-9;

            break;
    
    }

    //Para cada partícula, adicionar uma velocidade random de acordo com os fatores
    for (let i = 0; i < NUMPARTICLES; i++) {
        particles.push(new Particle(x, y, 3, color, {
            x: randomFromRange(fact1, fact2) * 2 ,
            y: randomFromRange(fact3,fact4) * 2 ,
        }));
    }
}