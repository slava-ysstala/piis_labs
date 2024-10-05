const productContainer = document.getElementById('product-container');
const modal = document.getElementById('quick-view-modal');
const modalTitle = document.getElementById('modal-title');
const modalColor = document.getElementById('modal-color'); // Добавлено
const modalImageFront = document.getElementById('modal-image-front');
const modalImageBack = document.getElementById('modal-image-back');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

shirts.forEach(shirt => {
    for (const color in shirt.colors) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const shirtName = document.createElement('h2');
        shirtName.textContent = `${shirt.name} (${color.charAt(0).toUpperCase() + color.slice(1)})`;
        productDiv.appendChild(shirtName);

        const shirtPrice = document.createElement('p');
        shirtPrice.textContent = `Цена: ${shirt.price}`;
        productDiv.appendChild(shirtPrice);

        const shirtImageFront = document.createElement('img');
        shirtImageFront.src = shirt.colors[color].front || shirt.default.front;
        shirtImageFront.alt = shirt.name || 'Майка';
        productDiv.appendChild(shirtImageFront);

        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.onclick = () => {
            modalTitle.textContent = shirt.name || 'Без названия';
            modalColor.textContent = `Цвет: ${color.charAt(0).toUpperCase() + color.slice(1)}`; // Добавлено
            modalPrice.textContent = `Цена: ${shirt.price}`;
            modalDescription.textContent = shirt.description || 'Описание отсутствует';
            modalImageFront.src = shirt.colors[color].front;
            modalImageBack.src = shirt.colors[color].back;
            modal.style.display = 'flex';
        };
        productDiv.appendChild(quickViewButton);

        productContainer.appendChild(productDiv);
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