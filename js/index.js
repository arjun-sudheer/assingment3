async function fetchMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA3Yzc2NzgwMzNkYzY3MjRhOTc4NmFmNzE2YjQzOSIsInN1YiI6IjY0N2M0NDE0MTc0OTczMDBkZTY2YzJiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TOu08ijqtkF_tDatViWnT6MduA35RhYQX7bfEmUySc0'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }

}

async function displayMovies() {
    try {
        const movies = await fetchMovies();
        const movieCardsContainer = document.getElementById('movieCards');
        movies.forEach(movie => {
            const card = createMovieCard(movie);
            movieCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}


function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;
    card.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    card.appendChild(cardContent);

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = movie.title;
    cardContent.appendChild(title);

    const overview = document.createElement('p');
    overview.classList.add('card-description');
    overview.textContent = movie.overview;
    cardContent.appendChild(overview);

    return card;
}


function updateMovieCard(card, movie) {
    card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    card.querySelector('img').alt = movie.title;
    card.querySelector('.card-title').textContent = movie.title;
    card.querySelector('.card-description').textContent = movie.overview;
}

const movieCardsContainer = document.getElementById('movieCards');
const initialMovieCard = createMovieCard(fetchMovies()[0]);
movieCardsContainer.appendChild(initialMovieCard);

// Example of updating movie data and populating more cards
const updatedMovieData = {
    ...movieData,
    title: "Updated Movie Title",
    overview: "This is the updated movie overview."
};
