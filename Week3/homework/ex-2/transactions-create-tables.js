const mysql = require('mysql');
const util = require('util');
const { database, tables } = require('./queries');
const { checkDatabaseExists, create_database, use_database } = database;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  connection.connect();
  try {
    await Promise.all([
      execQuery(checkDatabaseExists('najarWeek3')),
      execQuery(create_database),
      execQuery(use_database),
    ]);
    console.log('Database created ...');
    await Promise.all([
      execQuery(tables.account),
      execQuery(tables.account_changes),
    ]);
    console.log('tables created ...');
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
})();
