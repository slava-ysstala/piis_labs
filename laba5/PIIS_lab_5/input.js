const targets = document.querySelectorAll('.target');
let isDragging = false;
let isPinned = false;
let offsetX, offsetY, originalPosition;

targets.forEach(target => {
    target.addEventListener('mousedown', (e) => {
        if (!isPinned) {
            isDragging = true;
            offsetX = e.clientX - target.getBoundingClientRect().left;
            offsetY = e.clientY - target.getBoundingClientRect().top;
        }
    });

    target.addEventListener('dblclick', () => {
        isPinned = true;
        target.style.backgroundColor = 'blue';
    });

    target.addEventListener('mouseup', () => {
        isDragging = false;
    });

    target.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false; // Отменяем перетаскивание, если мышь покинула элемент
        }
    });
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const target = [...targets].find(t => isDragging && t.contains(e.target));
        if (target) {
            target.style.left = `${e.clientX - offsetX}px`;
            target.style.top = `${e.clientY - offsetY}px`;
        }
    } else if (isPinned) {
        const target = [...targets].find(t => t.style.backgroundColor === 'blue');
        if (target) {
            target.style.left = `${e.clientX - offsetX}px`;
            target.style.top = `${e.clientY - offsetY}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isPinned) {
        isPinned = false;
        const target = [...targets].find(t => t.style.backgroundColor === 'blue');
        if (target) {
            target.style.backgroundColor = 'red';
        }
    }
    isDragging = false;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (isDragging) {
            isDragging = false; // Остановить перетаскивание
        }
        if (isPinned) {
            const target = [...targets].find(t => t.style.backgroundColor === 'blue');
            if (target) {
                target.style.left = originalPosition.left; // Вернуть на исходную позицию
                target.style.top = originalPosition.top;
                target.style.backgroundColor = 'red';
                isPinned = false;
            }
        }
    }
});