// representerar en känd person (skådespelare, regissör etc) från TMDB API.
// innehåller information som namn, profilbild, yrkesområde, populära verk och popularitetspoäng.
//  getKnownForList returnerar en lista över personens kända filmer eller tv-serier.


export class Person {
    constructor({ id, name, profile_path, known_for_department, known_for, popularity }) {
      this.id = id;
      this.name = name;
      this.profile_path = profile_path;
      this.known_for_department = known_for_department;
      this.known_for = known_for;
      this.popularity = popularity;
    }
  
    getKnownForList() {
      return this.known_for.map(item =>
        item.media_type === 'movie' ? `Film: ${item.title}` : `TV: ${item.name}`
      );
    }
  }
  