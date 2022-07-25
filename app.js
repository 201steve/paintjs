const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "";
const CANVAS_SIZE = 700;

ctx.filStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

const colorPicker = ({
  target: {
    style: { backgroundColor },
  },
}) => {
  const color = backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const stopPainting = () => {
  painting = false;
};

const startPanting = () => {
  painting = true;
};

const onMouseMove = ({ offsetX, offsetY }) => {
  const x = offsetX;
  const y = offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleRange = (e) => {
  ctx.lineWidth = e.target.value;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

const handleCM = (e) => {
  e.preventDefault();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPanting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) => {
  addEventListener("click", colorPicker);
});

if (colors) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
