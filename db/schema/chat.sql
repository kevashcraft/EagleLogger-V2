DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  net_id int REFERENCES nets(id) NOT NULL,
  user_id int REFERENCES users(id) NOT NULL,
  message varchar(1024) NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
