import pg from 'pg';
import '../setup'

const { Pool } = pg;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

console.log(`Utilizando o banco de dados '${database}'`);


const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

function connect(){
  if (process.env.DATABASE_URL) {
    const connection = new Pool(databaseConfig);
    return connection;
  }
  else {
    const connection = new Pool({
      user,
      password,
      host,
      port: parseInt(port),
      database
    });
    return connection;
  }
}

const connection = connect();
export default connection;