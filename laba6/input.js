const targets = document.querySelectorAll('.target');
let isDragging = false;
let isPinned = false;
let offsetX, offsetY;
const originalPositions = new Map();

targets.forEach(target => {
    // Сохраняем начальные позиции
    originalPositions.set(target, {
        left: target.style.left || '0px',
        top: target.style.top || '0px'
    });

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

    target.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            // Два пальца - сброс позиций
            resetPositions();
        } else if (!isPinned) {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - target.getBoundingClientRect().left;
            offsetY = touch.clientY - target.getBoundingClientRect().top;
        }
    });

    target.addEventListener('touchend', () => {
        isDragging = false;
    });

    target.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            // Если два пальца касаются, сбрасываем позиции
            resetPositions();
        } else if (isDragging) {
            const touch = e.touches[0];
            target.style.left = `${touch.clientX - offsetX}px`;
            target.style.top = `${touch.clientY - offsetY}px`;
        }
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
        resetPositions();
    }
});

// Функция для сброса позиций
function resetPositions() {
    targets.forEach(target => {
        const originalPosition = originalPositions.get(target);
        target.style.left = originalPosition.left;
        target.style.top = originalPosition.top;
        target.style.backgroundColor = 'red'; // Возвращаем цвет
    });
    isDragging = false;
    isPinned = false;
}
