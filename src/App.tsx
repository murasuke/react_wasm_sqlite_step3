import './App.css';

import { initializeSQLite } from './sqlite';

function App() {
  return (
    <>
      <div className="card">
        <h2>
          <a href="https://www.npmjs.com/package/@sqlite.org/sqlite-wasm#in-a-wrapped-worker-with-opfs-if-available">
            sqlite wasm(in the main thread with a wrapped worker) sample
          </a>
        </h2>
        <p>
          document：
          <a href="https://sqlite.org/wasm/doc/trunk/api-worker1.md">
            Workers and Promises (a.k.a. Worker1 and Promiser)
          </a>
        </p>
        <button onClick={() => initializeSQLite()}>execute sqlite</button>
        <pre id="result"></pre>
      </div>
    </>
  );
}

export default App;
