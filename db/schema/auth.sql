DROP TABLE IF EXISTS auth;
CREATE TABLE auth (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  user_id int REFERENCES users(id) NOT NULL,
  code varchar(64) NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  UNIQUE(code),
  PRIMARY KEY (id)
);

