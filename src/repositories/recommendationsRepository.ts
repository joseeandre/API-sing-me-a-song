import connection from "./database";

class recommendationsRepository {
  async newSong(name: string, youtubeLink: string) {
    const result = await connection.query(
      `
            INSERT INTO recommendations (name
            , "youtubeLink", score, created_at) 
            VALUES ($1, $2, $3, NOW()) RETURNING id;
          `,
      [name, youtubeLink, 0]
    );

    return result;
  }

  async getScore(song: number) {
    const result = await connection.query(
      `
            SELECT score FROM recommendations
            WHERE id = $1;
          `,
      [song]
    );

    return result.rows[0].score;
  }

  async updateScore(score: number, song: number) {
    const result = await connection.query(
      `
        UPDATE recommendations SET score = $1 WHERE id = $2;
          `,
      [score, song]
    );

    return result;
  }

  async getHighSongs() {
    const highSongs = await connection.query(
      `SELECT * FROM recommendations
        WHERE score > 10`
    );
    return highSongs.rows;
  }

  async getLowSongs() {
    const lowSongs = await connection.query(
      `SELECT * FROM recommendations
        WHERE score <= 10`
    );
    return lowSongs.rows;
  }

  async getRandomSongs() {
    const randomSongs = await connection.query(`SELECT * FROM recommendations`);
    return randomSongs.rows;
  }

  async getTopSongs() {
    const topSongs = await connection.query(
      `SELECT * FROM recommendations 
        ORDER BY score DESC`
    );
    return topSongs.rows;
  }
}

export { recommendationsRepository };
