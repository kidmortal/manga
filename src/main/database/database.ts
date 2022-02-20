import { join } from 'path';
import sqlite, { Database, RunResult } from 'sqlite3';
import { Migrate } from './migrations';

const db = new sqlite.Database(join(process.cwd(), 'manga.db'), (err) => {
  if (err) console.error('Database opening error: ', err);
  Migrate(db);
});
function allSync<T>(query: string, database: Database) {
  return new Promise<T[]>((resolve, reject) => {
    database.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}
function runSync(query: string, database: Database) {
  return new Promise((resolve, reject) => {
    database.run(query, function (this: RunResult, err: Error) {
      if (err) reject(err);
      resolve(this);
    });
  });
}

export function RecoverDatabase(path: string) {
  return new Promise((resolve, reject) => {
    const recoverDb = new sqlite.Database(path, async (err) => {
      if (err) reject(err);
      const carimbos = await allSync<Carimbo>(
        'SELECT * FROM CARIMBOS',
        recoverDb
      );
      for await (const c of carimbos) {
        await runSync(
          `INSERT INTO CARIMBOS (NOME, 'CNPJ/CPF') VALUES ('${c.NOME}', '${c['CNPJ/CPF']}')`,
          db
        );
      }
      const favorecidos = await allSync<Favorecido>(
        'SELECT * FROM FAVORECIDOS',
        recoverDb
      );
      for await (const f of favorecidos) {
        await runSync(
          `INSERT INTO FAVORECIDOS (NOME, AGENCIA, CONTA, BANCO) VALUES ('${f.NOME}','${f.AGENCIA}','${f.CONTA}','${f.BANCO}')`,
          db
        );
      }
      resolve({ carimbos, favorecidos });
    });
  });
}

export const database = {
  getAllCarimbos() {
    return allSync('SELECT * FROM CARIMBOS', db);
  },
  getAllFavorecidos() {
    return allSync('SELECT * FROM FAVORECIDOS', db);
  },
  async createCarimbo(carimbo: CarimboNew) {
    await runSync(
      `INSERT INTO CARIMBOS (NOME, 'CNPJ/CPF') VALUES ('${carimbo.NOME}', '${carimbo['CNPJ/CPF']}')`,
      db
    );
    return this.getAllCarimbos();
  },
  deleteCarimbo(id: number) {
    return runSync(`DELETE FROM CARIMBOS WHERE ID = ${id}`, db);
  },
  updateCarimbo(id: number, update: Carimbo) {
    return runSync(
      `UPDATE CARIMBOS SET 'NOME' = ${update.NOME}, 'CNPJ/CPF' = ${update['CNPJ/CPF']} WHERE ID = ${id}`,
      db
    );
  },
  async createFavorecido(f: FavorecidoNew) {
    await runSync(
      `INSERT INTO FAVORECIDOS (NOME, AGENCIA, CONTA, BANCO) VALUES ('${f.NOME}','${f.AGENCIA}','${f.CONTA}','${f.BANCO}')`,
      db
    );
    return this.getAllFavorecidos();
  },
  deleteFavorecido(id: number) {
    return runSync(`DELETE FROM FAVORECIDOS WHERE ID = ${id}`, db);
  },
  updateFavorecido(id: number, update: Carimbo) {
    return runSync(`UPDATE FAVORECIDOS SET  WHERE ID = ${id}`, db);
  },
};
