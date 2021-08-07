const mysql = require('mysql');
const util = require('util');
const { database, transactions } = require('./queries');
const { transaction, transactionStart, transactionEnd, account, autoCommit } =
  transactions;

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
      execQuery(database.use_database),
      execQuery(transactionStart),
      execQuery(autoCommit('off')),
    ]);
    console.log('Transaction started ...');
    await Promise.all([
      execQuery(transaction(1, -2000, 'gift')),
      execQuery(transaction(2, +2000, 'gift')),
    ]);
    const transactionsLog = await execQuery('SELECT * FROM account_changes;');
    console.log('transactions registered ...');
    console.log(transactionsLog);
    await Promise.all([
      execQuery(account.update(`-2000`, 1)),
      execQuery(account.update(`+2000`, 2)),
    ]);
    const transactionsLog2 = await execQuery('SELECT * FROM account;');
    console.log('transactions done ...');
    console.log(transactionsLog2);
    await execQuery(transactionEnd('COMMIT;'));
    console.log('Transaction is committed ...');
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
})();
