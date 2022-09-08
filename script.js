const container = document.querySelector('.container');
const range = document.querySelector('.size span');
buttons = document.querySelectorAll('button');
let color = 'black';
let customColor = '#ff0000'
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('color')) {
            changeColor(customColor);
            activateButton(button);
        } else if(button.classList.contains('black')) {
            changeColor('black');
            activateButton(button)
        } else if(button.classList.contains('random')) {
            changeColor('random');
            activateButton(button)
        } else if(button.classList.contains('eraser')) {
            changeColor('white');
            activateButton(button)
        }
    })
})

function updateSize(size) {
    populateGrid(size);
    range.textContent = `${size} x ${size}`;
}

function populateGrid(size) {
    let grids = container.querySelectorAll('div');
    grids.forEach((div) => div.remove());
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let area = size * size;
    for (let i=0; i < area; i++) {
        const grid = document.createElement('div');
        grid.style.backgroundColor = 'white';
        container.insertAdjacentElement('beforeend', grid);
        grid.addEventListener('mouseover', colorGrid);
        grid.addEventListener('mousedown', colorGrid);
    }
}

populateGrid(16);

function changeColor(choice) {
    color = choice;
}

function resetGrid() {
    let grids = container.querySelectorAll('div');
    grids.forEach((div) => div.style.backgroundColor = 'white');
}

function colorGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) return
        if (color === 'random') {
            this.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        } else this.style.backgroundColor = color
}

function activateButton(btn) {
    buttons.forEach((selection) => selection.classList.remove('activate'));
    btn.classList.add('activate');
}
