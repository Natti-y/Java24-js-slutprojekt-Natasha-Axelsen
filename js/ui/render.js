//Renderar filmer och personer från API:n 
//inklusive information som trailer-länk, betyg, popularitet och detaljer om filmer i en modal  
//hanterar användarinteraktioner för att visa ytterligare information

import { IMG_URL, fetchMovieTrailer, fetchMovieDetails } from '../api.js';

const results = document.getElementById('results');
let lastMovies = [];

// Trailer-länk + Mer info
export async function renderMovies(movies) {
    results.innerHTML = '';
  
    for (const movie of movies) {
      // Kontrollera att filmen har ett giltigt ID
      //film saknade ID eller trailern inte fanns, försökte koden ändå hämta data
      // vilket ledde till 404-fel eller kraschade find()
      if (!movie.id) {
        console.warn('Film saknar ID, hoppar över trailerhämtning.');
        continue;
      }
  
      const trailerUrl = await fetchMovieTrailer(movie.id);
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      card.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>Release: ${movie.release_date}</p>
        <p>Betyg: ${movie.vote_average}</p>
        <p>Popularitet: ${movie.popularity}</p> 
        ${trailerUrl ? `<a href="${trailerUrl}" target="_blank">Trailer</a>` : '<p>Ingen trailer</p>'}
        <button class="info-btn" data-id="${movie.id}">Mer info</button>
      `;
  
      results.appendChild(card);
    }
  
    // Mer info-knapparna
    document.querySelectorAll('.info-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const details = await fetchMovieDetails(id);
        showDetails(details);
      });
    });
}

function showDetails(movie) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  modal.classList.remove('hidden');

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
    <p><strong>Originaltitel:</strong> ${movie.original_title}</p>
    <p><strong>Språk:</strong> ${movie.original_language}</p>
    <p><strong>Längd:</strong> ${movie.runtime} minuter</p>
    <p><strong>Genre:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
    <p><strong>Beskrivning:</strong> ${movie.overview}</p>
    <p><strong>Budget:</strong> ${movie.budget.toLocaleString()} USD</p>
    <p><strong>Popularitet:</strong> ${movie.popularity}</p>
    <button id="back-btn">Tillbaka till lista</button>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
    renderMovies(lastMovies);
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

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
