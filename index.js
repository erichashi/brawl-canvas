const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body');


// Set width and heights
canvas.width = body.clientWidth <= 800 ? Math.floor(body.clientWidth/1.28) : 800;
canvas.height = Math.floor(canvas.width/1.35);


// Global Variables e Constantes úteis
let pause = true;

//Cuidado! Trocar esse valores pode resultar em bugs
const TIMETORESPAWN = 200;

const PLAYERCOLOR = 'orange'
const ENEMYCOLOR = 'green'


const BOUNDS = Math.floor(canvas.width/10)

const GROUNDSPACES = Math.floor(canvas.width/8);
const GROUNDHEIGHT = Math.floor(canvas.height-canvas.height/3);

const FIGHTERSSIZE = Math.floor(canvas.width/40);
const NUMPARTICLES = 50;

const SWORDLEN = Math.floor(FIGHTERSSIZE*2);

const SPEED = Math.floor(FIGHTERSSIZE/4);
const JUMP = Math.floor(SPEED*2.5);


//TODO resize function
// window.addEventListener('resize',function(){
//     canvas.width = Math.floor(body.clientWidth/1.28);
//     canvas.height = Math.floor(body.clientWidth/2);

//     init()
//     update();
// } )


// input do teclado
document.addEventListener('keydown', e =>{
    if(e.keyCode == 13){
        pause = !pause;
        update();
    } else if (!player.disablemove){ 
        player.keyMove(e.keyCode);
    }
})

addEventListener('keyup', (e) => {
    if((e.keyCode === 39 || e.keyCode === 37) && !player.disablemove)
        player.vel.x = 0;
})


// Helpers
function randomFromRange(min,max){
    return (Math.random()*(max-min+1) + min);
}

//Funções úteis para os Fighters
function getOutOfBounds(x, y){
   
    if(y >= canvas.height + BOUNDS){ //baixo
        if(x >= canvas.width) return 7 // canto inferior direito
        if(x <= 0) return 8 // canto inferior esquerdo
        else return 3;//baixo

    } else if(x >= canvas.width + BOUNDS){ //direita
        if(y >= canvas.height) return 7 // canto inferior direito
        if(y < 0) return 6 //canto superior direito
        else return 4; //direito

    } else if(x <= -BOUNDS){ // esquerdo
        if(y >= canvas.height) return 8 // canto inferior esquerdo
        if(y < 0) return 5 //canto superior esquerdo
        else return 2; //esquerdo        

    } else if (y <= -BOUNDS){//cima
        if(x >= canvas.width) return 6 // canto superior direito
        if(x <= 0) return 5 // canto superior esquerdo
        else return 1;//cima
    }
}
function touchGround(x, y, vel, radius){
    return (
        y + radius + vel.y  >= GROUNDHEIGHT &&
        y - radius <= GROUNDHEIGHT &&
        x - radius >= (GROUNDSPACES/2) &&
        x + radius <= canvas.width - (GROUNDSPACES/2))
}


//Helper
function writeTextCanvas(text, x, y, color, size){
    ctx.font = `${size}px Verdana`;
    ctx.fillStyle = color;
    ctx.fillText(`${text}`, x, y); 
}


function drawGround(){
    ctx.beginPath();
    ctx.fillStyle = 'black'
    ctx.fillRect(GROUNDSPACES, GROUNDHEIGHT, canvas.width - (GROUNDSPACES*2), GROUNDSPACES/10);
    ctx.fill();    
    ctx.closePath();
}

//outros valores para melhorar um pouquinho a capacidade
let posinfoplayer = canvas.width/2 - Math.floor(canvas.width/6);
let posinfoenemy = canvas.width/2 + Math.floor(canvas.width/6);
let infoy = canvas.height-(canvas.width/10)

//desenhar a bolinha, nome e %
function drawFighterInfo(text, x, y, color, size){
    ctx.beginPath();
    ctx.arc(Math.floor(x - size -size/3), Math.floor(y-size/3), size, 0, Math.PI*2)
    ctx.fillStyle = color;
    ctx.fill()
    writeTextCanvas(text, x, y, color, Math.floor(size+size/3))
    
    writeTextCanvas(color, x, Math.floor(y+size/2+size/6), color, size/2)
    ctx.closePath();
}


// Initialization
let player;
let particles;
let enemy;


function init(){
    particles = [];

    player = new Fighter(
        canvas.width/2 - Math.floor(canvas.width/6), canvas.height/2, 
        PLAYERCOLOR);
    
    enemy = new Fighter(
        canvas.width/2 + Math.floor(canvas.width/6), 
        canvas.height/2, 
        ENEMYCOLOR, 
        ai=true)

    player.sword.other = enemy;
    enemy.sword.other = player;

    drawGround();
}

function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    drawGround();

    player.update();

    particles.forEach((part, parti) => {
        if(part.ttl < 50){
            //se passar 50, sumir
            part.update();
        } else {
            particles.splice(parti, 1);
        }
    });

    enemy.update();

    //INFO
    drawFighterInfo(`${player.damagepoints}%`, posinfoplayer, infoy, player.color, Math.floor(FIGHTERSSIZE*.8))

    //INFO
    drawFighterInfo(`${enemy.damagepoints}%`, posinfoenemy, infoy, enemy.color, Math.floor(FIGHTERSSIZE*0.8))


    if(!pause){   
        requestAnimationFrame(update);
    };
}

init()
update();