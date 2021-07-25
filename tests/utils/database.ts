import connection from "../../src/repositories/database";

export async function clearDatabase() {
  await connection.query(`DELETE FROM recommendation_genres`);
  await connection.query(`DELETE FROM genres`);
  await connection.query(`DELETE FROM recommendations`);
}
export async function endConnection() {
  await clearDatabase();
  await connection.end();
}
