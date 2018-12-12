DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE todo_db;

\c todo_db 

CREATE TABLE todo(
  id serial PRIMARY KEY,
  subject VARCHAR,
  content VARCHAR
);

INSERT INTO todo(subject, content) VALUES
('buy pickles', 'go to the fancy pickle store on the corner'),
('pet a dog', 'only if it is cute though'),
('code a todo list', 'currently working on it'),
('homework', 'they are gonna hate this');