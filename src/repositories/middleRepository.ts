import connection from "./database";

class middleRepository {
  async newSongGenre(genre: number, song: number) {
    const result = await connection.query(
      `
            INSERT INTO recommendation_genres (genre_id, module_id) 
            VALUES ($1, $2);
          `,
      [genre, song]
    );

    return result;
  }
}

export { middleRepository };
