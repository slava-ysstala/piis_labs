const svgCanvas = document.getElementById('svgCanvas');
let isDrawing = false;
let startX, startY;
let figure = null;
let painting = null;

svgCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

svgCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const shapeType = document.querySelector('input[name="shape"]:checked').value;

    if (shapeType === 'circle') {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        figure = `<circle cx="${startX}" cy="${startY}" r="${radius}" fill="none" stroke="black"/>`;
    } else {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        const rectX = (width < 0) ? e.offsetX : startX;
        const rectY = (height < 0) ? e.offsetY : startY;
        const rectWidth = Math.abs(width);
        const rectHeight = Math.abs(height);
        figure = `<rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" fill="none" stroke="black"/>`;
    }
    svgCanvas.innerHTML = painting + figure;

});

svgCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
    painting += figure;
});

svgCanvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    painting += figure;
});
