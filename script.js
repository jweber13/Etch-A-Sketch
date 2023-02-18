
const DEFAULT_COLOR = "#000000";

let COLOR_MODE = "";
let isMouseDown = false;
let colorVal = DEFAULT_COLOR;

const gridContainer = document.querySelector(".sketch-grid");
const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
const clearBtn = document.getElementById("clear-btn");
const erasorBtn = document.getElementById("erase-btn");
const colorInput = document.getElementById("color-sel");
const darkBtn = document.getElementById("dark-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
let w = gridContainer.offsetWidth;
let h = gridContainer.offsetHeight;

/* Event Listeners */
range.addEventListener("input", sliderValue);
colorInput.addEventListener("input", setColor);
clearBtn.addEventListener("click", GridInit);
darkBtn.addEventListener("click", setDarken);
rainbowBtn.addEventListener("click", setRainbow);
erasorBtn.addEventListener("click", setErasor);

/* Functions */ 

function sliderValue() {
    addRows(range.value, range.value);
}

function clearGrid() {
  gridContainer.innerHTML = "";
}

function GridInit() {
    clearGrid();
    sliderValue();
    colorVal = DEFAULT_COLOR;
}

//Master Color
function changeColor() {
  if (isMouseDown) {
    switch (COLOR_MODE){
        case "Color" : 
            this.style.background = colorVal;
            console.log(`color mode: ${colorVal}`);
            break;
        case "Darken" :
            this.style.background = "black";
            console.log(`darken mode: ${colorVal}`);
            break;
        case "Rainbow" :
            colorVal = random_rgb();
            this.style.background = colorVal;
            break;
        case "Erasor" :
            this.style.background = "#FFFFFF"
            break;
        default:
            this.style.background = DEFAULT_COLOR;
    }
  } else {
    console.log(isMouseDown)
  }
}

function buttonChange() {
    switch (COLOR_MODE) {
        case "Rainbow" :
            rainbowBtn.classList.add("active");
            colorInput.classList.remove("active");
            erasorBtn.classList.remove("active");
            darkBtn.classList.remove("active");
            break;
        case "Darken" :
            rainbowBtn.classList.remove("active");
            colorInput.classList.remove("active");
            erasorBtn.classList.remove("active");
            darkBtn.classList.add("active");
            break;
        case "Erasor" :
            rainbowBtn.classList.remove("active");
            colorInput.classList.remove("active");
            erasorBtn.classList.add("active");
            darkBtn.classList.remove("active");
            break;
        default:
            rainbowBtn.classList.remove("active");
            colorInput.classList.add("active");
            erasorBtn.classList.remove("active");
            darkBtn.classList.remove("active");
    }
}

function setColor(e) {
    COLOR_MODE = "Color";
    buttonChange();
    colorVal = e.target.value;
    console.log(colorVal);
    console.log("color set");
}

function setDarken() {
    COLOR_MODE = "Darken";
    buttonChange();
    console.log("darken set");
}

function setRainbow() {
    COLOR_MODE = "Rainbow";
    buttonChange();
    console.log("rainbow set");
}

function setErasor() {
    COLOR_MODE = "Erasor";
    buttonChange();
    console.log("erasor set");
}

function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function darkenShade(hexColor) {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + -10;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + -10;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + -10;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
}

let mouseDownListener = () => {
  isMouseDown = true;
}
let mouseUpListener = () => {
  isMouseDown = false;
}

function addRows(ro, col){
    clearGrid();
    for(let i=0; i<col;i++){
        let column = document.createElement('div');
        column.className = 'column';
        column.style.width = `${w/col}px`;
        column.style.display = "flex"; //size adjusted on resize
        column.style.flexDirection = "column";
        for(let j=0;j<ro;j++){
            let row = document.createElement('div');
            row.className = 'row';
            row.style.height = `${h/ro}px`;
            row.style.border = ".5px solid black";
            row.style.flex = "1"; //flex 1 allows flex grow & flex shrink
            row.addEventListener("mousedown", mouseDownListener);
            row.addEventListener("mousemove", changeColor);
            row.addEventListener("mouseup", mouseUpListener);
            column.appendChild(row);
        }
        gridContainer.appendChild(column);
    }
}

window.onload = () => {
  addRows(8,8);
  colorVal = DEFAULT_COLOR;
}