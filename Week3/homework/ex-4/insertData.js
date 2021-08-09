const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = 'hyf';
async function connectMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');
    const data = await db.collection('city').find({ Name: 'Nuenen' }).toArray();
    const found = data.length < 1 ? false : true;
    console.log();
    if (!found) {
      await collection.insertOne({
        Name: 'Nuenen',
        CountryCode: 'NLD',
        District: 'Noord-Brabant',
        Population: 22437,
      });
      console.log('The new city is added');
    } else {
      console.log('city is already existed');
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
connectMongoDB();
