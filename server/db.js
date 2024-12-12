import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5433,
    database: "perntodo"
});

export default pool;
