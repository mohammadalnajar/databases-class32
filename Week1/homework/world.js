const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});
const queries = [
  `SELECT * FROM country 
  WHERE population > 8000000 
  ORDER BY continent;`,
  `SELECT * FROM country 
  WHERE name LIKE '%land%';`,
  `SELECT * FROM city 
  WHERE population 
  BETWEEN 500000 AND 1000000 
  ORDER BY population;`,
  `SELECT * FROM country 
  WHERE continent= 'europe';`,
  `SELECT * from country 
  ORDER BY surfacearea desc;`,
  `SELECT * FROM city 
  WHERE countrycode = 'NLD';`,
  `SELECT name, population FROM city 
  WHERE countrycode = 'NLD' AND name='Rotterdam';`,
  `SELECT * FROM country 
  ORDER BY surfacearea desc LIMIT 10;`,
  `SELECT * FROM city 
  ORDER BY population desc LIMIT 10;`,
  `SELECT SUM(population) AS 'total population' FROM country;`,
];
connection.connect();

queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
