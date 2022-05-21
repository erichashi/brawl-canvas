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
        x + radius >= GROUNDSPACES &&
        x - radius <= canvas.width - GROUNDSPACES)
}

function drawGround(n){
    for (let i = 0; i < NUMBLOCKS; i++) {

        if(i === 0) ground.push(new Ground(GROUNDSPACES+(i*BLOCKSIZE), GROUNDHEIGHT, gImages[`groundleft${n}`]));

        else if(i === NUMBLOCKS-1) ground.push(new Ground(GROUNDSPACES+(i*BLOCKSIZE), GROUNDHEIGHT, gImages[`groundright${n}`]));

        else ground.push(new Ground(GROUNDSPACES+(i*BLOCKSIZE), GROUNDHEIGHT, gImages[`groundcenter${n}`]));
    }
}

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}