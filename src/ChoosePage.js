//LANDING PAGE
let nextMain = () => {
    gHTMLElements['mainpage'].style.display = 'none';
    gHTMLElements['choosecolorpage'].style.display = 'flex';
}

let radios = document.querySelectorAll('input[name="color"]');
let nxtbtn = document.querySelector('#color-button');
let nxtbtn2 = document.querySelector('#arena-button');

radios.forEach(cradio =>{
    cradio.addEventListener('click', () => {
        nxtbtn.style.opacity = 1;
        nxtbtn.disabled = false;
    })
})

let arena;
let color;
let numFighters;

//COLOR PAGE
let nextColor = () => {
    color = document.querySelector('input[name="color"]:checked').value;

    gHTMLElements['choosecolorpage'].style.display = 'none';
    gHTMLElements['choosearenapage'].style.display = 'flex';
    
    radios = document.querySelectorAll('input[name="bg"]');
    numFighters = document.querySelector('input[type=range]').value * 1;

    radios.forEach(cradio =>{
        cradio.addEventListener('click', () => {
            nxtbtn2.style.opacity = 1;
            nxtbtn2.disabled = false;
        });
    });
    
}

//ARENA PAGE
let nextArena = () => {

    arena = document.querySelector('input[name="bg"]:checked').value;

    gHTMLElements['choosearenapage'].style.display = 'none';
    gHTMLElements['tutorial'].style.display = 'flex';
}


//TUTORIAL PAGE
let play = () => {
    gHTMLElements['tutorial'].style.display = 'none';
    gHTMLElements['canvascontainer'].style.display = 'flex';
    
    create(color, numFighters, arena);
    update();
    
}

function returnMainPage(){
    cancelAnimationFrame(frame)

    //cor aleatoria para body e buttons
    let randomColor = `rgba(
        ${randomFromRange(1, 255)},
        ${randomFromRange(1, 255)},
        ${randomFromRange(1, 255)},
        1 
    )`;

    document.body.style.background = randomColor;
    document.querySelectorAll('button').forEach(b => b.style.color = randomColor);
    

    gHTMLElements['mainpage'].style.display = 'flex';
    gHTMLElements['canvascontainer'].style.display = 'none';

    document.querySelector("#fightersinfo-container").innerHTML = "";
}


