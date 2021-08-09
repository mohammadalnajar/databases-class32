const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = 'hyf';
async function deleteData() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');
    console.log(
      await collection.deleteOne({
        Name: 'Nuenen',
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
deleteData();
