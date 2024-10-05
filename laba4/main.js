const productContainer = document.getElementById('product-container');
const modal = document.getElementById('quick-view-modal');
const modalTitle = document.getElementById('modal-title');
const modalColor = document.getElementById('modal-color');
const modalImageFront = document.getElementById('modal-image-front');
const modalImageBack = document.getElementById('modal-image-back');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

const displayedShirts = new Set(); // Используем Set для уникальности товаров

shirts.forEach(shirt => {
    // Проверяем, есть ли уже товар с таким именем
    if (!displayedShirts.has(shirt.name)) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const shirtName = document.createElement('h2');
        shirtName.textContent = `${shirt.name} (Белый)`; // Отображаем только белый цвет
        productDiv.appendChild(shirtName);

        const shirtPrice = document.createElement('p');
        shirtPrice.textContent = `Цена: ${shirt.price}`;
        productDiv.appendChild(shirtPrice);

        const shirtImageFront = document.createElement('img');
        shirtImageFront.src = shirt.colors['white'].front; // Используем цвет по умолчанию
        shirtImageFront.alt = shirt.name || 'Майка';
        productDiv.appendChild(shirtImageFront);

        // Кнопка Quick View
        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.onclick = () => {
            modalTitle.textContent = shirt.name || 'Без названия';
            modalColor.textContent = `Цвет: Белый`; // Цвет по умолчанию
            modalPrice.textContent = `Цена: ${shirt.price}`;
            modalDescription.textContent = shirt.description || 'Описание отсутствует';
            modalImageFront.src = shirt.colors['white'].front;
            modalImageBack.src = shirt.colors['white'].back;
            modal.style.display = 'flex';
        };
        productDiv.appendChild(quickViewButton);

        // Кнопка See Page
        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        seePageButton.onclick = () => {
            localStorage.setItem('selectedShirt', JSON.stringify(shirt));
            window.location.href = 'details.html';
        };
        productDiv.appendChild(seePageButton);

        productContainer.appendChild(productDiv);
        displayedShirts.add(shirt.name); // Добавляем товар в Set
    }
});

closeModal.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};