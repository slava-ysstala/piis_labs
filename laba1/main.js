let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?');
while (numberOfFilms == null || numberOfFilms.trim() === "" || isNaN(numberOfFilms)) {
    numberOfFilms = prompt('Пожалуйста, введите корректное число: Сколько фильмов вы уже посмотрели?');
}
const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};
for (let i = 0; i < numberOfFilms; i++) {
    let movieTitle;
    let movieRating;
    do {
        movieTitle = prompt('Один из последних просмотренных фильмов?');
        if (movieTitle === null || movieTitle.trim() === "" || movieTitle.length > 50) {
            alert('Пожалуйста, введите корректное название фильма (не более 50 символов).');
        }
    } while (movieTitle === null || movieTitle.trim() === "" || movieTitle.length > 50);
    do {
        movieRating = prompt('На сколько оцените его?');
        if (movieRating === null || movieRating.trim() === "" || isNaN(movieRating)) {
            alert('Пожалуйста, введите корректную оценку.');
        }
    } while (movieRating === null || movieRating.trim() === "" || isNaN(movieRating));
    personalMovieDB.movies[movieTitle] = movieRating;
}
console.log(personalMovieDB);