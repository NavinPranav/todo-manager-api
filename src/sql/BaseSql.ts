import { query } from "../sqlConnector";

export class BaseSql {
  protected now(): string {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  protected injectTimestamps(sql: string, values: any[]): { sql: string, values: any[] } {
    const now = this.now();

    if (/insert into/i.test(sql)) {
      sql = sql.replace(
        /\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i,
        (_, columns, placeholders) => {
          return `(${columns}, create_ts, update_ts) VALUES (${placeholders}, ?, ?)`;
        }
      );
      values.push(now, now);
    }

    if (/update/i.test(sql) && !/update_ts\s*=/i.test(sql)) {
        const setMatch = sql.match(/SET\s+([\s\S]*?)\s+WHERE/i);
        if (setMatch) {
          const existingSet = setMatch[1].trim().replace(/,$/, '');
          const updatedSet = `${existingSet}, update_ts = ?`;
          sql = sql.replace(/SET\s+[\s\S]*?\s+WHERE/i, `SET ${updatedSet} WHERE`);
          const whereIndex = values.length - 1;
          values.splice(whereIndex, 0, now);
        }
    }
    return { sql, values };
  }

  protected async execute(sql: string, values: any[]) {
    const { sql: finalSql, values: finalValues } = this.injectTimestamps(sql, values);
    return query(finalSql, finalValues);
  }
}