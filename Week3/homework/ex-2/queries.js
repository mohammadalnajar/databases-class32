module.exports = {
  database: {
    checkDatabaseExists: function (database) {
      return `DROP DATABASE IF EXISTS ${database}`;
    },
    create_database: `CREATE DATABASE najarWeek3;`,
    use_database: `use najarWeek3`,
  },
  tables: {
    account: `CREATE TABLE IF NOT EXISTS 
        account(
            account_number INT AUTO_INCREMENT,
            balance INT,
            PRIMARY KEY(account_number)
        );`,
    account_changes: `CREATE TABLE IF NOT EXISTS 
        account_changes(
            change_number INT AUTO_INCREMENT,
            account_number INT,
            amount INT,
            changed_date DATETIME,
            remark VARCHAR(255),
            PRIMARY KEY(change_number),
            FOREIGN KEY(account_number) REFERENCES account(account_number)
            )AUTO_INCREMENT=101;`,
  },
  account_data: {
    insert: 'INSERT INTO account SET ?',
    data: [
      {
        balance: 15090,
      },
      {
        balance: 5075,
      },
      {
        balance: 8900,
      },
    ],
  },
  transactions: {
    transactionStart: `START TRANSACTION;`,
    autoCommit: function (status) {
      return `SET autocommit = ${status};`;
    },
    account: {
      update: function (amount, account_number) {
        return `UPDATE account SET balance = balance ${amount} WHERE account_number=${account_number};`;
      },
    },
    transaction: function (account_number, amount, remark) {
      return `INSERT INTO account_changes (account_number,amount,changed_date,remark) VALUES(${account_number},${amount},now(),'${remark}');`;
    },
    transactionEnd: function (status) {
      return `${status};`;
    },
  },
};
