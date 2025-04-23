//Import
import { IMG_URL, fetchMovieTrailer } from '../api.js';

const results = document.getElementById('results');

// Trailer-länk
export async function renderMovies(movies) {
  results.innerHTML = '';

  for (const movie of movies) {
    const trailerUrl = await fetchMovieTrailer(movie.id);

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Release: ${movie.release_date}</p>
      <p>Betyg: ${movie.vote_average}</p>
      ${trailerUrl ? `<a href="${trailerUrl}" target="_blank">Trailer</a>` : '<p>Ingen trailer</p>'}
    `;

    results.appendChild(card);
  }
}

// Rendera personer
export function renderPersons(persons) {
  results.innerHTML = '';

  persons.forEach(person => {
    const card = document.createElement('div');
    card.classList.add('card');

    const knownFor = person.known_for.map(item =>
      item.media_type === 'movie'
        ? `Film: ${item.title}`
        : `TV: ${item.name}`
    ).join('<br>');

    card.innerHTML = `
      <img src="${IMG_URL + person.profile_path}" alt="${person.name}" />
      <h3>${person.name}</h3>
      <p>Känd för: ${person.known_for_department}</p>
      <p>${knownFor}</p>
    `;

    results.appendChild(card);
  });
}
