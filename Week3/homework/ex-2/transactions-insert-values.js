const mysql = require('mysql');
const util = require('util');
const { database } = require('./queries');
const { account_data } = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  connection.connect();
  try {
    await execQuery(database.use_database),
      account_data.data.forEach(async (account) => {
        try {
          await execQuery(account_data.insert, account);
        } catch (err) {
          console.log(err);
          connection.end();
        }
      });
    console.log('Data added into account table ...');
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
})();
