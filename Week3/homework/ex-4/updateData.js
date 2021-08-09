const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = 'hyf';
async function updateData() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');
    console.log(
      await collection.updateOne(
        {
          Name: 'Nuenen',
        },
        {
          $set: {
            Population: 23000,
          },
        }
      )
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
updateData();
