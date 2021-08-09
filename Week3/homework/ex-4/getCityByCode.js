const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = 'hyf';
async function getCityByName() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    console.log(
      await db.collection('city').find({ CountryCode: 'NLD' }).toArray()
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
getCityByName();
