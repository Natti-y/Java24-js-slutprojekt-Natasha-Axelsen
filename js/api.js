// innehåller funktioner för att hämta topprankade filmer, populära filmer, trailers mm. samt göra sökningar
// alla API-anrop returnerar ett urval av resultat och använder svenska som språk.


const API_KEY = '3ef83f8fea2e17b7eff7d4be9c577f7c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE`);
  const data = await res.json();
  return data.results.slice(0, 10);
}

export async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE`);
  const data = await res.json();
  return data.results.slice(0, 10);
}

// Använder TMDB:s "multi search"-endpoint för att hämta både filmer och personer
export async function searchMulti(query) {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(query)}`);
  const data = await res.json();

  const movies = data.results.filter(item => item.media_type === 'movie');
  const persons = data.results.filter(item => item.media_type === 'person');

  return { movies, persons };
}

export { IMG_URL };

//hämtar extra data med movieID samt kontrollerar om den finns på yt
export async function fetchMovieTrailer(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    //Fallback
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  }
  
  export async function fetchMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=sv-SE`);
    const data = await res.json();
    return data;
  }
  