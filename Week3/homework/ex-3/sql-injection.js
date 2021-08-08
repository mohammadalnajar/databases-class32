const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
const execQuery = util.promisify(conn.query.bind(conn));
async function getPopulation(Country, name, code, cb) {
  conn.connect();

  try {
    const result = await Promise.all([
      execQuery(
        `PREPARE stmt FROM 'SELECT Population FROM ${Country} WHERE Name = ? and code = ?'`
      ),
      execQuery(`SET @name ='${name}'`),
      execQuery(`SET @code ='${code}'`),
      execQuery(`EXECUTE stmt USING @name, @code; `),
    ]);
    if (result[3].length < 1) {
      cb(new Error('Not found'));
    }
    console.log(result);
    console.log(result[3][0].Population);

    conn.end();
  } catch (err) {
    cb(err);
  }
}

getPopulation('country', 'spain', 'ESP', console.log);

//! answer question 1:
/* 
function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
      conn.end();
    }
  );
}

getPopulation('country', 'spain', "ESP' OR 1='1", console.log);
*/
