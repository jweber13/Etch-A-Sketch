
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
            console.log(`darken mode: ${this.style.background}`);
            colorVal = adjust(RGBToHex, this.style.background, -15);
            console.log(`new color is: ${colorVal}`);
            this.style.background = colorVal;
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

function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(')')[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
}

function adjust(RGBToHex, rgb, amount) {
    let color = RGBToHex(rgb);
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        )
    );
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
            row.style.border = "0.05px solid #E5E4E2";
            row.style.flex = "1"; //flex 1 allows flex grow & flex shrink
            row.style.background = "#FFFFFF";
            row.addEventListener("mousedown", mouseDownListener);
            row.addEventListener("mouseenter", changeColor);
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

window.onresize = () => {
    //sliderValue();
}