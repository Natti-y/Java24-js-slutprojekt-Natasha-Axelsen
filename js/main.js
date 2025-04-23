// Importerar funktioner
import { fetchTopRated, fetchPopular, searchMulti } from './api.js';
import { renderMovies, renderPersons } from './ui/render.js';

// Importerar klasser
import { Movie } from './models/movies.js';
import { Person } from './models/person.js';

// Importerar sorteringsfunktion
import { sortItems } from './ui/sort.js';

// HTML-element
const topRatedBtn = document.getElementById('btn-top-rated');
const popularBtn = document.getElementById('btn-popular');
const searchForm = document.getElementById('search-form');
const results = document.getElementById('results');

// För sortering
let currentData = [];

// Topprankade filmer
topRatedBtn.addEventListener('click', async () => {
  const movies = await fetchTopRated();
  currentData = movies.map(m => new Movie(m));
  renderMovies(currentData);
});

// Populära filmer
popularBtn.addEventListener('click', async () => {
  const movies = await fetchPopular();
  currentData = movies.map(m => new Movie(m));
  renderMovies(currentData);
});

// Söker efter film/person
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();

  if (!query) return;

  const { movies, persons } = await searchMulti(query);

  results.innerHTML = '';

  if (movies.length > 0) {
    currentData = movies.map(m => new Movie(m));
    renderMovies(currentData);
  }

  if (persons.length > 0) {
    currentData = persons.map(p => new Person(p));
    renderPersons(currentData);
  }

  //Meddelande ifall sökningen inte ger några resultat
  if (movies.length === 0 && persons.length === 0) {
    results.innerHTML = '<p>Inga resultat hittades.</p>';
  }
});

// Sorteringsfunktion
function applySort(type, order) {
  const sorted = sortItems(currentData, type, order);
  if (sorted[0]?.title) {
    renderMovies(sorted);
  } else {
    renderPersons(sorted);
  }
}

// Sorteringsknappar
document.getElementById('sort-title-asc').addEventListener('click', () => applySort('title', 'asc'));
document.getElementById('sort-title-desc').addEventListener('click', () => applySort('title', 'desc'));
document.getElementById('sort-popularity-asc').addEventListener('click', () => applySort('popularity', 'asc'));
document.getElementById('sort-popularity-desc').addEventListener('click', () => applySort('popularity', 'desc'));
