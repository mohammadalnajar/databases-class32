module.exports = {
  createAuthorsTable: `CREATE TABLE IF NOT EXISTS
        authors(author_no INT AUTO_INCREMENT,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT, 
        gender enum('m','f'),
        PRIMARY KEY(author_no));`,
  addMentor: `ALTER TABLE authors
            ADD mentor INT,ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no) ;`,
  createResearchPapersTable: `CREATE TABLE
    research_Papers(paper_id INT AUTO_INCREMENT,
    paper_title VARCHAR(50),
    conference VARCHAR(50),
    publish_date DATE,
    author_no INT,
    PRIMARY KEY(paper_id),
    FOREIGN KEY(author_no) REFERENCES authors(author_no));`,
};
