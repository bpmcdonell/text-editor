import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Add content to the database');

  // Create a connection to the jate database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // .put() method to add the data to the database 
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Added content to the database', result);

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get content from the database');

  // Create a connection to the jate database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // .get() method to get the data from the database
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('Got content from the database', result);

  // Return the value of the content
  return result.value;
}



initdb();
