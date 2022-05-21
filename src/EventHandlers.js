let keysPressed = {};

addEventListener('resize', () => {
    location.reload();
})

document.addEventListener('keydown', e => {

    if (e.keyCode === 122) location.reload();

    if (e.keyCode === 13 && e.ctrlKey) {
        pause = !pause;
        update();
    }

    keysPressed[e.code] = true;
})

function wasPressed(key) {
    return keysPressed[key];
}

addEventListener('keyup', (e) => {
    keysPressed[e.code] = false;
})

gHTMLElements['joyatack'].addEventListener('touchstart', (e) => {
    gHTMLElements['joyatack'].style.background = "#c0c0c0";
    keysPressed['Space'] = true;
})

gHTMLElements['joyatack'].addEventListener('touchend', (e) => {
    gHTMLElements['joyatack'].style.background = "#c8c8c8";
})
