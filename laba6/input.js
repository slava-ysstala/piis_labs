const targets = document.querySelectorAll('.target');
let isDragging = false;
let isPinned = false;
let offsetX, offsetY, originalPosition, originalWidth, originalHeight;

targets.forEach(target => {
    target.addEventListener('mousedown', (e) => {
        if (!isPinned) {
            isDragging = true;
            offsetX = e.clientX - target.getBoundingClientRect().left;
            offsetY = e.clientY - target.getBoundingClientRect().top;
            originalPosition = { left: target.style.left, top: target.style.top };
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
            isDragging = false;
        }
    });

    // Добавляем обработчики для сенсорного экрана
    target.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Предотвращаем прокрутку страницы
        if (!isPinned) {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - target.getBoundingClientRect().left;
            offsetY = touch.clientY - target.getBoundingClientRect().top;
            originalPosition = { left: target.style.left, top: target.style.top };
        } else {
            isPinned = true;
            target.style.backgroundColor = 'blue';
        }
    });

    target.addEventListener('touchend', () => {
        isDragging = false;
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

document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Предотвращаем прокрутку страницы
    if (isDragging) {
        const target = [...targets].find(t => isDragging && t.contains(e.target));
        if (target) {
            const touch = e.touches[0];
            target.style.left = `${touch.clientX - offsetX}px`;
            target.style.top = `${touch.clientY - offsetY}px`;
        }
    } else if (isPinned) {
        const target = [...targets].find(t => t.style.backgroundColor === 'blue');
        if (target) {
            const touch = e.touches[0];
            target.style.left = `${touch.clientX - offsetX}px`;
            target.style.top = `${touch.clientY - offsetY}px`;
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
            isDragging = false;
        }
        if (isPinned) {
            const target = [...targets].find(t => t.style.backgroundColor === 'blue');
            if (target) {
                target.style.left = originalPosition.left;
                target.style.top = originalPosition.top;
                target.style.backgroundColor = 'red';
                isPinned = false;
            }
        }
    }
});

// Обработка второго касания
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        isDragging = false;
        const target = [...targets].find(t => t.style.backgroundColor === 'blue');
        if (target) {
            target.style.left = originalPosition.left;
            target.style.top = originalPosition.top;
            target.style.backgroundColor = 'red';
            isPinned = false;
        }
    }
});

// Изменение размера объекта
targets.forEach(target => {
    target.addEventListener('mousedown', (e) => {
        if (e.offsetX > target.clientWidth - 10 && e.offsetY > target.clientHeight - 10) {
            originalWidth = target.clientWidth;
            originalHeight = target.clientHeight;
            target.style.cursor = 'nwse-resize';
            target.addEventListener('mousemove', resize);
        }
    });

    target.addEventListener('mouseup', (e) => {
        target.style.cursor = 'auto';
        target.removeEventListener('mousemove', resize);
    });

    target.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch.clientX > target.getBoundingClientRect().right - 10 && touch.clientY > target.getBoundingClientRect().bottom - 10) {
            originalWidth = target.clientWidth;
            originalHeight = target.clientHeight;
            target.style.cursor = 'nwse-resize';
            target.addEventListener('touchmove', resize);
        }
    });

    target.addEventListener('touchend', (e) => {
        target.style.cursor = 'auto';
        target.removeEventListener('touchmove', resize);
    });
});

// Функция изменения размера
function resize(e) {
    const target = e.target;
    const newWidth = Math.max(50, originalWidth + (e.clientX - target.getBoundingClientRect().left));
    const newHeight = Math.max(50, originalHeight + (e.clientY - target.getBoundingClientRect().top));
    target.style.width = `${newWidth}px`;
    target.style.height = `${newHeight}px`;
}