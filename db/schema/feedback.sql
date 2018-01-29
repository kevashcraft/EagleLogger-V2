DROP TABLE IF EXISTS feedback;
CREATE TABLE feedback (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  user_id int REFERENCES users(id) NOT NULL,
  message TEXT,
  page varchar(64),
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
