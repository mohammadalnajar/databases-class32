const mysql = require("mysql");
const util = require("util");
const { authors, researchPapers, mentors } = require("./data");
const {
  createAuthorsTable,
  createResearchPapersTable,
  addMentor,
} = require("./create_tables");
const queries = Object.values(require("./queries").queries);

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  const checkDatabaseExists = (database) => {
    return `DROP DATABASE IF EXISTS ${database}`;
  };
  const create_database = `CREATE DATABASE IF NOT EXISTS najarWeek2;`;
  const use_database = `use najarWeek2`;

  connection.connect();
  try {
    await Promise.all([
      execQuery(checkDatabaseExists("najarWeek2")),
      execQuery(create_database),
      execQuery(use_database),
    ]);
    console.log("database created and changed...");
    await Promise.all([
      execQuery(createAuthorsTable),
      execQuery(addMentor),
      execQuery(createResearchPapersTable),
    ]);
    console.log("tables created ...");

    authors.forEach(async (author) => {
      try {
        await execQuery(
          `INSERT INTO authors (author_name,university,date_of_birth,h_index,gender) VALUES('${author.author_name}','${author.university}','${author.date_of_birth}','${author.h_index}','${author.gender}')`
        );
      } catch (err) {
        console.log(err);
        connection.end();
      }
    });

    console.log("authors data added ...");

    authors.forEach(async (author) => {
      const { mentor, author_name } = author;
      try {
        await execQuery(
          `UPDATE authors SET mentor = '${mentor}' WHERE author_name = '${author_name}'`
        );
      } catch (err) {
        console.log(err);
        connection.end();
      }
    });

    researchPapers.forEach(async (paper) => {
      try {
        await Promise.all([
          execQuery("INSERT INTO research_papers SET ?", paper),
        ]);
      } catch (err) {
        console.log(err);
        connection.end();
      }
    });
    console.log("research papers data added ...");
    queries.forEach(async (query) => {
      // console.log(query);
      try {
        await execQuery(query, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
        });
      } catch (err) {
        console.log(err);
        connection.end();
      }
    });

    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
})();
