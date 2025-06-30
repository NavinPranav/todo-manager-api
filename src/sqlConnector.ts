// sql-connector.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'gondola.proxy.rlwy.net',
  user: 'root',
  password: 'FpOBiaLaJPpjdLTXIikBiMfjBuulRsST',
  database: 'app',
  port: 33491
});

export async function getConnection() {
  return pool.getConnection();
}

export async function query<T extends mysql.ResultSetHeader = any>(sql: string, params: any[] = []): Promise<T[]> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query<T[]>(sql, params);
      return rows;
    } finally {
      connection.release();
    }
}
