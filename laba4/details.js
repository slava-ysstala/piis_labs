document.addEventListener('DOMContentLoaded', () => {
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));
    const shirtImage = document.getElementById('shirt-image');
    let currentColor = Object.keys(selectedShirt.colors)[0]; // Начальный цвет - белый

    if (selectedShirt) {
        document.getElementById('shirt-name').textContent = selectedShirt.name;
        document.getElementById('shirt-price').textContent = selectedShirt.price;
        document.getElementById('shirt-description').textContent = selectedShirt.description;

        // Отображаем изображение по умолчанию (Front для цвета по умолчанию)
        shirtImage.src = selectedShirt.colors[currentColor].front;

        // Генерируем кнопки для выбора цвета
        const colorButtonsContainer = document.getElementById('color-buttons');
        for (const color in selectedShirt.colors) {
            const colorButton = document.createElement('button');
            colorButton.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            colorButton.style.backgroundColor = color; // Устанавливаем цвет кнопки
            colorButton.onclick = () => {
                currentColor = color; // Обновляем текущий цвет
                shirtImage.src = selectedShirt.colors[color].front; // Устанавливаем переднее изображение
            };
            colorButtonsContainer.appendChild(colorButton);
        }

        // Обработка кнопок Front и Back
        document.getElementById('front-button').onclick = () => {
            shirtImage.src = selectedShirt.colors[currentColor].front;
        };

        document.getElementById('back-button').onclick = () => {
            shirtImage.src = selectedShirt.colors[currentColor].back;
        };
    }

    document.getElementById('back-to-main').onclick = () => {
        window.history.back(); // Возвращает на предыдущую страницу
    };
});