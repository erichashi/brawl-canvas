const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let gSounds = {};
let gImages = {};

const virtualWidth = 1366;
const virtualHeight = 700;

let canvas_height = 0;
let canvas_width = 0;


window.onload = () => {
    
    canvas_width = Math.floor(gHTMLElements['body'].clientWidth * 0.9);
    canvas_height = Math.floor(canvas_width / 1.786);

    canvas.width = virtualWidth;
    canvas.height = virtualHeight;

    canvas.style.width = `${canvas_width}px`;
    canvas.style.height = `${canvas_height}px`;


    preload({
        "groundleftforest":  "assets/img/forest/1.png",
        "groundcenterforest":  "assets/img/forest/2.png",
        "groundrightforest":  "assets/img/forest/3.png",

        "groundleftwinter":  "assets/img/winter/1.png",
        "groundcenterwinter":  "assets/img/winter/2.png",
        "groundrightwinter":  "assets/img/winter/3.png",

    }, {
        "applause": "assets/sounds/applause.wav",
        "explosion": "assets/sounds/explosion.wav",
        "jab": "assets/sounds/jab.wav",
        
    }, () => {})
}

function preload(imgfiles, audiofiles, callback){
    let val = 0;
    let goal = Object.keys(imgfiles).length + Object.keys(audiofiles).length; 


    Object.keys(imgfiles).forEach(imgkeys => {
        let img = new Image();
        img.src = imgfiles[imgkeys];
        gImages[imgkeys] = img;
        img.onload = () => {
            val++;
            if(val >= goal) callback();
        };
    });

    Object.keys(audiofiles).forEach(audiokeys => {
        let audio = new Audio(audiofiles[audiokeys]);
        gSounds[audiokeys] = audio;
        audio.volume = .2;
        val++;
        if(val >= goal) callback();
    });

}


let pause = false;

let player;
let fighters;

let particles;
let ground;

let joy = false;

let frame;

function create(color, numFighters, arena){
    
    particles = [];
    ground = [];
    fighters = [];
    // document.querySelector('#joystick').remove()
    
    // create joystick se touch 
    if(gHTMLElements['body'].clientWidth < 700 || isTouchDevice() ){

        //se eh a primeira vez que cria joy
        if(!joy) {
            joy = new JoyStick('joymove-container', {
                internalFillColor: "#c8c8c8",
                internalStrokeColor: "#c0c0c0",
                externalStrokeColor: "#c8c8c8",
            });
        }

    } else {
        // se nao eh touch, remover botao de atacar que ja vem no html
        //try catch pq joyatack ja pode ter sido removido antes
        try {
            document.querySelector('#joyatack').remove();
        } catch (error) {}
    }

    //variavel para ajudar em onde colocar o boneco
    let positerator = 1;

    for (let i = 0; i < numFighters; i ++) {
        
        //criar uma div para armazenar o DamagePoint de cada boneco
        let root = document.createElement('div');
        //bolinha
        let colorspan = document.createElement('span');
        colorspan.className = 'color-span';
        //percentual
        let dpspan = document.createElement('span');
        dpspan.innerHTML = "0%"

        //pos eh a posicao x onde seta colocado o boneco. serve como um "space-evenly". faz a conta que da mais ou menos isso
        let pos = (positerator)*(NUMBLOCKS * BLOCKSIZE) / Math.pow(numFighters, 2) + GROUNDSPACES;
        positerator += numFighters;

        //se for o player
        if(i === 0){

            //definir as cores especificas do player
            root.style.color = color;
            colorspan.style.backgroundColor = color;

            player = new Fighter(pos, canvas.height/2, color, dpspan);

            //adicionar na arry fighters
            fighters.push(player);


        } else {

            //cor aleatoria para os demais
            let enemycolor = `rgba(
                ${randomFromRange(1, 255)},
                ${randomFromRange(1, 255)},
                ${randomFromRange(1, 255)},
                1 
            )`;

            //idem
            root.style.color = enemycolor;
            colorspan.style.backgroundColor = enemycolor;

            fighters.push(new BotFighter(pos, canvas.height/2, enemycolor, dpspan))
            
        }
        
        //adicionar o elemento no HTML
        root.append(colorspan, dpspan);
        document.querySelector("#fightersinfo-container").appendChild(root);


    }

    //para cada espada de cada boneco, definir que os inimigos (dar dano) sao todos os fighters menos ele proprio
    fighters.forEach(fighter => {
        fighter.sword.others = fighters.filter(f => f !== fighter);
    })

    //set background 
    // gImages['currentBG'] = gImages[`bg${n}`]
    background: ;

    // 'body'.style.background = 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("assets/img/forest/BG.png")';

    gHTMLElements['body'].style.background = `center url("assets/img/${arena}/BG.png")`;


    //set ground 
    drawGround(arena);

}

function update(){
    // ctx.drawImage(gImages['currentBG'], 0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    fighters.forEach(f => f.update());

    ground.forEach(g => g.render());

    particles.forEach((part, parti) => {
        if(part.remove) particles.splice(parti, 1);

        part.update();
    });

    if(!pause) frame = requestAnimationFrame(update);
    
}

