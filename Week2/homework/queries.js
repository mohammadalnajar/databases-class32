exports.queries = {
  SELECT_AUTHORS_MENTORS: `SELECT 
    a.author_name AS author_name, 
    b.author_name AS mentor_name 
    FROM authors AS a 
    JOIN authors AS b 
    ON a.mentor = b.author_no;`,
  AUTHORS_PAPER_TITLE: `SELECT 
    a.author_no,
    author_name,
    university,
    date_of_birth,
    h_index,gender,
    mentor,
    paper_title
    FROM authors AS a 
    LEFT JOIN research_papers AS r 
    ON a.author_no= r.author_no 
    ORDER BY a.author_no;`,
  AUTHOR_PER_PAPER: ` SELECT 
    paper_title,
    COUNT(author_name) AS Authors_number 
    FROM authors AS a 
    JOIN research_papers AS r 
    ON a.author_no= r.author_no 
    GROUP BY  paper_title 
    ORDER BY a.author_no;`,
  RESEARCH_BY_FEMALE: `SELECT
    count(*) 
    FROM authors AS a
    JOIN research_papers AS r
    ON a.author_no= r.author_no 
    WHERE gender='f';`,
  AVG_H_INDEX_PER_UNI: ` SELECT
    AVG(h_index),
    university 
    FROM authors AS a 
    JOIN research_papers AS r 
    ON a.author_no= r.author_no 
    GROUP BY university 
    ORDER BY a.author_no;`,
  RESEARCH_PER_UNI: `SELECT
    university,COUNT(*) AS PAPERS_SUM 
    FROM authors AS a 
    JOIN research_papers AS r 
    ON a.author_no= r.author_no 
    GROUP BY UNIVERSITY 
    ORDER BY a.author_no;`,
  MAX_MIN_H_INDEX_PER_UNI: `SELECT 
    university,
    MIN(h_index),
    MAX(h_index) 
    FROM authors AS a 
    LEFT JOIN research_papers AS r 
    ON a.author_no= r.author_no 
    GROUP BY UNIVERSITY 
    ORDER BY a.author_no;`,
};
