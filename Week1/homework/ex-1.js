const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});
const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  const checkDatabaseExists = (database) => {
    return `DROP DATABASE IF EXISTS ${database}`;
  };
  const create_database = `CREATE DATABASE IF NOT EXISTS meetup ;
   USE meetup`;
  const create_invitee_table = `CREATE TABLE IF NOT EXISTS 
    Invitee(invitee_no INT NOT NULL AUTO_INCREMENT,
    invitee_name VARCHAR(50), invited_by VARCHAR(50), PRIMARY KEY(invitee_no))`;
  const create_room_table = `CREATE TABLE IF NOT EXISTS 
    Room(room_no INT NOT NULL AUTO_INCREMENT,
    room_name VARCHAR(50), floor_number INT, PRIMARY KEY (room_no))`;
  const create_meeting_table = `CREATE TABLE IF NOT EXISTS 
    Meeting(meeting_no INT  NOT NULL AUTO_INCREMENT, 
    meeting_title VARCHAR(50), starting_time TIMESTAMP, 
    ending_time TIMESTAMP ,room_no INT,PRIMARY KEY(meeting_no),
    FOREIGN KEY (room_no) REFERENCES room(room_no))`;

  //==================================================================\\
  //======================================================================\\

  const fields_invitee_table = `INSERT INTO invitee(invitee_name,invited_by ) 
    VALUES('Mohammad', 'Omar'), ('Wouter','Fede'),
    ('Khaled','Sami'),('Hanin','Fatima'),('Wissam','Amjad')`;
  const fields_room_table = `INSERT INTO room(room_name,floor_number ) 
    VALUES('Kitchen', 0), ('Waiting room',1),
    ('Dining room',1),('meeting room',5),('Living room',2)`;
  const fields_meeting_table = `INSERT INTO meeting(meeting_title,starting_time,ending_time,room_no ) 
    VALUES('meeting','2021-10-09 12:00:00','2021-10-09 12:30:00', 4 ),
    ('cooking','2021-10-01 09:15:00','2021-10-01 12:30:00', 1 ),
    ('Waiting','2021-10-07 17:00:00','2021-10-07 18:30:00',2  ),
    ('Dinner','2021-10-02 20:45:00','2021-10-02 21:10:00', 3 ),
    ('Relaxing','2021-10-03 22:30:00','2021-10-04 6:30:00', 5 )`;
  connection.connect();
  try {
    await Promise.all([
      execQuery(checkDatabaseExists("meetup")),
      execQuery(create_database),
    ]);
    console.log("Database is created");
    await Promise.all([
      execQuery(create_invitee_table),
      execQuery(create_room_table),
      execQuery(create_meeting_table),
    ]);
    console.log("Tables are created");
    await Promise.all([
      execQuery(fields_invitee_table),
      execQuery(fields_room_table),
      execQuery(fields_meeting_table),
    ]);
    console.log("Tables are Filled");
  } catch (err) {
    console.log(err, "catch");
  }
  connection.end();
})();
