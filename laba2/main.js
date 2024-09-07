const personalMovieDB = {
    privat: true,
    movies: {
        "Фильм 1": 8.5,
        "Фильм 2": 7.0,
        "Фильм 3": 9.2
    }
};
function displayMovies() {
    if (personalMovieDB.privat) {
        return; // Не выводим таблицу, если privat true
    }
    const movieTableDiv = document.getElementById('movie-table');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    // Заголовки таблицы
    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Название фильма';
    const ratingHeader = document.createElement('th');
    ratingHeader.textContent = 'Оценка';
    headerRow.appendChild(titleHeader);
    headerRow.appendChild(ratingHeader);
    table.appendChild(headerRow);
    // Заполнение таблицы данными из movies
    for (const [title, rating] of Object.entries(personalMovieDB.movies)) {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const ratingCell = document.createElement('td');
        titleCell.textContent = title;
        ratingCell.textContent = rating;
        row.appendChild(titleCell);
        row.appendChild(ratingCell);
        table.appendChild(row);
    }
    movieTableDiv.appendChild(table);
}
// Вызов функции для отображения фильмов
displayMovies();
