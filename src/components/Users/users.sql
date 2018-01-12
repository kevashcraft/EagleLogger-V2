DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(128),
  name varchar(64),
  radio varchar(256),
  antenna varchar(256),
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);
