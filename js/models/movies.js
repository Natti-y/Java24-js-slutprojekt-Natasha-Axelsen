export class Movie {
    #id;
    #title;
    #poster_path
    #release_date
    #vote_average
    #popularity

    // Bas-URL för bilder
static IMG_URL = 'https://image.tmdb.org/t/p/w500';

constructor({ id, title, poster_path, release_date, vote_average, popularity }) {
    this.#id = id;
    this.#title = title;

    // Bygger URL:en för poster_path
    this.#poster_path = poster_path ? `${Movie.IMG_URL}${poster_path}` : null;
    this.#release_date = release_date;
    this.#vote_average = vote_average;
    this.#popularity = popularity;
  }

  //Getters
    get id() {
        return this.#id;
      }

    get title() {
        return this.#title;
      } 

    get poster_path() {
        return this.#poster_path;
      }
    
    get popularity(){
        return this.#popularity
    }

    get release_date(){
        return this.#release_date
    }

    get vote_average(){
        return this.#vote_average
    }

    get release_date(){
        return this.#release_date
    }

    getDisplayData() {
      return {
        id: this.#id,
        title: this.#title,
        poster_path: this.#poster_path,
        release_date: this.#release_date,
        vote_average: this.#vote_average,
        popularity: this.#popularity,
      };
    }
  }
  