const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isDrawing = false;
let startX, startY;
let painting = [];
let currentShape = null;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    painting.forEach(shape => drawShape(shape)); // Отрисовка всех фигур

    const shapeType = document.querySelector('input[name="shape"]:checked').value;

    if (shapeType === 'circle') {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        currentShape = { type: 'circle', x: startX, y: startY, radius: radius };
        drawShape(currentShape);
    } else {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        const rectX = (width < 0) ? e.offsetX : startX;
        const rectY = (height < 0) ? e.offsetY : startY;
        const rectWidth = Math.abs(width);
        const rectHeight = Math.abs(height);
        currentShape = { type: 'rect', x: rectX, y: rectY, width: rectWidth, height: rectHeight };
        drawShape(currentShape);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    if (currentShape) {
        painting.push(currentShape); // Сохранение текущей фигуры
        currentShape = null;
    }
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    if (currentShape) {
        painting.push(currentShape); // Сохранение текущей фигуры
        currentShape = null;
    }
});

function drawShape(shape) {
    ctx.beginPath();
    if (shape.type === 'circle') {
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
}
