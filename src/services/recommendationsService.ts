import { recommendationsRepository } from "../repositories/recommendationsRepository";

class recommendationsService {
  async randomNumber(songsLength: number){
      return Math.floor(Math.random()* (songsLength));
  }

  async getRandomSong() {
    const RecRepository = new recommendationsRepository()
    let songs

    const seventyPercent = Math.random() * 10 > 3;

    if (seventyPercent) {
      songs = await RecRepository.getHighSongs()
    } else {
      songs = await RecRepository.getLowSongs()
    }

    if (songs.length === 0) {
      songs = await RecRepository.getRandomSongs()
    }

    if (songs.length === 0) {
      return false;
    }

    const index = await this.randomNumber(songs.length)

    return songs[index];
  }

  async getTopSongs(amount: number){
    const RecRepository = new recommendationsRepository()
    const songs = await RecRepository.getTopSongs();

    const topSongs = songs.slice(0,amount);

    return topSongs;
  }
}

export { recommendationsService }
