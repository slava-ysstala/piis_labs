const targets = document.querySelectorAll('.target');
let isDragging = false;
let isPinned = false;
let offsetX, offsetY, originalPosition;
const originalStates = new Map();

targets.forEach(target => {
    // Сохраняем начальные размеры и позиции
    originalStates.set(target, {
        position: { left: target.style.left || '0px', top: target.style.top || '0px' },
        width: target.clientWidth,
        height: target.clientHeight
    });

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

    // Обработчики для сенсорного экрана
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
        targets.forEach(target => {
            const originalState = originalStates.get(target);
            target.style.left = originalState.position.left;
            target.style.top = originalState.position.top;
            target.style.width = `${originalState.width}px`;
            target.style.height = `${originalState.height}px`;
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        });
        isDragging = false;
        isPinned = false;
    }
});

// Обработка второго касания
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        isDragging = false;
        const target = [...targets].find(t => t.style.backgroundColor === 'blue');
        if (target) {
            const originalState = originalStates.get(target);
            target.style.left = originalState.position.left;
            target.style.top = originalState.position.top;
            target.style.width = `${originalState.width}px`;
            target.style.height = `${originalState.height}px`;
            target.style.backgroundColor = 'red';
            isPinned = false;
        }
    }
});
