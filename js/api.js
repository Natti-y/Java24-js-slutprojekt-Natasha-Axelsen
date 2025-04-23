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

export async function searchMulti(query) {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(query)}`);
  const data = await res.json();

  const movies = data.results.filter(item => item.media_type === 'movie');
  const persons = data.results.filter(item => item.media_type === 'person');

  return { movies, persons };
}

export { IMG_URL };

//Extra funktion (Trailer?)
//Måste hämta extra data med movieID samt kontrollera om den finns på yt
export async function fetchMovieTrailer(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  }
  
  export async function fetchMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=sv-SE`);
    const data = await res.json();
    return data;
  }
  