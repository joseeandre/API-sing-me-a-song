import connection from "./database";

class genresRepository {
  async newGenre(name: string) {
    const result = await connection.query(
      `
            INSERT INTO genres (name, created_at) 
            VALUES ($1, NOW()) RETURNING id;
          `,
      [name]
    );

    return result;
  }

  async getAllGenres() {
    const result = await connection.query(
      `
            SELECT * FROM genres;
          `
    );

    return result.rows;
  }
}

export { genresRepository };
