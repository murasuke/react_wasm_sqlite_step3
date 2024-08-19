import './App.css';
import { connectDB, closeDB } from './sqlite';
const log = console.log;

function App() {
  const executeQuery = async () => {
    const db = await connectDB();
    let response = null;
    response = await db.promiser('exec', {
      dbId: db.dbId,
      sql: `CREATE TABLE IF NOT EXISTS users(id INTEGER, name TEXT)`,
    });
    log('CREATE TABLE users');

    response = await db.promiser('exec', {
      dbId: db.dbId,
      sql: `INSERT INTO users VALUES(1, 'Alice')`,
    });
    log(`INSERT INTO users VALUES(1, 'Alice')`);

    response = await db.promiser('exec', {
      dbId: db.dbId,
      sql: `INSERT INTO users VALUES(?, ?)`,
      bind: [2, `Bob`],
    });
    log(`INSERT INTO users VALUES(?, ?)`);

    const values = await db.promiser('exec', {
      dbId: db.dbId,
      sql: `SELECT * FROM users`,
      rowMode: 'object',
      returnValue: 'resultRows',
    });
    log(`SELECT * FROM users`);

    // show results
    log(values.result.resultRows);

    // close
    await closeDB(db);
  };
  return (
    <>
      <div className="card">
        <h2>
          <a href="https://www.npmjs.com/package/@sqlite.org/sqlite-wasm#in-a-wrapped-worker-with-opfs-if-available">
            sqlite wasm(in the main thread with a wrapped worker) サンプル
          </a>
        </h2>
        <p>
          document：
          <a href="https://sqlite.org/wasm/doc/trunk/api-worker1.md">
            Workers and Promises (a.k.a. Worker1 and Promiser)
          </a>
        </p>

        <button onClick={() => executeQuery()}>クエリ実行</button>
        <div className="return">
          実行結果はDevToolsのConsoleに出力されます。
        </div>
      </div>
    </>
  );
}

export default App;
