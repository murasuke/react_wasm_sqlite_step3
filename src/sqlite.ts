import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm';

const log = console.log;
const error = console.error;

export const connectDB = async () => {
  try {
    log('Loading and initializing SQLite3 module...');
    const promiser = await sqlite3Worker1Promiser.v2({
      // debug: log,
    });

    log('Done initializing. Running demo...');

    const configResponse = await promiser('config-get', {});
    log('Running SQLite3 version', configResponse.result.version.libVersion);

    const openResponse = await promiser('open', {
      filename: 'file:mydb.sqlite3?vfs=opfs',
    });
    const { dbId } = openResponse;
    log(
      'OPFS is available, created persisted database at',
      openResponse.result.filename.replace(/^file:(.*?)\?vfs=opfs$/, '$1')
    );

    return { dbId, promiser };
  } catch (err) {
    if (!(err instanceof Error)) {
      err = new Error(err.result.message);
    }
    error(err.name, err.message);
  }
};

export const closeDB = async ({ dbId, promiser }) => {
  try {
    const response = await promiser('close', { dbId: dbId });
  } catch (err) {
    if (!(err instanceof Error)) {
      err = new Error(err.result.message);
    }
    error(err.name, err.message);
  }
};
