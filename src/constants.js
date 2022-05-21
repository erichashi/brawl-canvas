const TIMETORESPAWN = 200;
const NUMPARTICLES = 50;
const FIGHTERSSIZE = 25;
const NUMBLOCKS = 10;
const SWORDLEN = 40;
const SPEED = 5;
const JUMP = 12;
const GRAVITY = .5;

let BOUNDS = 136;
let GROUNDSPACES = 170;
let GROUNDHEIGHT = 460;
let BLOCKSIZE = 100;

const gHTMLElements = {
    "mainpage": document.getElementById('main-page'),
    "choosecolorpage": document.getElementById('choose-color'),
    "choosearenapage": document.getElementById('choose-arena'),
    "tutorial": document.getElementById('tutorial'),
    "canvascontainer": document.getElementById('canvas-container'),

    "body": document.querySelector('body'),
    "joyatack": document.querySelector('#joyatack')
};

// function setConsts(){

//     BOUNDS = Math.floor(canvas.width/10)

//     GROUNDSPACES = Math.floor(canvas.width/8);
//     GROUNDHEIGHT = Math.floor(canvas.height-canvas.height/3);
    
//     BLOCKSIZE = Math.floor((canvas.width - GROUNDSPACES*2) / NUMBLOCKS);
        
// }
