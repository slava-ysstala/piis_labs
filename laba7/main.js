const svgCanvas = document.getElementById('svgCanvas');
let isDrawing = false;
let startX, startY;

svgCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

svgCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const shapeType = document.querySelector('input[name="shape"]:checked').value;
    svgCanvas.innerHTML = '';

    if (shapeType === 'circle') {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        const circle = `<circle cx="${startX}" cy="${startY}" r="${radius}" fill="none" stroke="black"/>`;
        svgCanvas.innerHTML = circle;
    } else {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        const rect = `<rect x="${startX}" y="${startY}" width="${width}" height="${height}" fill="none" stroke="black"/>`;
        svgCanvas.innerHTML = rect;
    }
});

svgCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

svgCanvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});