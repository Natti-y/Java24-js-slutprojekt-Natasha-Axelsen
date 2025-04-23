// hanterar interaktioner i ett film- och person-sökningsgränssnitt.
// hämtar och visar topprankade eller populära filmer, hanterar sökningar efter filmer och personer,
// sorterar resultaten baserat på titel eller popularitet i stigande eller fallande ordning.


import { fetchTopRated, fetchPopular, searchMulti } from './api.js';
import { renderMovies, renderPersons } from './ui/render.js';


import { Movie } from './models/movies.js';
import { Person } from './models/person.js';

import { sortItems } from './ui/sort.js';

const topRatedBtn = document.getElementById('btn-top-rated');
const popularBtn = document.getElementById('btn-popular');
const searchForm = document.getElementById('search-form');
const results = document.getElementById('results');

let currentData = [];


// Topprankade filmer
topRatedBtn.addEventListener('click', async () => {
  try {
    const movies = await fetchTopRated();
    currentData = movies.map(m => new Movie(m));
    renderMovies(currentData);
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Kunde inte hämta topprankade filmer. Försök igen senare.</p>';
  }
});

// Populära filmer
popularBtn.addEventListener('click', async () => {
  try {
    const movies = await fetchPopular();
    currentData = movies.map(m => new Movie(m));
    renderMovies(currentData);
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Kunde inte hämta populära filmer. Försök igen senare.</p>';
  }
});

// Söker efter film/person
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  try {
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

    //ifall det inte finns något resultat
    if (movies.length === 0 && persons.length === 0) {
      results.innerHTML = '<p>Inga resultat hittades.</p>';
    }
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Ett fel uppstod vid sökningen. Kontrollera din internetanslutning eller försök igen senare.</p>';
  }
});

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
