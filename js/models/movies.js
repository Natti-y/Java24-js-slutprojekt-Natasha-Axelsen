export class Movie {
    constructor({ id, title, poster_path, release_date, vote_average, popularity }) {
      this.id = id;
      this.title = title;
      this.poster_path = poster_path;
      this.release_date = release_date;
      this.vote_average = vote_average;
      this.popularity = popularity;
    }
  
    getDisplayData() {
      return {
        id: this.id,
        title: this.title,
        poster_path: this.poster_path,
        release_date: this.release_date,
        vote_average: this.vote_average,
        popularity: this.popularity,
      };
    }
  }
  